// app/api/pdf/[id]/route.ts
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const getURL = await fetch(
    `https://proscrape.vercel.app/api/dspace/getPDF?q=${params.id}`,
    {
      cache: "force-cache",
      method: "POST",
      body: JSON.stringify({
        url: `http://dspace.srmist.edu.in/dspace/handle/123456789/${params.id}`,
      }),
    }
  );

  const pdf = await getURL.json();
  const pdfUrl = pdf.redirect;

  try {
    const response = await fetch(pdfUrl, {
      headers: {
        Accept: "application/pdf",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch PDF" },
        { status: response.status }
      );
    }

    const pdfData = await response.arrayBuffer();

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
