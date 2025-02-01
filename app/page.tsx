import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="transition-all duration-200 h-screen bg-light-background-normal dark:bg-dark-background-normal flex items-center justify-center flex-col gap-4">
      <ThemeToggle absolute />
      <h1 className="font-semibold text-3xl">Sunsetting</h1>
      <p className="font-medium mx-3 text-center max-w-[400px] opacity-70">We are sunsetting DocuPro in favour of ClassPro&apos;s Library functionality that syncs with your course list. with 900+ papers with 99.9% uptime.</p>
    </main>
  );
}
