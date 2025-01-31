import History from "@/components/History";
import HomeSearch from "@/components/HomeSearch";

import ThemeToggle from "@/components/ThemeToggle";
import { IoLibrarySharp } from "react-icons/io5";

export default function Home() {
  return (
    <main className="transition-all duration-200 h-screen bg-light-background-normal dark:bg-dark-background-normal flex items-center justify-center flex-col gap-12">
      <ThemeToggle absolute />
      <h1 className="font-semibold">Sunsetting</h1>
      <p className="font-medium mx-3">We are sunsetting DocuPro in favour of ClassPro&apos;s Library functionality that syncs with your course list. with 900+ papers with 99.9% uptime.</p>
    </main>
  );
}
