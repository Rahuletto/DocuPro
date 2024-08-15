"use client";
import { Themes } from "@/misc/theme";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const initialTheme = {
  isDark: true,
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialTheme);
export function useTheme() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return { isDark, toggleTheme };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const isStored = localStorage.getItem("theme");
    if (localStorage.getItem("theme") === "bw") {
      document.documentElement.classList.add("bw");
    } else if (
      localStorage.getItem("theme") === "dark" ||
      (!isStored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (
      localStorage.getItem("theme") === "light" ||
      (!isStored && window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setIsDark(event.matches);
      });

    function keyHandler(key: KeyboardEvent) {
      if (
        (key.metaKey || key.ctrlKey) &&
        key.shiftKey &&
        key.key.toLowerCase() === "p"
      )
        setIsDark((prev) => !prev);
    }

    window.addEventListener("keydown", keyHandler);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", (event) => {
          setIsDark(event.matches);
        });
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    const metaTag = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (isDark) {
      document.documentElement.classList.remove("bw");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      if (metaTag)
        metaTag.setAttribute("content", Themes.dark.background.normal);
    } else if (isDark === false) {
      document.documentElement.classList.remove("bw");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      if (metaTag)
        metaTag.setAttribute("content", Themes.light.background.normal);
    }
  }, [isDark]);

  const props = useMemo(() => {
    const toggleTheme = () => {
      setIsDark(!isDark);
    };
    return { isDark: isDark || false, toggleTheme };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={props}>{children}</ThemeContext.Provider>
  );
}
