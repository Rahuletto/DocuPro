import History from "@/components/History";
import Search from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import { IoLibrarySharp } from "react-icons/io5";

export default function Home() {
  return (
    <main className="transition-all duration-200 h-screen bg-light-background-normal dark:bg-dark-background-normal flex items-center justify-center flex-col gap-20">
      <ThemeToggle absolute />
      <div className="flex flex-col items-center justify-center gap-6">
      <div className="transition-all duration-200 flex flex-col gap-1 items-center justify-center">
        <div
          id="title"
          className="title transition duration-200 flex flex-col gap-1 dark:text-dark-color text-light-color"
        >
          <div className="flex gap-3 text-4xl items-end justify-center">
            <IoLibrarySharp className="text-light-accent-color dark:text-dark-accent-color text-5xl" />
            <h1 className="font-semibold">DocuPro</h1>
          </div>
        </div>
        <p className="dark:text-dark-color text-light-color transition duration-200 opacity-60 text-lg font-medium">
          Past exam papers at your fingertips.
        </p>
      </div>
      <Search />
      </div>
      <History />

      <div className="transition duration-200 fixed bottom-4 mx-4 h-auto w-[98vw] animate-fadeIn flex-col gap-6 rounded-3xl bg-light-warn-background px-6 py-4 md:px-12 md:py-6 dark:bg-dark-warn-background">
        <h3 className="text-light-warn-color dark:text-dark-warn-color">
          We scrape the information from SRM DSpace, This website acts as a
          wrapper and does not store any information whatsoever!
        </h3>
      </div>
    </main>
  );
}
