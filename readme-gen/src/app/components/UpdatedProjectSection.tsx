"use client";
import React, { useMemo, useState, useEffect } from "react";
import { FiGithub, FiStar, FiGitBranch, FiAlertCircle, FiLoader } from "react-icons/fi";

type Project = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
};

export default function UpdatedProjectsSection() {
  const [filter, setFilter] = useState<"All" | "Public" | "Private" | "Archived">("All");
  const [q, setQ] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Project | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState<string | null>(null);

  // Fetch repositories on mount
  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/repos");
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Failed to load repositories");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReadme = async (project: Project) => {
    try {
      setGenerating(true);
      setSelectedRepo(project);
      setGeneratedReadme(null);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: project.owner.login,
          repo: project.name,
          repoData: {
            description: project.description,
            language: project.language,
            stars: project.stars,
            forks: project.forks,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate README");
      }

      const data = await response.json();
      setGeneratedReadme(data.readme);
    } catch (err: any) {
      alert(err.message || "Failed to generate README");
    } finally {
      setGenerating(false);
    }
  };

  const downloadReadme = () => {
    if (!generatedReadme || !selectedRepo) return;

    const blob = new Blob([generatedReadme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter === "Public" && p.private) return false;
      if (filter === "Private" && !p.private) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        p.name.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s) ||
        p.language?.toLowerCase().includes(s)
      );
    });
  }, [filter, q, projects]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      public: projects.filter((p) => !p.private).length,
      private: projects.filter((p) => p.private).length,
      totalStars: projects.reduce((sum, p) => sum + p.stars, 0),
    };
  }, [projects]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    return `Updated ${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <section className="w-full p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <FiLoader className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-gray-600">Loading your repositories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white border border-red-200 rounded-lg shadow-sm p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <FiAlertCircle className="w-12 h-12 text-red-600" />
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchRepositories}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilter("All")}
                className={`px-3 py-2 rounded-md font-semibold text-sm focus:outline-none transition ${
                  filter === "All" ? "bg-indigo-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter("Public")}
                className={`px-3 py-2 rounded-md font-medium text-sm focus:outline-none transition ${
                  filter === "Public" ? "bg-white border border-green-600 text-green-600" : "bg-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                Public
              </button>
              <button
                onClick={() => setFilter("Private")}
                className={`px-3 py-2 rounded-md font-medium text-sm focus:outline-none transition ${
                  filter === "Private" ? "bg-white border border-red-600 text-red-600" : "bg-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                Private
              </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full md:w-80 pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  aria-label="Search projects"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 16.65z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Grid + Sidebar stats */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Projects grid - spans 3 cols on large screens */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <article
                      key={p.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <img
                              src={p.owner.avatarUrl}
                              alt={p.owner.login}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                              <div className="mt-1">
                                <span
                                  className={`inline-flex items-center gap-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                                    !p.private ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  <FiGithub className="w-3 h-3" />
                                  <span>{p.private ? "Private" : "Public"}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                          <p className="line-clamp-2">{p.description || "No description available"}</p>
                        </div>

                        {p.language && (
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {p.language}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <FiStar className="w-3 h-3" />
                              <span>{p.stars}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiGitBranch className="w-3 h-3" />
                              <span>{p.forks}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiAlertCircle className="w-3 h-3" />
                              <span>{p.issues}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400">{formatDate(p.updatedAt)}</div>

                        <button
                          onClick={() => handleGenerateReadme(p)}
                          disabled={generating}
                          className="w-full px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                          {generating && selectedRepo?.id === p.id ? (
                            <span className="flex items-center justify-center gap-2">
                              <FiLoader className="animate-spin" />
                              Generating...
                            </span>
                          ) : (
                            "Generate README"
                          )}
                        </button>
                      </div>
                    </article>
                  ))}

                  {filtered.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12">
                      No projects match your search/filter.
                    </div>
                  )}
                </div>
              </div>

              {/* Right column - stats */}
              <aside className="lg:col-span-1 space-y-4">
                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Total Projects</div>
                      <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    </div>
                    <FiGithub className="w-12 h-12 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Public Repos</div>
                      <div className="text-2xl font-bold text-gray-900">{stats.public}</div>
                    </div>
                    <FiGithub className="w-12 h-12 text-green-400" />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Private Repos</div>
                      <div className="text-2xl font-bold text-gray-900">{stats.private}</div>
                    </div>
                    <FiGithub className="w-12 h-12 text-red-400" />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Total Stars</div>
                      <div className="text-2xl font-bold text-gray-900">{stats.totalStars}</div>
                    </div>
                    <FiStar className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* README Preview Modal */}
      {generatedReadme && selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Generated README - {selectedRepo.name}</h2>
              <button
                onClick={() => {
                  setGeneratedReadme(null);
                  setSelectedRepo(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                {generatedReadme}
              </pre>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={downloadReadme}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
              >
                Download README.md
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedReadme);
                  alert("README copied to clipboard!");
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
