"use client";

import { ShortLinkCacheValuesUI } from "@/actions/get-all-shortened-urls";
import { motion } from "framer-motion";
import { InfoCard } from "./InfoCard";

export const InfoCardContainer = ({
  listOfUrls,
}: {
  listOfUrls: ShortLinkCacheValuesUI[];
}) => {
  const parent = {
    visible: {
      opacity: 1,
      y: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delay: 0.3,
        default: { ease: "easeInOut" },
      },
    },
    hidden: {
      opacity: 0,
      x: 1,
      transition: {
        when: "afterChildren",
      },
    },
  };

  return (
    <>
      <h2 className="mb-1 mt-10 text-[1.75rem] font-bold md:text-[25px]">
        URLs and Expiry Times
      </h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={parent}
        className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {listOfUrls?.map((url, index) => (
          <InfoCard key={index} {...url}></InfoCard>
        ))}
      </motion.div>
    </>
  );
};
