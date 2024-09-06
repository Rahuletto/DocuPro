import React from "react";

import { Kaizen } from "../../types/PaperResults";
import { KaizenLink } from "./KaizenLink";
export default function KaizenCards({ kaizen }: { kaizen: Kaizen }) {
  return (
    <div className="border border-opacity-10 dark:border-opacity-15 dark:border-light-kaizen-background border-dark-kaizen-background px-5 py-4 rounded-3xl max-w-[350px] bg-light-kaizen-background dark:bg-dark-kaizen-background">
      <h1 className="font-dm capitalize text-lg text-light-kaizen-color dark:text-dark-kaizen-color">
        {kaizen.title.toLowerCase()}
      </h1>

      <hr className="border-light-kaizen-color dark:border-dark-kaizen-color opacity-80 border-dashed my-3" />

      <div className="flex flex-col gap-1 mb-2">
        {kaizen.links
          .filter((a) => a.title === "Main")
          .map((link, index) => (
            <>
              <KaizenLink key={index} link={link} />
              <div className="flex flex-col gap-2 w-full pl-2 border-l border-dashed border-light-kaizen-color dark:border-dark-kaizen-color ml-3">
                {kaizen.links
                  .filter((a) => a.title !== "Main")
                  .map((link, index) => (
                    <KaizenLink key={index} link={link} />
                  ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
