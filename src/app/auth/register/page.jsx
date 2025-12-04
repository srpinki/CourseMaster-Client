"use client";

import api from "@/app/lib/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    registrationKey: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      const { user, accessToken } = res.data;

      // Save Redux state
      dispatch(setCredentials({ user, accessToken }));
      localStorage.setItem("token", accessToken);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${user.email}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push(user.role === "admin" ? "/dashboard/admin" : "/dashboard/student");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Try again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome to CourseMaster</h2>
        <p className="mb-8 text-center text-gray-600">Start your learning journey today</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {form.role === "admin" && (
            <input
              placeholder="Admin Key"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
              onChange={(e) => setForm({ ...form, registrationKey: e.target.value })}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
