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
        router.push(`/search?q=${text.replaceAll(" ", "+")}`, {
          onTransitionReady: slideInOut,
        });
      }}
      className="cursor-pointer transition duration-200 dark:active:bg-dark-accent-background active:bg-light-accent-background px-4 line-clamp-1 md:text-lg text-md dark:opacity-40 opacity-60 py-2 rounded-xl font-medium border-2 border-dashed hover:border-light-accent-color dark:hover:border-dark-accent-color hover:text-light-accent-color dark:hover:text-dark-accent-color hover:opacity-80 text-light-color dark:text-dark-color"
    >
      {text}
    </p>
  );
}
