"use client";

import Image from "next/image";
import React from "react";
import { Bell } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  user?: { name?: string; email?: string; avatar?: string };
  notifCount?: number;
  onMenuClick?: () => void; // optional if you want to toggle mobile sidebar
};

export default function DashboardTopbar({
  title = "Dashboard Overview",
  subtitle = "Manage your GitHub documentation projects",
  user = { name: "John Doe", email: "john@example.com", avatar: "" },
  notifCount = 2,
  onMenuClick,
}: Props) {
  return (
    <header className="w-full bg-white border-b-2 border-[#4a4646] shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Container height close to original (98px) -> use h-24 (96px) */}
        <div className="h-24 flex items-center justify-between">
          {/* Left: title + subtitle */}
          <div className="flex-1 min-w-0">
            {/* On small screens center text, on md screens align left */}
            <div className="md:flex md:items-center md:gap-4">
              <div className="w-full md:w-auto">
                <h1 className="text-2xl md:text-3xl font-impact text-[#111827] text-center md:text-left leading-tight">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-gray-500 text-center md:text-left">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4 ml-4">
            {/* Notification button */}
            <button
              aria-label="Notifications"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#687ad5] hover:bg-[#5c6dd1] text-white shadow"
            >
              <Bell size={18} />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[10px] font-medium bg-red-500 text-white rounded-full px-[6px] h-5">
                  {notifCount}
                </span>
              )}
            </button>

            {/* User card */}
            <div className="flex items-center gap-3 bg-transparent">
              <div className="w-12 h-12 rounded-full bg-[#2f2f7a] overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name ?? "avatar"}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                    {(user.name ? user.name[0] : user.email?.[0] ?? "U").toUpperCase()}
                  </div>
                )}
              </div>

              <div className="hidden md:flex md:flex-col md:items-start">
                <span className="text-sm font-medium text-[#111827]">{user.name ?? user.email}</span>
                <span className="text-xs text-gray-500">Developer</span>
              </div>

              {/* small chevron / menu for profile - on mobile we keep only avatar */}
              <button
                className="hidden md:inline-flex items-center justify-center px-2 py-1 rounded hover:bg-gray-100"
                aria-label="Open profile menu"
                onClick={() => {
                  /* hook for profile menu if needed */
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-75">
                  <path d="M6 9l6 6 6-6" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>

            {/* Optional mobile menu button (if parent wants to control) */}
            {onMenuClick && (
              <button
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-transparent"
                onClick={onMenuClick}
                aria-label="Open sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
