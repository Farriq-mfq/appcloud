"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") router.push("/");
  else if (session.status === "loading") return "loading...";
  else return children;
}
