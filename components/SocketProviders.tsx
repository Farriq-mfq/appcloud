"use client";
import axios from "axios";
import { ReactNode, useEffect } from "react";

export default function SocketProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    axios.get("/api/socket");
  }, []);
  console.log('ok')
  return children;
}
