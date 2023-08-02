import { redis } from "@/clients/redis";
import { fromPromise } from "neverthrow";
import { nanoid } from "nanoid";

export type ShortLinkCacheValues = {
  createadAt: number; //Date.now()
  expiredAt: number; //Date.now()
  actualLink: string;
};

export const UUID_LENGTH = 6;
const EIGHT_HOUR_IN_SEC = 3600 * 8;
export const EIGHT_HOUR_IN_MS = EIGHT_HOUR_IN_SEC * 1000;

export const setShortUrlToCache = async (
  linkToShorten: string,
  expirationTime = EIGHT_HOUR_IN_SEC,
) => {
  const payload: ShortLinkCacheValues = {
    createadAt: Date.now(),
    expiredAt: expirationTime,
    actualLink: linkToShorten,
  };
  const pathKey = nanoid(UUID_LENGTH);
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
