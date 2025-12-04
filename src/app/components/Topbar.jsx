"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiUserCircle, HiLogout, HiCog } from "react-icons/hi";

import Link from "next/link";
import { logout } from "@/app/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function Topbar({ toggleSidebar }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(null);
  const profileRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-sm sticky top-0 z-40 bg-white/80 border-b border-gray-200">
      {!mounted || !user ? (
        <div className="flex-1 h-12 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <>
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition"
            >
              <HiMenu size={20} />
            </button>

            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'profile' ? null : 'profile')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-gray-200 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden flex items-center justify-center text-white">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden sm:block font-medium">{user.displayName || "User"}</span>
              </button>

              {openDropdown === 'profile' && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                  <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                    <HiUserCircle /> Profile
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                    <HiCog /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <HiLogout /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
