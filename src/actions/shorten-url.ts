"use server";

import { shortenUrlPayloadSchema } from "@/lib/schema/shorten-url-schema";
import {
  EIGHT_HOUR_IN_MS,
  setShortUrlToCache,
} from "@/services/shortener/shorten-url";
import { trackUserWithCookie } from "./utils";
import { revalidatePath } from "next/cache";

export const shortenUrl = async (formData: FormData) => {
  const validatedPayload = shortenUrlPayloadSchema.safeParse({
    longUrl: formData.get("long-url"),
  });

  if (validatedPayload.success) {
    await setShortUrlToCache(
      validatedPayload.data.longUrl,
      EIGHT_HOUR_IN_MS * 3,
      trackUserWithCookie(),
    );
    revalidatePath("/");
  } else return validatedPayload.error?.format().longUrl?._errors[0];
};
