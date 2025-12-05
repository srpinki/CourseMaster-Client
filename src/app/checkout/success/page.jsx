"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/app/lib/axios"; // optional if you want to fetch session details
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID");
      setLoading(false);
      return;
    }

    // Optional: fetch session details from backend
    const fetchSession = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/session/${sessionId}`);
        if (!res.ok) throw new Error("Failed to load session details");
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Error 😞</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful ✅</h1>
        <p className="text-gray-700 mb-6">You are now enrolled in <span className="font-semibold">{session?.line_items?.[0]?.description || "your course"}</span>.</p>

        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            <span className="font-medium">Session ID:</span> {sessionId}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Amount Paid:</span> ${((session?.amount_total || 0) / 100).toFixed(2)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Currency:</span> {session?.currency?.toUpperCase() || "USD"}
          </p>
        </div>

        <Link
          href="/courses"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Go to Courses
        </Link>
      </div>
    </div>
  );
}
