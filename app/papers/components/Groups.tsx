import PaperCard from "@/components/Card/Paper";
import { AllPaper } from "@/types/PaperResults";

export default function GroupedSubjects({ subjects }: { subjects: AllPaper[] }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="px-6 rounded-3xl md:text-2xl text-lg border-dashed dark:text-dark-accent-color w-full h-full min-h-[60vh] flex items-center justify-center bg-light-accent-background dark:bg-dark-accent-background opacity-60 text-light-accent-color font-medium text-center border-4 dark:border-dark-accent-color border-light-accent-color py-3">
        Uhm, I can&apos;t seem to find any paper for that.
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col gap-8">
        {subjects.map((subject, index) => (
          <PaperCard subject={subject} key={index} />
        ))}
      </div>
    </div>
  );
}
