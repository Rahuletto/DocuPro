import Card from "@/components/Card";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Subject } from "@/types/SearchResult";
import { redirect } from "next/navigation";
import React from "react";

const GroupedSubjects = ({ subjects }: { subjects: Subject[] }) => {
  const groupedSubjects = subjects.reduce((acc, subject) => {
    const regulationCount = subject.regulation.split(" ")[0];
    if (!acc[regulationCount]) {
      acc[regulationCount] = [];
    }
    acc[regulationCount].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  const sortedGroups = Object.entries(groupedSubjects).sort(
    ([a], [b]) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      {sortedGroups.map(([regulationCount, subjects]) => (
        <div key={regulationCount} className="w-full mb-8">
          <h2 className="text-xl font-medium mb-4 px-3 py-1 text-light-color dark:text-dark-color opacity-70 w-fit dark:bg-[#ffffff0e] bg-[#0000000e] rounded-lg">
            {regulationCount}{" "}
            {regulationCount === "Unknown" ? null : "Regulations"}
          </h2>
          <div className="grid grid-cols-marks gap-4">
            {subjects.map((subject, index) => (
              <Card {...subject} key={index} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.q;

  if (!search) redirect("/");

  const data: Subject[] = await fetch(
    `https://proscrape.vercel.app/api/dspace/search?query=${search}`,
    { cache: "force-cache" }
  ).then((res) => res.json());

  return (
    <main className="relative transition duration-200 min-h-screen overflow-hidden bg-light-background-normal dark:bg-dark-background-normal p-2 pt-0">
      <Header />
      <div className="flex flex-col items-center justify-start w-full min-h-screen overflow-auto px-6 py-3 rounded-2xl dark:bg-dark-background-dark bg-light-background-dark">
        <div id="dark" className="dark-box max-w-[1400px] w-full flex flex-col gap-10 justify-start items-start h-full md:mt-14 mt-4">
          <SearchBar accent value={search.toString()} />
          <GroupedSubjects subjects={data} />
        </div>
      </div>
    </main>
  );
}
