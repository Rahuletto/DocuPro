
import { Link as LinkType } from "@/types/PaperResults";
import { Paper } from "@/types/SearchResult";
import { Link } from "next-view-transitions";
import React from "react";
import { FaPaperclip } from "react-icons/fa";

export default function CardLink({ paper }: { paper: Paper }) {
  return (
    <Link
      href={"/pdf/" + paper.link.split("/123456789/")[1]}
      tabIndex={0}
      title={paper.published}
      aria-label={`${paper.published} paper`}
      target="_blank"
      className="cursor-pointer transition duration-75 flex gap-2 items-center justify-start hover:bg-dark-accent-background px-2 py-2 rounded-xl dark:hover:bg-dark-accent-background-light hover:bg-light-accent-background-light"
    >
      <div className="text-light-accent-color dark:text-dark-accent-color">
        <FaPaperclip />
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="font-medium text-light-color dark:text-dark-color">
          {paper.published.replace("-", " ")}
        </span>
        {paper.year.includes("undefined") ? null : (
          <span className="text-light-color px-2 py-0.5 dark:text-dark-color opacity-70 text-xs flex items-center justify-center font-medium dark:bg-[#ffffff0e] bg-[#0000000e] rounded-md">
            {paper.year}
          </span>
        )}
      </div>
    </Link>
  );
}