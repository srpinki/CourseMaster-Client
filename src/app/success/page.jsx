"use client"; // IMPORTANT: ensures this page is client-only

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Stripe session ID:", sessionId);
      // Optionally, fetch session details from your backend here
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Payment Successful ✅
      </h1>
      <p className="text-lg text-gray-700">
        Thank you for your purchase! You are now enrolled in the course.
      </p>
    </div>
  );
}
