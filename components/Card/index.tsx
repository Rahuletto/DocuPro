import { Subject } from "@/types/SearchResult";
import React from "react";
import Regulations from "./Regulations";
import Code from "./Code";

import Link from "./Link";
export default function Card({ name, code, regulation, papers }: Subject) {
  return (
    <div className="px-5 py-4 rounded-3xl border-2 border-dashed max-w-[350px] dark:border-[#FFFFFF0e] border-[#0000000e]">
      <h1 className="font-medium text-lg text-light-color dark:text-dark-color">
        {name.replace(code, "")}
      </h1>
      <div className="mt-2 flex gap-2 items-center justify-start">
        <Code code={code} />
        <Regulations reg={regulation} />
      </div>

      <hr className="border-light-accent-color dark:border-dark-accent-color opacity-80 border-dashed my-3" />

      <div className="flex flex-col gap-1 mb-2">
        {papers.map((paper, index) => (
          <Link key={index} paper={paper} />
        ))}
      </div>
    </div>
  );
}