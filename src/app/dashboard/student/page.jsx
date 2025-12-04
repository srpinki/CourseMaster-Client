"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute role="student">
      <div className="p-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p>Welcome, Student! View your enrolled courses, progress, and assignments here.</p>
      </div>
    </ProtectedRoute>
  );
}
