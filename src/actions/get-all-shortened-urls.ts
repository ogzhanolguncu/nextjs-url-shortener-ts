"use server";

import {
  ShortLinkCacheValues,
  getAllShortUrlsFromCacheForUser,
} from "@/services/shortener/shorten-url";
import { getExistingUserId } from "./utils";

export type ShortLinkCacheValuesUI = Omit<
  ShortLinkCacheValues,
  "k" | "actualLink"
> & {
  formattedUrl: string;
};

export const getAllShortenedUrls = async (): Promise<
  ShortLinkCacheValuesUI[] | null
> => {
  const userId = getExistingUserId();
  console.log(`User with ${userId} is trying to access one of the stored URLs`);
  if (!userId) throw new Error("Url doesn't exist");

  const listOfUrls = await getAllShortUrlsFromCacheForUser(userId);
  if (!listOfUrls) return null;

  const currentVercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/`
    : "http://localhost:3000/";

  return listOfUrls
    .map((url) => ({
      ...url,
      formattedUrl: `${currentVercelUrl}${url.k}`,
    }))
    .map(({ actualLink, k, ...rest }) => rest)
    .slice(-6);
};
