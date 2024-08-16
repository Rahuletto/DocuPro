"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/animations/slide";

export default function SearchBar({
  accent,
  value,
  initial
}: {
  accent?: boolean;
  value?: string;
  initial?: string;
}) {
  const router = useTransitionRouter();
  const [search, setSearch] = useState(value ?? "");

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if(initial === search) return;
    if (event.key === "Enter") onClick(event as any);
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if(!search || initial === search) return;
    const history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history")!)
      : [];

    if (history.includes(search)) history.splice(history.indexOf(search), 1);
    history.push(search);
    localStorage.setItem("history", JSON.stringify(history));

    router.push(`/search?q=${search}`, {
      onTransitionReady: slideInOut,
    });
  }

  return (
    <div
      id="dark"
      className={`transition duration-100 animate-fadeIn flex gap-2 justify-between p-1 rounded-2xl ${
        accent
          ? "bg-light-input dark:bg-dark-input"
          : "bg-light-background-dark dark:bg-dark-background-dark dark-box"
      }`}
    >
      <input
        onKeyPress={onEnter}
        value={search}
        required
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 font-medium text-md dark:text-dark-color md:min-w-[350px] min-w-[250px] transition-all duration-200 text-light-color bg-transparent outline-none ring-0"
      />
      <button
        onClick={onClick}
        type="submit"
        className="text-xl px-6 py-2 bg-light-accent-background rounded-xl text-light-accent-color dark:bg-dark-accent-background dark:text-dark-accent-color"
      >
        <FaSearch />
      </button>
    </div>
  );
}
