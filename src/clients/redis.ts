import { Redis } from "@upstash/redis";

export const createRedisClient = () => {
  if (!process.env.UPSTASH_SECRET_URL)
    throw new Error("UPSTASH_SECRET_URL missing!");
  if (!process.env.UPSTASH_SECRET_TOKEN)
    throw new Error("UPSTASH_SECRET_TOKEN missing!");

  const redis = new Redis({
    url: process.env.UPSTASH_SECRET_URL,
    token: process.env.UPSTASH_SECRET_TOKEN,
  });
  return redis;
};

export const redis = createRedisClient();
