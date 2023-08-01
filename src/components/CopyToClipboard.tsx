"use client";

import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  textToCopy: string | null;
};
export const CopyToClipboard = ({ textToCopy: redirectionPath }: Props) => {
  const [isSavedToClipboard, setIsSavedToClipboard] = useState(false);

  const copyToClipboard = (text: string | null) => {
    if (!text) return;
    window.navigator.clipboard.writeText(text);
    setIsSavedToClipboard(true);
  };

  return (
    <div
      className="group relative flex w-max items-center  duration-300 hover:text-slate-950"
      onClick={() => copyToClipboard(redirectionPath)}
    >
      <div className="relative">
        <ClipboardCopyIcon
          height="40px"
          width="40px"
          className="cursor-pointer rounded p-1 hover:rounded-lg "
        />
        {isSavedToClipboard && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckIcon
                height="18px"
                width="18px"
                className="text-green-5 absolute -right-1 -top-1 rounded-md bg-emerald-300"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <span className="pointer-events-none absolute -bottom-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
        {isSavedToClipboard ? "Copied" : "Copy to clipboard"}
      </span>
    </div>
  );
};
