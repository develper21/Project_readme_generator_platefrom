"use client";
import React, { useState } from "react";
import { FiDownload, FiCopy, FiX, FiEye, FiCode } from "react-icons/fi";

interface ReadmePreviewProps {
  readme: string;
  repoName: string;
  onClose: () => void;
}

export default function ReadmePreview({ readme, repoName, onClose }: ReadmePreviewProps) {
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generated README</h2>
            <p className="text-sm text-gray-600 mt-1">{repoName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-2 hover:bg-white rounded-lg"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition ${
                viewMode === "preview"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiEye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setViewMode("raw")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition ${
                viewMode === "raw"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiCode className="w-4 h-4" />
              Raw Markdown
            </button>
          </div>
          <div className="text-xs text-gray-500">
            {readme.split("\n").length} lines • {(readme.length / 1024).toFixed(1)} KB
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {viewMode === "preview" ? (
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none bg-white p-6 rounded-lg border border-gray-200">
              <div 
                className="markdown-body"
                dangerouslySetInnerHTML={{ 
                  __html: readme
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
              {readme}
            </pre>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 bg-gray-50">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition shadow-md hover:shadow-lg"
          >
            <FiDownload className="w-5 h-5" />
            Download README.md
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition border-2 border-gray-300"
          >
            <FiCopy className="w-5 h-5" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
