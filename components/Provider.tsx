"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "./Header";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Header />
        <main className="wrapper">
          <div className="container">{children}</div>
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
