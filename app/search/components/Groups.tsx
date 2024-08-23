import Card from "@/components/Card";
import { Subject } from "@/types/SearchResult";

export default function GroupedSubjects({ subjects }: { subjects: Subject[] }) {
  if(!subjects) return null;
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
      {sortedGroups[0] ? (
        sortedGroups.map(([regulationCount, subjects]) => (
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
        ))
      ) : (
        <div className="px-6 rounded-3xl md:text-2xl text-lg border-dashed dark:text-dark-accent-color w-full h-full min-h-[60vh] flex items-center justify-center bg-light-accent-background dark:bg-dark-accent-background opacity-60 text-light-accent-color font-medium text-center border-4 dark:border-dark-accent-color border-light-accent-color py-3">
            Uhm, I can&apos;t seem to find any paper for that.
        </div>
      )}
    </>
  );
}
