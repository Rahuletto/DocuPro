import { fetchTimeout } from "@/misc/fetch";
import { NextResponse } from "next/server";

export const runtime = "edge";

const pdfCache = new Map<string, ArrayBuffer>();
const MAX_CACHE_SIZE = 20;

function cacheResponse(id: string, pdfData: ArrayBuffer) {
  if (pdfCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = pdfCache.keys().next().value;
    if (oldestKey) pdfCache.delete(oldestKey);
  }
  pdfCache.set(id, pdfData);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (pdfCache.has(id)) {
    const cachedPdf = pdfCache.get(id)!;
    return new NextResponse(cachedPdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${id}.pdf"`,
      },
    });
  }

  const getURL = await fetchTimeout(
    `https://proscrape.vercel.app/api/dspace/getPDF?q=${params.id}`,
    {
      cache: "force-cache",
      method: "POST",
      body: JSON.stringify({
        url: `http://dspace.srmist.edu.in/dspace/handle/123456789/${params.id}`,
      }),
    }, 5000
  );

  const pdf = await getURL.json();
  const pdfUrl = pdf.redirect;

  try {
    const response = await fetchTimeout(pdfUrl, {
      headers: {
        Accept: "application/pdf",
      },
    }, 5000);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch PDF" },
        { status: response.status }
      );
    }

    const pdfData = await response.arrayBuffer();

    cacheResponse(id, pdfData);

    return new NextResponse(pdfData, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${id}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the PDF" },
      { status: 500 }
    );
  }
}
