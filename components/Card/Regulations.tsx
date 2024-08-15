import React from "react";

export default function Regulations({ reg }: { reg: string }) {
  return (
    reg === "Unknown" ? null : <span className="px-2 py-0.5 text-light-color dark:text-dark-color opacity-70 text-sm font-medium dark:bg-[#ffffff0e] bg-[#0000000e] rounded-md">
      {reg} Regulations
    </span>
  );
}
