import { Link } from "next-view-transitions";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { IoLibrarySharp } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="md:px-14 px-8 py-3 flex items-center justify-between">
      <div className="transition duration-200 flex flex-col gap-1 dark:text-dark-color text-light-color">
        <Link href="/" id="title" className="title flex gap-3 text-xl items-center justify-center">
          <IoLibrarySharp className="text-light-accent-color dark:text-dark-accent-color text-2xl" />
          <h1 className="font-semibold">DocuPro</h1>
        </Link>
      </div>
      <div className="flex gap-3 items-center justify-center">
        <Link
          href="/academia"
          target="_blank"
          className="dark:text-[#B3B3D1] dark:bg-[#171D26] text-[#3A3A5F] bg-[#E8E8EF] rounded-xl p-3 text-xl"
        >
          <FaBookOpen />
        </Link>
        <Link
          className="font-semibold text-xl rounded-xl text-light-warn-color bg-light-warn-background p-3 dark:text-dark-warn-color dark:bg-dark-warn-background"
          title="BetterLab"
          href="/elab"
        >
          <HiLightningBolt />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
