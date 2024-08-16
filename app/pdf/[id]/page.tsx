
import React from "react";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
});

export default function PDF({ params }: { params: { id: string } }) {
  return <PdfViewer url={`/pdf/${params.id}/file`} title={params.id} />;
}
