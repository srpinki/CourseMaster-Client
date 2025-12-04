"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else if (role && user.role !== role) {
      router.push("/auth/login"); // prevent access if role mismatch
    }
  }, [user, router, role]);

  return <>{user ? children : null}</>;
}
