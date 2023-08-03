"use server";

import { getShortUrlFromCache } from "@/services/shortener/shorten-url";
import { redirect } from "next/navigation";
import { getExistingUserId } from "./utils";

export const getFullUrl = async (pathKey: string) => {
  const userId = getExistingUserId();
  console.log({ userId });
  if (!userId) throw new Error("Url doesn't exist");

  const fullUrlResponse = await getShortUrlFromCache(pathKey, userId);
  if (!fullUrlResponse) throw new Error("Url doesn't exist");
  redirect(fullUrlResponse.actualLink);
};
