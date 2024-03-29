"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "./CopyToClipboard";
import { AnimatePresence, motion } from "framer-motion";

export const Feedback = () => {
  const [redirectionPath, setRedirectionPath] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const shortUrl = searchParams.get("short-url");

    setRedirectionPath(shortUrl);
  }, [searchParams]);

  return Boolean(redirectionPath) ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="md:text-md mt-5 flex w-full items-center justify-between rounded-lg bg-[#cda6f3] p-3 text-slate-800 md:mt-9">
          <div className="flex w-60  flex-col ">
            <h2 className="mb-1 font-bold">Shortened URL:</h2>
            <p className="overflow-hidden text-ellipsis font-medium hover:text-clip">
              {redirectionPath}
            </p>
          </div>
          <CopyToClipboard textToCopy={redirectionPath} />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};
