"use server";

import { getShortUrlFromCache } from "@/services/shortener/shorten-url";
import { redirect } from "next/navigation";
import { getExistingUserId } from "./utils";

export const getFullUrl = async (pathKey: string) => {
  const userId = getExistingUserId();
  console.log(
    `User with ${userId} is trying to access one of the stored URLs. Path key is ${pathKey}`,
  );
  if (!userId) throw new Error("Url doesn't exist");

  const fullUrlResponse = await getShortUrlFromCache(
    decodeURIComponent(pathKey),
  );
  if (!fullUrlResponse) throw new Error("Url doesn't exist");
  redirect(fullUrlResponse.actualLink);
};
