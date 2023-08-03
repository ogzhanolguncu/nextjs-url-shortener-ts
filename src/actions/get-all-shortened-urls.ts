"use server";

import { getAllShortUrlsFromCacheForUser } from "@/services/shortener/shorten-url";
import { getExistingUserId } from "./utils";

export const getAllShortenedUrls = async () => {
  const userId = getExistingUserId();
  console.log(`User with ${userId} is trying to access one of the stored URLs`);
  if (!userId) throw new Error("Url doesn't exist");

  const listOfUrls = await getAllShortUrlsFromCacheForUser(userId);

  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/`
    : "http://localhost:3000/";
  if (!listOfUrls) throw new Error("Urls doesn't exist");
  return listOfUrls;
};
