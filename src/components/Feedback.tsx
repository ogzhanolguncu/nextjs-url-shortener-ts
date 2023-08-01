"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

export const Feedback = () => {
  const [redirectionPath, setRedirectionPath] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const shortUrl = searchParams.get("short-url");

    setRedirectionPath(shortUrl);
  }, [searchParams]);

  return Boolean(redirectionPath) ? (
    <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-[#cda6f3] p-3 text-slate-800 md:mt-9 md:text-lg">
      <div className="flex flex-col">
        <h2 className="mb-1 font-bold">Shortened URL:</h2>
        <p className="font-medium">{redirectionPath}</p>
      </div>
      <ClipboardCopyIcon
        height="35px"
        width="35px"
        className="cursor-pointer rounded p-1 hover:rounded-lg hover:text-emerald-200"
      />
    </div>
  ) : null;
};
