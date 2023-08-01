"use client";

import React from "react";

export const Error = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-100 mt-60 rounded-lg bg-[#cda6f3] p-8 text-slate-800 md:mt-9 md:text-lg">
        <h2 className="text-center text-2xl font-bold">
          Oops. URL that you are looking for seems to be missing!
        </h2>
      </div>
    </div>
  );
};

export default Error;
