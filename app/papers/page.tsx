import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";
import React from "react";
import GroupedSubjects, { GroupKaizen } from "./components/Groups";
import { BiError } from "react-icons/bi";
import { fetchTimeout } from "@/misc/fetch";
import { AllPaper, Kaizen } from "@/types/PaperResults";

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.q || "";

  //   if (!search) redirect("/");

  const response: { papers: AllPaper[] } = await fetchTimeout(
    `https://neat-issi-proscrape-ae9ba923.koyeb.app/api/ct/getAll`,
    { cache: "force-cache" },
    20000
  );

  const kaizen: Kaizen[] = await fetchTimeout(
    `https://neat-issi-proscrape-ae9ba923.koyeb.app/api/ct/kaizen`,
    { cache: "force-cache" },
    10000
  );

  const data = response.papers.filter((paper: AllPaper) => {
    return paper?.title?.toLowerCase()?.includes(`${search}`.toLowerCase());
  });

  const kaizendata = kaizen.filter((paper) => {
    return paper?.title?.toLowerCase()?.includes(`${search}`.toLowerCase());
  });

  if (!data)
    return (
      <div className="h-screen p-4">
        <div className="h-full w-full rounded-2xl bg-dark-background-dark p-2">
          <div className="flex h-full animate-fadeIn flex-col items-center justify-center gap-2 rounded-xl bg-light-error-background p-8 text-light-error-color dark:bg-dark-error-background dark:text-dark-error-color">
            <BiError className="mb-3 text-4xl" />
            <h1 className="text-2xl font-medium text-light-error-color dark:text-dark-error-color">
              Error.
            </h1>
            <p className="text-md max-w-[500px] text-center italic text-light-error-color opacity-90 dark:text-dark-error-color">
              *intense crash sound*
            </p>

            <pre className="lg:text-md mx-2 mt-4 max-h-[500px] w-[80vw] overflow-auto rounded-2xl border-2 border-dashed border-light-error-color p-3 text-xs text-light-error-color opacity-90 md:text-sm dark:border-dark-error-color dark:text-dark-error-color">
              <code>
                Docuscrape server is not available at the moment, try again some
                time.
              </code>
            </pre>
          </div>
        </div>
      </div>
    );

  return (
    <main className="relative transition duration-200 min-h-screen overflow-hidden bg-light-background-normal dark:bg-dark-background-normal p-2 pt-0">
      <Header />
      <div className="flex flex-col items-center justify-start w-full min-h-screen overflow-auto px-6 py-3 rounded-2xl dark:bg-dark-background-dark bg-light-background-dark">
        <div
          id="dark"
          className="dark-box max-w-[1400px] w-full flex flex-col gap-10 justify-start items-start h-full md:mt-14 mt-4"
        >
          <SearchBar
            papers
            accent
            initial={search.toString()}
            value={search.toString()}
          />
          <GroupedSubjects subjects={data} />
          {kaizendata?.[0] && <GroupKaizen kaizen={kaizendata} />}
        </div>
      </div>
    </main>
  );
}
