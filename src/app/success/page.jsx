"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided.");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/session/${sessionId}`
        );

        if (!res.ok) throw new Error("Failed to fetch session details.");

        const data = await res.json();
        console.log("Stripe session details:", data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-700">
        You are now enrolled in the course.
      </p>
    </div>
  );
}
