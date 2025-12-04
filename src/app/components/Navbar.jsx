"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/slice/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // client-only flag
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Mark component as mounted (client)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDashboard = () => {
    if (!user) return;
    router.push(user.role === "admin" ? "/dashboard/admin" : "/dashboard/student");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  if (!mounted) return null; 

  return (
    <nav className="w-full bg-white backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center cursor-pointer"
            onClick={handleDashboard}
          >
            <span className="text-white text-xl">🎓</span>
          </div>
          <h2 className="text-xl font-semibold cursor-pointer text-gray-700" onClick={handleDashboard}>
            CourseMaster
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/courses" className="hover:text-blue-600 transition">
            Courses
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition">
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={handleDashboard}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          <Link href="/" className="block text-gray-700 text-lg">
            Home
          </Link>
          <Link href="/courses" className="block text-gray-700 text-lg">
            Courses
          </Link>

          {!user && (
            <>
              <Link href="/auth/login" className="block text-gray-700 text-lg">
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="block text-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700"
              >
                Get Started
              </Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={handleDashboard}
                className="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
