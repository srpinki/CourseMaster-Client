"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome, Admin! Here you can manage courses, batches, and assignments.</p>
      </div>
    </ProtectedRoute>
  );
}
