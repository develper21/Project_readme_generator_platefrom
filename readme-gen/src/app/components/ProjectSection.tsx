"use client";
import React, { useMemo, useState } from "react";

type Project = {
  id: number;
  title: string;
  visibility: "Public" | "Private" | "Archived";
  short: string[];
  tech: { name: string; count?: number }[];
  updated: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-commerce App",
    visibility: "Public",
    short: ["Modern e-commerce platform built with", "React and Node.js"],
    tech: [
      { name: "JavaScript", count: 24 },
      { name: "Issues", count: 8 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 2 hours ago",
  },
  {
    id: 2,
    title: "ML Analytics",
    visibility: "Private",
    short: ["Machine learning analytics dashboard for", "business insights"],
    tech: [
      { name: "Python", count: 12 },
      { name: "Issues", count: 3 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 1 day ago",
  },
  {
    id: 3,
    title: "API Gateway",
    visibility: "Public",
    short: ["Scalable API gateway service with", "authentication and rate limiting"],
    tech: [
      { name: "Node.js", count: 45 },
      { name: "Issues", count: 15 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 3 days ago",
  },
  {
    id: 4,
    title: "Mobile Fitness",
    visibility: "Private",
    short: ["Cross-platform fitness tracking app with", "social features"],
    tech: [
      { name: "Flutter", count: 8 },
      { name: "Issues", count: 2 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 5 days ago",
  },
  {
    id: 5,
    title: "Portfolio Website",
    visibility: "Public",
    short: ["Personal portfolio website with modern", "design and animations"],
    tech: [
      { name: "Vue.js", count: 16 },
      { name: "Issues", count: 5 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 1 week ago",
  },
  {
    id: 6,
    title: "Data Pipeline",
    visibility: "Private",
    short: ["Automated data processing pipeline for", "real-time analytics"],
    tech: [
      { name: "Go", count: 7 },
      { name: "Issues", count: 1 },
      { name: "PRs", count: 0 },
    ],
    updated: "Updated 2 weeks ago",
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<"All" | "Public" | "Private" | "Archived">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (filter !== "All" && p.visibility !== filter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        p.title.toLowerCase().includes(s) ||
        p.short.join(" ").toLowerCase().includes(s) ||
        p.tech.some((t) => t.name.toLowerCase().includes(s))
      );
    });
  }, [filter, q]);

  return (
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
            <button
              onClick={() => setFilter("Archived")}
              className={`px-3 py-2 rounded-md font-medium text-sm focus:outline-none transition ${
                filter === "Archived" ? "bg-gray-100 text-gray-900" : "bg-transparent text-gray-700 hover:bg-gray-50"
              }`}
            >
              Archived
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

            <select className="hidden md:inline-block border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none">
              <option>Sort: Recently updated</option>
              <option>Sort: Most stars</option>
              <option>Sort: Alphabetical</option>
            </select>
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
                          <img src="div.svg" alt="project" className="w-12 h-12 rounded-md object-cover" />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                            <div className="mt-1">
                              <span
                                className={`inline-flex items-center gap-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                                  p.visibility === "Public" ? "bg-green-100 text-green-700" : p.visibility === "Private" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                <img src="i.svg" alt="i" className="w-3 h-3" />
                                <span>{p.visibility}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <img src="button.svg" alt="more" className="w-4 h-6" />
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        <div>{p.short[0]}</div>
                        <div>{p.short[1]}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {p.tech.map((t, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-700">{t.name}</span>
                            <img src="Frame.svg" alt="icon" className="w-3 h-3" />
                            <span className="text-xs text-gray-500">{t.count}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-gray-400">{p.updated}</div>
                    </div>
                  </article>
                ))}

                {filtered.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 py-12">No projects match your search/filter.</div>
                )}
              </div>
            </div>

            {/* Right column - stats */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total Projects</div>
                    <div className="text-2xl font-bold text-gray-900">24</div>
                  </div>
                  <img src="div.svg" alt="icon" className="w-12 h-12" />
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Public Repos</div>
                    <div className="text-2xl font-bold text-gray-900">18</div>
                  </div>
                  <img src="div.svg" alt="icon" className="w-12 h-12" />
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Private Repos</div>
                    <div className="text-2xl font-bold text-gray-900">6</div>
                  </div>
                  <img src="div.svg" alt="icon" className="w-12 h-12" />
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total Stars</div>
                    <div className="text-2xl font-bold text-gray-900">135</div>
                  </div>
                  <img src="div.svg" alt="icon" className="w-12 h-12" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
