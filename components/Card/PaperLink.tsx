import React from "react";
import Link from "next/link";
import { FaPaperclip, FaQuestion, FaLightbulb } from "react-icons/fa";

interface LinkType {
  title: string;
  url: string;
}

interface PaperLinkProps {
  link: LinkType;
  year: string;
  relatedLink?: LinkType;
}

export function PaperLink({ link, year, relatedLink }: PaperLinkProps) {
  const isQuestion =
    link.title.toLowerCase().includes("tutorial") &&
    !link.title.toLowerCase().includes("solutions");
  const isSolution = link.title.toLowerCase().includes("solutions");

  const renderButton = (
    buttonLink: LinkType,
    icon: React.ReactNode,
    label: string
  ) => (
    <Link
      href={buttonLink.url}
      tabIndex={0}
      title={buttonLink.title}
      target="_blank"
      className="w-fit cursor-pointer transition duration-75 flex gap-2 items-center justify-center hover:bg-dark-accent-background px-3 py-1 text-sm rounded-lg dark:hover:bg-dark-accent-background-light hover:bg-light-accent-background-light"
    >
      <div className="text-light-accent-color dark:text-dark-accent-color">
        {icon}
      </div>
      <span className="font-medium text-light-color dark:text-dark-color text-sm">
        {label}
      </span>
    </Link>
  );

  if (isQuestion && relatedLink) {
    return (
      <Link
        href={link.url}
        tabIndex={0}
        title={link.title}
        target="_blank"
        className="w-full transition duration-75 flex gap-2 flex-col items-start justify-start hover:bg-dark-accent-background px-2 py-2 rounded-xl dark:hover:bg-dark-accent-background-light hover:bg-light-accent-background-light"
      >
        <div className="w-full cursor-pointer transition duration-75 flex gap-2 items-center justify-start">
          <div className="text-light-accent-color dark:text-dark-accent-color">
            <FaPaperclip />
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="font-medium text-light-color dark:text-dark-color">
              {link.title}
            </span>
            {year.includes("undefined") ? null : (
              <span className="text-light-color min-w-14 px-2 py-0.5 dark:text-dark-color opacity-70 text-xs flex items-center justify-center font-medium dark:bg-[#ffffff0e] bg-[#0000000e] rounded-md">
                {year}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 w-full pl-2 border-l border-dashed border-dark-accent-color ml-2">
          {renderButton(relatedLink, <FaLightbulb />, "Solution")}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={link.url}
      tabIndex={0}
      title={link.title}
      target="_blank"
      className="w-full cursor-pointer transition duration-75 flex gap-2 items-center justify-start hover:bg-dark-accent-background px-2 py-2 rounded-xl dark:hover:bg-dark-accent-background-light hover:bg-light-accent-background-light"
    >
      <div className="text-light-accent-color dark:text-dark-accent-color">
        <FaPaperclip />
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="font-medium text-light-color dark:text-dark-color">
          {link.title}
        </span>
        {year.includes("undefined") ? null : (
          <span className="text-light-color min-w-14 px-2 py-0.5 dark:text-dark-color opacity-70 text-xs flex items-center justify-center font-medium dark:bg-[#ffffff0e] bg-[#0000000e] rounded-md">
            {year}
          </span>
        )}
      </div>
    </Link>
  );
}
