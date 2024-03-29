import { redis } from "@/clients/redis";
import { fromPromise } from "neverthrow";
import { nanoid } from "nanoid";

export type ShortLinkCacheValues = {
  createadAt: number; //Date.now()
  expiredAt: number; //Date.now()
  actualLink: string;
  k: string;
};

export const UUID_LENGTH = 5;
const EIGHT_HOUR_IN_SEC = 3600 * 8;
export const EIGHT_HOUR_IN_MS = EIGHT_HOUR_IN_SEC * 1000;

export const setShortUrlToCache = async (
  linkToShorten: string,
  expirationTime = EIGHT_HOUR_IN_SEC,
  userId: string,
) => {
  const pathKey = `${nanoid(UUID_LENGTH)}:${userId}`;

  const payload: ShortLinkCacheValues = {
    createadAt: Date.now(),
    expiredAt: Date.now() + EIGHT_HOUR_IN_MS,
    actualLink: linkToShorten,
    k: pathKey,
  };
  const res = fromPromise(
    redis.set<ShortLinkCacheValues>(pathKey, payload, {
      ex: expirationTime,
    }),
    (_error) => {
      console.error(`Something went wrong when setting ${linkToShorten}`);
    },
  );

  return res.match(
    (_) => pathKey,
    (_) => null,
  );
};

export const getShortUrlFromCache = async (pathKey: string) => {
  const res = fromPromise(
    redis.get<ShortLinkCacheValues>(pathKey),
    (_error) => {
      console.error(`Something went wrong when getting k:${pathKey}`);
    },
  );

  return res.match(
    (res) => res,
    (_) => null,
  );
};

export const getAllShortUrlsFromCacheForUser = async (userId: string) => {
  const keys = await redis.keys(`*${userId}*`);
  if (Boolean(keys.length)) {
    const listOfUrls = await redis.mget<ShortLinkCacheValues[]>(...keys);
    return listOfUrls;
  }
};
