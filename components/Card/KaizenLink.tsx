import React from "react";
import Link from "next/link";
import { FaPaperclip, FaQuestion, FaLightbulb } from "react-icons/fa";
import { Link as LinkType } from "@/types/PaperResults";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { IoLibrarySharp } from "react-icons/io5";

interface PaperLinkProps {
  link: LinkType;
}

export function KaizenLink({ link }: PaperLinkProps) {
  return (
    <Link
      href={link.url}
      tabIndex={0}
      title={link.title}
      target="_blank"
      className="w-full cursor-pointer transition duration-75 flex gap-2 items-center justify-start hover:bg-[#0000000e] px-2 py-2 rounded-xl dark:hover:bg-dark-kaizen-background-light hover:dark:bg-[#ffffff19]"
    >
      <div className="text-light-kaizen-color dark:text-dark-kaizen-color">
        {link.title === "Assignments" ? <MdOutlineTaskAlt /> : link.title === "Tests" ? <PiExamFill /> : link.title === "Resources" ? <IoLibrarySharp /> : <FaPaperclip />}
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="font-medium text-light-color dark:text-dark-color">
          {link.title}
        </span>
      </div>
    </Link>
  );
}
