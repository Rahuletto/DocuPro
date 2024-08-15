"use client";
import React, { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { FaTrash, FaXmark } from "react-icons/fa6";

export default function History() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const storedHistory = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history")!)
        : [];

      const processedHistory = storedHistory
        .filter((item: string) => item !== null && item !== "")
        .reverse()
        .slice(0, 6);

      setHistory(processedHistory);
    };

    loadHistory();
    const intervalId = setInterval(loadHistory, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function clear() {
    const conf = confirm("Are you sure you want to clear history?");
    if (conf) {
      localStorage.setItem("history", "[]");
      setHistory([]);
    }
  }

  return (
    history[0] ? (
      <div className="relative animate-fadeIn bg-light-background-light transition-all duration-200 dark:bg-dark-background-light px-6 py-4 pb-6 rounded-3xl md:w-[50%] md:mx-0 w-[95vw] mx-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-xl text-light-color dark:text-dark-color">
            Recent Search
          </h3>
        </div>
        <button
          title="Clear history"
          onClick={clear}
          className="absolute bottom-2 right-2 text-light-error-color opacity-60 hover:opacity-90 p-2 transition-all duration-100 rounded-full dark:text-dark-error-color bg-light-error-background dark:bg-dark-error-background"
        >
          <FaTrash />
        </button>
        <div className="md:grid grid-cols-3 grid-rows-2 flex flex-col mt-3 gap-2">
          {history.map((text, index) => (
            <HistoryCard key={index} text={text} />
          ))}
        </div>
      </div>
    ) : <div className="mt-16" />
  );
}
