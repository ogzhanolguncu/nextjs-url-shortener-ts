"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Feedback = () => {
  const [redirectionPath, setRedirectionPath] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const shortUrl = searchParams.get("short-url");

    setRedirectionPath(shortUrl);
  }, [searchParams]);

  return Boolean(redirectionPath) ? (
    <div className="mt-5 w-96 rounded-lg bg-[#cda6f3] p-2 text-slate-800 md:mt-9 md:text-lg">
      <h2 className="mb-1 font-bold">Shortened URL:</h2>
      <p className="font-normal">{redirectionPath}</p>
    </div>
  ) : null;
};
