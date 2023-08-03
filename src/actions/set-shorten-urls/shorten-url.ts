"use server";

import { shortenUrlPayloadSchema } from "@/lib/schema/shorten-url-schema";
import {
  EIGHT_HOUR_IN_MS,
  setShortUrlToCache,
} from "@/services/shortener/shorten-url";
import { redirect } from "next/navigation";
import { trackUserWithCookie } from "./utils";

export const shortenUrl = async (formData: FormData) => {
  const validatedPayload = shortenUrlPayloadSchema.safeParse({
    longUrl: formData.get("long-url"),
  });

  if (validatedPayload.success) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/`
      : "http://localhost:3000/";

    const res = await setShortUrlToCache(
      validatedPayload.data.longUrl,
      EIGHT_HOUR_IN_MS * 3,
      trackUserWithCookie(),
    );
    const finalUrl = `${url}${res}`;
    redirect(`?short-url=${finalUrl}`);
  }
  return validatedPayload.error?.format().longUrl?._errors[0];
};
