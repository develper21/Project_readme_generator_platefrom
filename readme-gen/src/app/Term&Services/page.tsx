"use client";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { termsData } from "@/lib/data";
import parse from 'html-react-parser';

export default function TermServices() {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case "paragraph":
        return <p className="mt-2">{block.text}</p>;
      case "list":
        return (
          <ul className="list-disc ml-6 mt-3 space-y-2">
            {block.items.map((item: string, i: number) => (
              <li key={i}>{parse(item)}</li>
            ))}
          </ul>
        );
      case "warning":
        return (
          <p className="font-semibold text-red-600">{block.text}</p>
        );
      case "sublist":
        return (
          <div className="mt-3">
            {block.title && <strong>{block.title}</strong>}
            <ul className="list-disc ml-6 mt-2 space-y-2">
              {block.items.map((item: string, i: number) => (
                <li key={i}>{parse(item)}</li>
              ))}
            </ul>
          </div>
        );
      case "raw":
        return parse(block.html);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Topbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Terms and Conditions</h1>

        <article className="space-y-6 text-sm sm:text-base leading-relaxed">
          {termsData.header.map((block, index) => (
            <div key={`header-${index}`}>
              {renderBlock(block)}
            </div>
          ))}

          {termsData.sections.map((section, sectionIndex) => (
            <section key={`section-${sectionIndex}`}>
              <h2 className="text-xl font-semibold mt-4">{section.title}</h2>
              {section.blocks.map((block, blockIndex) => (
                <div key={`block-${sectionIndex}-${blockIndex}`}>
                  {renderBlock(block)}
                </div>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
}
