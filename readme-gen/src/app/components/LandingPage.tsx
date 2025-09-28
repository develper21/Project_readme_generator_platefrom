import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { FiArrowRight, FiCode, FiPlusCircle } from "react-icons/fi";
import { featureCards, roadmapPhases, faqList } from "@/lib/data";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main
      className="w-full bg-[#eaf4ff] text-black"
      aria-label="Content section"
    >
      <Topbar />
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
                id="get-started"
              >
                Start Now <FiArrowRight className="w-80 h-8" aria-hidden />
              </a>
            </div>

            <span className="mt-4 text-xs md:text-sm text-gray-500 max-w-lg">
              Harness the power of AI to create professional docs for your
              GitHub projects instantly.
            </span>
          </div>

          <div className="w-full flex justify-center md:justify-end">
            <div className="w-[360px] md:w-[420px] bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-[#eef6ff] flex items-center justify-center border border-[#dbeafe]">
                  <FiCode className="w-12 h-12 text-[#2563eb]" aria-hidden />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-800">
                    AI-powered README
                  </h4>
                  <p className="text-sm text-gray-500">
                    Generate docs fast with intelligent parsing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 flex flex-row gap-6 items-center">
          {featureCards.map((card, index) => (
            <div key={index} className="flex flex-row items-center gap-4">
              <div className="rounded-full w-14 h-14 bg-[#DBEAFE] flex items-center justify-center">
                {<card.icon className="w-8 h-8 text-[#2563eb]" aria-hidden />}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                  {card.title}
                </h3>
                <span className="text-xs md:text-sm text-gray-500 mt-1 max-w-xs">
                  {card.desc}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white p-8 shadow-md">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
              Code Documentation is Next
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1 font-semibold">
              Our roadmap to complete code documentation.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {roadmapPhases.slice(0, 4).map((phase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                  <div>
                    <h4 className="font-bold text-base text-[#111827]">
                      {phase.title}
                    </h4>
                    <span className="block text-xs md:text-sm text-gray-500 mt-1">
                      {phase.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-12">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3B82F6] mt-1"></span>
                <div>
                  <h4 className="font-bold text-base text-[#111827]">
                    {roadmapPhases[4].title}
                  </h4>
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">
                    {roadmapPhases[4].desc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 w-full max-w-[900px] mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6">
            <span className="text-[#111827]">Questions?</span>{" "}
            <span className="text-[#4c63d6]">Look here.</span>
          </h2>
          <div className="space-y-3">
            {faqList.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-full px-4 py-3 shadow-sm group cursor-pointer"
              >
                <summary className="flex items-center gap-3 list-none w-full cursor-pointer">
                  <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex-shrink-0"></span>
                  <span className="font-medium text-sm text-[#222] flex-1">
                    {faq.question}
                  </span>
                  <FiArrowRight className="w-5 h-5 text-[#2563eb] group-open:rotate-90 transition-transform" />
                </summary>
                <div className="pl-10 pr-2 pt-2 text-sm text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 w-[35%] max-w-[900px] mx-auto">
          <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center justify-center">
            <span className="flex items-center gap-2 text-sm text-[#222]">
              <span className="w-6 h-6 rounded-full flex items-center justify-center">
                <FiPlusCircle className="w-4 h-4 text-[#3B82F6]" aria-hidden />
              </span>
              Can't find what you're looking for?
              <Link className="text-[#2563EB] underline ml-1" href="/contact">
                Contact us
              </Link>
            </span>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default LandingPage;
