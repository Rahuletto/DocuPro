import { Subject } from "@/types/SearchResult";
import React from "react";
import Regulations from "./Regulations";
import Code from "./Code";

import { PaperLink } from "./PaperLink";
import { AllPaper, Link, SortedContent } from "@/types/PaperResults";

export default function PaperCard({ subject }: { subject: AllPaper }) {
  const { title, code } = extractor(subject.title);
  const papers = sortByUnits(subject.links);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-start">
        <h2 className="text-xl font-medium px-3 py-1 text-light-color dark:text-dark-color opacity-70 w-fit capitalize dark:bg-[#ffffff0e] bg-[#0000000e] rounded-lg">
          {title.toLowerCase()}
        </h2>
        <Code code={code ?? ""} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(papers.units).map(([unitName, materials], index) => (
          <div
            key={index}
            className="px-5 py-4 rounded-3xl border-2 border-dashed dark:border-[#FFFFFF0e] border-[#0000000e]"
          >
            <h1 className="font-medium text-lg text-light-color dark:text-dark-color">
              {unitName}
            </h1>
            <hr className="border-light-accent-color dark:border-dark-accent-color opacity-80 border-dashed my-3" />
            <div className="flex flex-col gap-1 mb-2">
              {materials.map((paper, index) => (
                <PaperLink
                  key={index}
                  link={paper}
                  year={subject.year + " Year"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {Object.keys(papers.tutorials).length > 0 && (
        <div className="px-5 py-4 rounded-3xl border-2 border-dashed dark:border-[#FFFFFF0e] border-[#0000000e]">
          <h1 className="font-medium text-lg text-light-color dark:text-dark-color">
            Tutorials
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 mb-2 mt-4">
            {Object.entries(papers.tutorials).map(
              ([category, tutorials], index) => (
                <div key={index}>
                  <h2 className="font-medium text-md text-light-color dark:text-dark-color opacity-70 w-fit capitalize px-2 py-0.5 dark:bg-[#ffffff0e] bg-[#0000000e] rounded-lg mb-2">
                    {category}
                  </h2>
                  <div className="flex flex-col gap-2">
                    {tutorials.map((tutorial, tutorialIndex) => (
                      <PaperLink
                        key={tutorialIndex}
                        link={tutorial}
                        year={subject.year + " Year"}
                        relatedLink={tutorial.relatedLink}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function extractor(subject: string): { title: string; code: string | null } {
  const regex = /(?:\()?(?<code>[A-Z0-9]{6,10})(?:\))?$/;

  const match = subject.match(regex);
  if (match && match.groups) {
    const code = match.groups.code;
    const title = subject.replace(regex, "").trim();
    return { title, code };
  }

  return { title: subject, code: null };
}

function sortByUnits(links: Link[]): SortedContent {
  const result: SortedContent = {
    units: {},
    tutorials: {},
  };

  const tutorialPairs: Record<string, { question?: Link; solution?: Link }> =
    {};

  links.forEach((link) => {
    if (link.title.toLowerCase().includes("tutorial")) {
      const category = isNaN(Number(link.title.split(" ")[1]))
        ? link.title.split(" ")[0]
        : String(link.title.split(" ")[0] + " " + link.title.split(" ")[1]);

      const isSolution = link.title.toLowerCase().includes("solutions");
      const baseName = link.title.replace(/ solutions/i, "").trim();

      if (!tutorialPairs[baseName]) {
        tutorialPairs[baseName] = {};
      }

      if (isSolution) {
        tutorialPairs[baseName].solution = link;
      } else {
        tutorialPairs[baseName].question = link;
      }

      if (!result.tutorials[category]) {
        result.tutorials[category] = [];
      }
    } else {
      const match = link.title.match(/Unit (\d+)/i);
      if (match) {
        const unitNumber = match[1];
        const unitName = `Unit ${unitNumber}`;
        if (!result.units[unitName]) {
          result.units[unitName] = [];
        }
        result.units[unitName].push(link);
      } else {
        if (!result.units["General"]) {
          result.units["General"] = [];
        }
        result.units["General"].push(link);
      }
    }
  });

  Object.entries(tutorialPairs).forEach(([baseName, pair]) => {
    const category = isNaN(Number(baseName.split(" ")[1]))
      ? baseName.split(" ")[0]
      : String(baseName.split(" ")[0] + " " + baseName.split(" ")[1]);
    if (pair.question) {
      result.tutorials[category].push({
        ...pair.question,
        relatedLink: pair.solution,
      });
    }
  });

  return result;
}
