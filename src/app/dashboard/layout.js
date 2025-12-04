"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

export default function DashboardLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  // Loader while waiting for mounted or user
  if (!mounted || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const role = user.role || "student";

  return (
    <ProtectedRoute role={role}>
      <div className="flex min-h-screen bg-blue-50 text-gray-700">
        {/* Sidebar */}
        <Sidebar
          role={role}
          isCollapsed={isCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <Topbar
            user={user}
            toggleSidebar={() => {
              if (window.innerWidth >= 768) setIsCollapsed(!isCollapsed);
              else setMobileOpen(!mobileOpen);
            }}
          />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-white rounded-lg shadow-sm m-4">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
