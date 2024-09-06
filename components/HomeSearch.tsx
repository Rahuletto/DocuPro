"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/SearchBar";

export default function HomeSearch() {
  const [init, setInit] = useState(false);
  const [papers, setPapers] = useState(false);
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    setInit(true);
    if (mode) {
      setPapers(mode === "resources");
    }
  }, []);
  function onClick(bool: boolean) {
    setPapers(bool);
    localStorage.setItem("mode", bool ? "resources" : "qp");
  }
  return (
    <div className="flex flex-col gap-3">
      <Search papers={papers} />
      {init && (
        <div className="flex gap-2 w-full items-center justify-center">
          <button
            onClick={() => onClick(false)}
            className={`${
              papers
                ? "dark:bg-dark-accent-background bg-light-accent-background text-light-accent-color dark:text-dark-accent-color"
                : "dark:bg-dark-accent-color bg-light-accent-color text-light-background-light dark:text-dark-background-darker"
            } transition duration-200 px-3 py-1 font-medium text-sm rounded-lg`}
          >
            Search for semester papers
          </button>
          <button
            onClick={() => onClick(true)}
            className={`${
              !papers
                ? "dark:bg-dark-accent-background bg-light-accent-background text-light-accent-color dark:text-dark-accent-color"
                : "dark:bg-dark-accent-color bg-light-accent-color text-light-background-light dark:text-dark-background-darker"
            } transition duration-200 px-3 py-1 font-medium text-sm rounded-lg`}
          >
            Search for resources
          </button>
        </div>
      )}
    </div>
  );
}
