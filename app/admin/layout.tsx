"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const session = useSession();
  if (session.status === "authenticated") return children;
  else if (session.status === "loading") return "Loading...";
}
