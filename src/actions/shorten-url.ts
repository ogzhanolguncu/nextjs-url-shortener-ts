"use server";

import { shortenUrlPayloadSchema } from "@/lib/schema/shorten-url-schema";

export const shortenUrl = async (formData: FormData) => {
  const validatedPayload = shortenUrlPayloadSchema.safeParse({
    longUrl: formData.get("long-url"),
  });
  if (validatedPayload.success) {
    return formData.get("long-url");
  }
  return validatedPayload.error.format().longUrl?._errors[0];
};
