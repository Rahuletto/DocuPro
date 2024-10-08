import KaizenCards from "@/components/Card/Kaizen";
import PaperCard from "@/components/Card/Paper";
import { AllPaper, Kaizen } from "@/types/PaperResults";

export default function GroupedSubjects({
  subjects,
}: {
  subjects: AllPaper[];
}) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="px-6 rounded-3xl md:text-2xl text-lg border-dashed dark:text-dark-accent-color w-full h-full min-h-[50vh] flex items-center justify-center bg-light-accent-background dark:bg-dark-accent-background opacity-60 text-light-accent-color font-medium text-center border-4 dark:border-dark-accent-color border-light-accent-color py-3">
        Uhm, I can&apos;t seem to find any resources for that.
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <div className="transition-all duration-200 flex flex-col gap-8">
        {subjects.map((subject, index) => (
          <PaperCard subject={subject} key={index} />
        ))}
      </div>
    </div>
  );
}

export function GroupKaizen({ kaizen }: { kaizen: Kaizen[] }) {
  return (
    <div className="mt-2 w-full">
      <h2 className="text-xl font-dm font-medium mb-4 px-3 py-1 text-dark-kaizen-color opacity-70 dark:opacity-90 transition-all duration-200 w-fit bg-dark-kaizen-background rounded-lg">
        From KaizenKlass
      </h2>
      <div className="w-full mb-8">
        <div className="transition-all duration-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 mt-4">
          {kaizen.map((k, index) => (
            <KaizenCards kaizen={k} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
