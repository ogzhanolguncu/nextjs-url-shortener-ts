"use server";

import { shortenUrlPayloadSchema } from "@/lib/schema/shorten-url-schema";
import { setShortUrlToCache } from "@/services/shortener/shorten-url";
import { redirect } from "next/navigation";

export const shortenUrl = async (formData: FormData) => {
  const validatedPayload = shortenUrlPayloadSchema.safeParse({
    longUrl: formData.get("long-url"),
  });
  if (validatedPayload.success) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/`
      : "http://localhost:3000/";

    const res = await setShortUrlToCache(validatedPayload.data.longUrl);
    const finalUrl = `${url}${res}`;
    redirect(`?short-url=${finalUrl}`);
  }
  return validatedPayload.error?.format().longUrl?._errors[0];
};
