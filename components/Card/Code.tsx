import React from "react";

export default function CourseCode({ code }: { code: string }) {
  return (
    <span className="px-2 py-0.5 text-sm font-semibold dark:bg-dark-accent-background bg-light-accent-background dark:text-dark-accent-color text-light-accent-color rounded-md">
      {code}
    </span>
  );
}
