import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 mt-16 py-6 bg-white">
      <div className="container mx-auto flex flex-col items-center justify-center text-center gap-2">
        <span className="text-sm text-gray-600 font-inclusive-sans mt-2">
          © {new Date().getFullYear()} Readme Hub. All rights reserved.
        </span>
        <div className="flex flex-row items-center justify-center gap-2">
          <a
            href="/terms"
            className="text-sm text-blue-600 hover:underline font-inclusive-sans">
            Terms of Service
          </a>
          <span className="text-black">.</span>
          <a
            href="/privacy"
            className="text-sm text-blue-600 hover:underline font-inclusive-sans">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
