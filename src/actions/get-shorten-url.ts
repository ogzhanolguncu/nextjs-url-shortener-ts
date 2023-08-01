"use server";

import { getShortUrlFromCache } from "@/services/shortener/shorten-url";
import { redirect } from "next/navigation";

export const getFullUrl = async (pathKey: string) => {
  const fullUrlResponse = await getShortUrlFromCache(pathKey);
  if (fullUrlResponse) redirect(fullUrlResponse.actualLink);
  throw new Error("Url doesn't exist");
};
