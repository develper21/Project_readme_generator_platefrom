import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowRight,
  FiZap,
  FiBookOpen,
  FiCode,
  FiPlusCircle,
} from "react-icons/fi";

const ContentSection: NextPage = () => {
  return (
    <main className="w-full bg-[#eaf4ff] text-black" aria-label="Content section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-12 pb-20">

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="pt-6">
            <h1 className="text-[40px] sm:text-[48px] md:text-[64px] leading-[0.95] md:leading-[0.9] font-extrabold text-[#111827]">
              Instant,Professional
              <br />
              <span className="block text-[#4c63d6]">Code</span>
              <span className="block text-[#4c63d6]">Documentation.</span>
            </h1>

            <span className="mt-4 text-sm md:text-base text-gray-600 max-w-lg">
              Document Smarter, Not Harder — All with a single click.
            </span>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#get-started"
                className="inline-flex items-center gap-3 bg-[#2563eb] hover:bg-[#1f4fc6] text-white rounded-lg px-5 py-3 text-sm font-semibold shadow-md transition"
                id="get-started">
                Start Now <FiArrowRight className="w-80 h-8" aria-hidden />
              </a>
            </div>

            <span className="mt-4 text-xs md:text-sm text-gray-500 max-w-lg">
              Harness the power of AI to create professional docs for your GitHub projects instantly.
            </span>
          </div>

          {/* Right: card (icon instead of screenshot) */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="w-[360px] md:w-[420px] bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-[#eef6ff] flex items-center justify-center border border-[#dbeafe]">
                  <FiCode className="w-12 h-12 text-[#2563eb]" aria-hidden />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-800">AI-powered README</h4>
                  <p className="text-sm text-gray-500">Generate docs fast with intelligent parsing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="mt-12 flex flex-row gap-6 items-center">

          <div className="flex flex-row items-center gap-4">
            <div className="rounded-full w-14 h-14 bg-[#DBEAFE] flex items-center justify-center">
              <FaGithub className="w-8 h-8 text-[#2563eb]" aria-hidden />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">Compatible with All Public GitHub Repos</h3>
              <span className="text-xs md:text-sm text-gray-500 mt-1 max-w-xs">
                Connect and generate documentation for any public repository with ease.
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <div className="rounded-full w-14 h-14 bg-[#DBEAFE] flex items-center justify-center">
              <FiZap className="w-8 h-8 text-[#2563eb]" aria-hidden />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">Lightning-Fast README Generation</h3>
              <span className="text-xs md:text-sm text-gray-500 mt-1 max-w-xs">
                Get professional documentation in seconds using advanced AI technology.
              </span>
            </div>
          </div>
          
          <div className="flex flex-row items-center gap-4">
            <div className="rounded-full w-14 h-14 bg-[#DBEAFE] flex items-center justify-center">
              <FiBookOpen className="w-8 h-8 text-[#2563eb]" aria-hidden />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">Full Documentation Coming</h3>
              <span className="text-xs md:text-sm text-gray-500 mt-1 max-w-xs">
                Complete code documentation features are in development and coming to you soon.
              </span>
            </div>
          </div>
        </section>

        {/* ROADMAP PANEL */}
        <section className="mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white p-8 shadow-md">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center">Code Documentation is Next</h2>
            <p className="text-sm text-gray-500 text-center mt-1 font-semibold">Our roadmap to complete code documentation.</p>

            {/* Phases 1-4 in grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phase 1 */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">Phase 1: README Generation</h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">Available now – Create professional README files instantly.</span>
                </div>
              </div>
              {/* Phase 2 */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">Phase 2: Full Code Documentation</h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">Available now – Comprehensive documentation for classes, functions, and more.</span>
                </div>
              </div>
              {/* Phase 3 */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">Phase 3: Apply & Download</h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">Available now – Apply automatic and Download files instantly.</span>
                </div>
              </div>
              {/* Phase 4 */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">Phase 4: Repositories Types</h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">Available now – Access Private and Public Repo With User Permission.</span>
                </div>
              </div>
            </div>

            {/* Phase 5 center bottom */}
            <div className="flex flex-col items-center mt-12">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">Phase 5: README Update Time</h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">
                    Coming Soon – After update Projects Repo Then Check whole 
                    Projects new functionality and Update Readme file.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 w-full max-w-[900px] mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6">
            <span className="text-[#111827]">Questions?</span>{" "}
            <span className="text-[#4c63d6]">Look here.</span>
          </h2>
          <div className="space-y-3">
            {/* FAQ Item */}
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  How can Readme Hub improve my GitHub profile to attract recruiters and boost my career?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                GitDocify significantly enhances your GitHub profile by generating clear, professional, and comprehensive documentation for your projects.
                As companies increasingly shift away from traditional technical interviews—such as coding exercises on platforms like LeetCode—your project portfolio has become more critical than ever.
                By using GitDocify to document your projects, you clearly demonstrate your project's purpose, complexity, and value, making your GitHub portfolio stand out to recruiters and tech companies, greatly boosting your career prospects.
              </div>
            </details>
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  How long does it take to generate a high-quality README with Readme Hub?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                The time required to generate a high-quality README depends on the size and complexity of your codebase. GitDocify's AI agent thoroughly reviews each file in your repository to gather essential details, ensuring that the resulting documentation accurately reflects your project's depth and functionality.
                Typically, the process takes only a few minutes, even for large projects, delivering professional documentation swiftly and efficiently.
              </div>
            </details>
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  Is my code protected and secure when using Readme Hub?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                Yes, absolutely. GitDocify prioritizes the security and privacy of your code.
                We integrate directly with GitHub through a secure OAuth authentication, ensuring safe interactions with your repositories. We never store any of your code or data, and your codebase is never used to train our AI models.
                Your privacy and data security are guaranteed at all times.
              </div>
            </details>
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  Can I customize the layout and style of my README generated by Readme Hub?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                Yes! GitDocify offers robust customization options to match your personal or project branding.
                You can easily add specialized sections such as feature highlights, contribution guidelines, project indexes, logos, and much more.
                Additionally, you have full control over text styling, alignment, and formatting, enabling you to create visually appealing, distinctive, and professional READMEs tailored exactly to your needs.
              </div>
            </details>
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  Which programming languages does Readme Hub support?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                GitDocify supports ALL programming languages.
                Our advanced AI agent intelligently detects and comprehends every programming language, making it highly compatible not only with single-language projects but also complex multi-language codebases.
                Regardless of your stack, GitDocify will generate accurate and professional documentation seamlessly.
              </div>
            </details>
            <details className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer">
              <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                <span className="font-medium text-sm text-[#222] flex-1">
                  How does Readme Hub’s AI analyze and review my code to create documentation?
                </span>
                <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                GitDocify utilizes a powerful AI agent specifically trained to systematically analyze your entire codebase.
                It carefully collects detailed information such as dependencies, libraries, individual file functionality, project structure, and entry points.
                All gathered insights are synthesized into clear, concise, and well-structured documentation, ensuring that your projects are represented professionally and accurately.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA bar */}
        <section className="mt-8 w-[35%] max-w-[900px] mx-auto">
          <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center justify-center">
            <span className="flex items-center gap-2 text-sm text-[#222]">
              <span className="w-6 h-6 rounded-full flex items-center justify-center">
                <FiPlusCircle className="w-4 h-4 text-[#3B82F6]" aria-hidden />
              </span>
              Can’t find what you’re looking for?
              <Link className="text-[#2563EB] underline ml-1" href="/contact">
                Contact us
              </Link>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContentSection;
