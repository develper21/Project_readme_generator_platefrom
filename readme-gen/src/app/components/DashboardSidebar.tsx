"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Archive,
  Plus,
  User,
  Settings,
  ChevronLeft,
  Menu
} from "lucide-react";

type User = {
  name?: string;
  email?: string;
};

export default function DashboardSidebar({ user }: { user?: User }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // load persisted collapsed state
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("sidebar-collapsed") : null;
    if (saved === "1") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", collapsed ? "1" : "0");
    }
  }, [collapsed]);

  const nav = [
    { label: "Overview", href: "/dashboard", icon: <Home size={20} /> },
    { label: "Projects", href: "/dashboard/projects", icon: <Archive size={20} /> },
    { label: "Generate", href: "/dashboard/generate", icon: <Plus size={20} /> },
    { label: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  function NavLink({ item }: { item: typeof nav[0] }) {
    const active = pathname === item.href || pathname?.startsWith(item.href + "/");
    const base = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";
    const activeClass = "bg-white/20 text-white";
    const inactiveClass = "text-white/90 hover:bg-white/10";
    return (
      <Link href={item.href} onClick={() => setMobileOpen(false)}>
        <div className={`${base} ${active ? activeClass : inactiveClass}`}>
          <div className="flex items-center justify-center w-7">{item.icon}</div>
          {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
        </div>
      </Link>
    );
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#5d66d6]/95 text-white shadow"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu">
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-full bg-[#5d66d6] text-white 
          flex flex-col p-4 transition-all duration-200 ease-in-out

          /* mobile sliding */
          ${mobileOpen ? "translate-x-0 w-72" : "translate-x-[-100%] w-72 md:translate-x-0 md:w-auto"}

          /* desktop collapsed/expanded */
          md:${collapsed ? "w-20" : "w-64"}
        `}
        aria-label="Sidebar">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`font-bold text-white select-none ${collapsed ? "text-sm" : "text-lg md:text-xl"}`}
              style={{ fontFamily: "Impact, system-ui" }}>
              {!collapsed ? "ReadMe Hub" : "RM"}
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu">
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <NavLink item={n} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <div className={`bg-white/10 p-3 rounded flex items-center gap-3 transition-all ${collapsed ? "justify-center" : ""}`}>
            <div
              className={`w-10 h-10 rounded-full bg-[#2f2f7a] flex items-center justify-center text-sm font-semibold`}>
              {user?.name?.[0] ?? user?.email?.[0] ?? "U"}
            </div>

            {!collapsed && (
              <div className="flex-1">
                <div className="text-sm font-semibold">{user?.name ?? user?.email ?? "John Doe"}</div>
                <div className="text-xs opacity-80">Developer</div>
              </div>
            )}
          </div>

          <div className="mt-3">
            <button
              onClick={() => setCollapsed((s) => !s)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition`}
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <div className="flex items-center justify-center w-7">
                <ChevronLeft size={16} className={`${collapsed ? "rotate-180" : ""} transition-transform`} />
              </div>
              {!collapsed && <span className="text-sm">Collapse</span>}
            </button>
          </div>
        </div>
      </aside>

      <div className={`hidden md:block ${collapsed ? "w-20" : "w-64"}`} />
    </>
  );
}
