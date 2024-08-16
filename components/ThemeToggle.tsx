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
      style={{ WebkitBackdropFilter: "blur(12px)" }}
      className={`${absolute ? "fixed top-4 right-4 z-50 dark:bg-dark-background-normal bg-light-background-normal" : ""} backdrop-blur-md text-md rounded-full p-2 opacity-70 transition duration-200 hover:bg-light-background-dark active:-rotate-45 dark:text-dark-color text-light-color dark:hover:bg-dark-background-dark`}
    >
      {isDark ? <LuMoon /> : <LuSun />}
    </button>
    </div>
  );
}
