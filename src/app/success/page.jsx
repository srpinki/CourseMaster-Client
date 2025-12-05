"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Stripe session ID:", sessionId);
      // Optionally fetch session details from backend
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful 🎉</h1>
      <p className="text-gray-700">You are now enrolled in the course.</p>
    </div>
  );
}
