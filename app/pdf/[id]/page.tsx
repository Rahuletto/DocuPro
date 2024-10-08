import React from "react";

import dynamic from "next/dynamic";
import { RiLoader3Fill } from "react-icons/ri";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <main className="flex h-screen dark:bg-dark-background-normal bg-light-background-normal w-screen animate-fadeIn flex-col items-center justify-center p-12 text-light-accent-color dark:text-dark-accent-color">
      <RiLoader3Fill
        title="loading"
        className="animate-spin text-5xl font-medium"
      />
      <h1 className="mt-4 text-xl font-medium">Loading PDF...</h1>
    </main>
  ),
});

export default function PDF({ params }: { params: { id: string } }) {
  return <PdfViewer url={`/pdf/${params.id}/file`} title={params.id} />;
}
