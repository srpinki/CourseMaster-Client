"use client";
import { useState } from "react";
import api from "../../../../lib/axios";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);
      console.log("Success:", res.data);
      alert("Logged in successfully!");
      // Redirect or save token logic here
    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome to CourseMaster
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Start your learning journey today
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            placeholder="Email"
            type="email"
            required
            className="text-gray-800 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Password"
            type="password"
            required
            className=" text-gray-800 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-gray-500 text-sm">
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Create Account
          </a>
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
