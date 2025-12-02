"use client";
import { useState } from "react";
import api from "../../../lib/axios";


export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    registrationKey: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault(); 

    try {
      const res = await api.post("/api/auth/register", form); 
      console.log("Success:", res.data);
      alert("User Registered!");
    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        placeholder="Admin Key (optional)"
        onChange={(e) => setForm({ ...form, registrationKey: e.target.value })}
      />

      <button type="submit">Register</button>
    </form>
  );
}
