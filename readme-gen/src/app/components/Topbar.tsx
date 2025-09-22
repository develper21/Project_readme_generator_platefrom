import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Topbar: NextPage = () => {
  return (
    <header
      className="w-full h-20 bg-[#687ad5] border-[3px] border-[#4a4646] shadow-[10px_4px_10px_rgba(0,0,0,0.25)]"
        style={{ boxSizing: "border-box", fontFamily: "Impact" }}>

      <div className="max-w-[1280px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="text-white text-xl md:text-3xl leading-none select-none">
            ReadMe Hub
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/signin">
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center bg-white text-black rounded-xl px-4 py-2 h-10 text-sm font-medium shadow-sm hover:brightness-95 transition cursor-pointer"
              aria-label="Log in">
              log In
            </button>
          </Link>

          <button
            type="button"
            className="hidden md:inline-flex items-center justify-center bg-[#5891fa] text-white rounded-xl px-4 py-2 h-10 text-sm font-semibold shadow-sm hover:brightness-90 transition cursor-pointer"
            aria-label="Get started">
            Get Started
          </button>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md"
            aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Topbar;
