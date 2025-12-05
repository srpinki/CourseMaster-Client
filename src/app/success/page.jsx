"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/session/${sessionId}`
        );
        setSession(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load session details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Error 😞</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful ✅</h1>
      <p className="text-lg text-gray-700 mb-4">Thank you for your purchase!</p>

      {session && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-left">
          <h2 className="text-2xl font-semibold mb-2">{session?.metadata?.courseTitle}</h2>
          <p className="text-gray-600 mb-1">
            Purchased by: {session?.customer_email || "Unknown"}
          </p>
          <p className="text-gray-600 mb-1">
            Amount: ${(session?.amount_total / 100).toFixed(2)} {session?.currency?.toUpperCase()}
          </p>
          <p className="text-gray-600 mb-1">
            Payment Status: {session?.payment_status}
          </p>
        </div>
      )}
    </div>
  );
}
