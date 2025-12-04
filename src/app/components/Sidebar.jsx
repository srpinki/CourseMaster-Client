"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar({ role, isCollapsed = false, mobileOpen = false, onCloseMobile }) {
  const studentLinks = [
    { name: "My Courses", href: "/dashboard/student/courses" },
    { name: "Assignments", href: "/dashboard/student/assignments" },
  ];

  const adminLinks = [
    { name: "Manage Courses", href: "/dashboard/admin/courses" },
    { name: "Manage Students", href: "/dashboard/admin/students" },
    { name: "Assignments", href: "/dashboard/admin/assignments" },
  ];

  const linksMap = { admin: adminLinks, student: studentLinks };
  const links = linksMap[role] || [];

  // Dynamic classes for desktop collapse and mobile open
  const sidebarBase = "bg-gray-100 p-4 fixed z-50 h-full top-0 left-0 transition-all duration-300 flex flex-col";
  const desktopWidth = isCollapsed ? "md:w-16" : "md:w-64";
  const mobileWidth = mobileOpen ? "w-64" : "w-0 overflow-hidden";

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <div className={`${sidebarBase} ${desktopWidth} ${mobileWidth} md:block`}>
        <h2 className={`text-lg font-bold mb-6 ${isCollapsed ? "hidden" : "block"}`}>
          Dashboard
        </h2>

        <ul className="flex-1 space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 hover:text-blue-500 transition-colors ${
                  isCollapsed ? "text-center px-0" : ""
                }`}
                onClick={onCloseMobile}
              >
                {isCollapsed ? link.name[0] : link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
