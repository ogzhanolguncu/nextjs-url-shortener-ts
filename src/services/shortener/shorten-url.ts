import { redis } from "@/clients/redis";
import crypto from "crypto";
import { fromPromise } from "neverthrow";

type ShortLinkCacheValues = {
  createadAt: number; //Date.now()
  expiredAt: number; //Date.now()
  actualLink: string;
};

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
  const payloadKey = crypto.randomUUID();
  const res = fromPromise(
    redis.set<ShortLinkCacheValues>(payloadKey, payload, {
      ex: expirationTime,
    }),
    (_error) => {
      console.error(`Something went wrong when setting ${linkToShorten}`);
    },
  );

  return res.match(
    (_) => payloadKey,
    (_) => null,
  );
};

export const getShortUrlFromCache = async (payloadKey: string) => {
  const res = fromPromise(
    redis.get<ShortLinkCacheValues>(payloadKey),
    (_error) => {
      console.error(`Something went wrong when getting k:${payloadKey}`);
    },
  );

  return res.match(
    (res) => res,
    (_) => null,
  );
};
