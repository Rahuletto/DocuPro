"use client";
import { useTransitionRouter } from "next-view-transitions";
import React, { useEffect } from "react";
import { RiLoader3Fill } from "react-icons/ri";

export default function PDF({ params }: { params: { id: string } }) {
  const router = useTransitionRouter();

  useEffect(() => {
    if (!params.id) return router.push("/");
    else
      fetch(`https://proscrape.vercel.app/api/dspace/getPDF?q=${params.id}`, {
        cache: "force-cache",
        method: "POST",
        body: JSON.stringify({
          url: `http://dspace.srmist.edu.in/dspace/handle/123456789/${params.id}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.redirect && router.push(data.redirect));
  }, [params.id, router]);

  return (
    <main className="flex h-screen w-screen animate-fadeIn flex-col items-center justify-center p-12 text-light-accent dark:text-dark-accent">
      <RiLoader3Fill
        title="loading"
        className="animate-spin text-5xl font-medium text-light-accent dark:text-dark-accent"
      />
      <h1 className="mt-4 text-xl font-medium">Loading PDF...</h1>
    </main>
  );
}
