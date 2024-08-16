'use client'
import { useTheme } from "@/provider/ThemeProvider";
import React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle({ absolute }: { absolute?: boolean }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="toggle">
    <button
      onClick={toggleTheme}
      title="Toggle Theme (Ctrl+Shift+P)"
      className={`${absolute ? "fixed top-4 right-4 z-30" : ""} text-md rounded-full p-2 opacity-60 transition duration-200 hover:bg-light-background-dark active:-rotate-45 dark:text-dark-color text-light-color dark:hover:bg-dark-background-dark`}
    >
      {isDark ? <LuMoon /> : <LuSun />}
    </button>
    </div>
  );
}
