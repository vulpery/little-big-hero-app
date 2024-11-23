"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  let currentTheme = theme;

  if (theme === "system") {
    currentTheme =
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }

  return (
    <div className="cursor-pointer bg-background text-primary-green border border-b p-3 rounded-lg h-full self-center  lg:static lg:w-auto  lg:rounded-xl lg:border">
      {currentTheme === "light" ? (
        <Moon height={24} width={24} onClick={() => setTheme("dark")} />
      ) : (
        <Sun height={24} width={24} onClick={() => setTheme("light")} />
      )}
    </div>
  );
};

export default ThemeSwitcher;
