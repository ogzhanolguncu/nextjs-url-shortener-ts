import { z } from "zod";

export const shortenUrlPayloadSchema = z.object({
  longUrl: z.string().nonempty(),
});
