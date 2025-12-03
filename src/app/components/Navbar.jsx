"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🎓</span>
          </div>
          <h2 className="text-xl font-semibold">CourseMaster</h2>
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
          <Link
            href="/auth/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Log In
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition"
          >
            Get Started
          </Link>
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
          <Link href="/auth/login" className="block text-gray-700 text-lg">
            Log In
          </Link>

          <Link
            href="/auth/register"
            className="block text-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
