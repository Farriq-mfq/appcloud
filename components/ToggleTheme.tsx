"use client";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";
export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
      isIconOnly
    >
      {theme === "light" ? <CiLight /> : <CiDark />}
    </Button>
  );
}
