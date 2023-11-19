"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
export default function Provider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <SessionProvider>
          {path === "/auth/login" ? (
            <div className="bg-default-100 min-h-screen grid place-items-center px-2">{children}</div>
          ) : (
            <>
              <Header />
              <main className="wrapper">
                <div className="container">{children}</div>
              </main>
            </>
          )}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
