import { slideInOut } from "@/animations/slide";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";

export default function HistoryCard({ text }: { text: string }) {
  const router = useTransitionRouter();

  function whenOpened(item: string) {
    const history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history")!)
      : [];

    const updatedHistory = history.filter(
      (historyItem: string) => historyItem !== item
    );

    updatedHistory.push(item);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  }
  return (
    <p
      onClick={() => {
        whenOpened(text);
        router.push(
          `/${text.includes("æ") ? "papers" : "search"}?q=${text
            .replace("æ", "")
            .replaceAll(" ", "+")}`,
          {
            onTransitionReady: slideInOut,
          }
        );
      }}
      className={`${text.includes("æ") ? "border-dotted" : "border-dashed"} cursor-pointer flex items-center justify-between gap-2 transition duration-200 dark:active:bg-dark-accent-background active:bg-light-accent-background px-4 line-clamp-1 md:text-lg text-md dark:opacity-40 opacity-60 py-2 rounded-xl font-medium border-2 hover:border-light-accent-color dark:hover:border-dark-accent-color hover:text-light-accent-color dark:hover:text-dark-accent-color hover:opacity-80 text-light-color dark:text-dark-color`}
    >
      {text.replace("æ", "")}
      {text.includes("æ") ? <span className="px-1 flex rounded-full bg-dark-accent-background text-dark-accent-color text-xs">R</span>: null}
    </p>
  );
}
