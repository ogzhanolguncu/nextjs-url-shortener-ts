import { redis } from "@/clients/redis";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getShortUrlFromCache, setShortUrlToCache } from "./shorten-url";
import { nanoid } from "nanoid";
const fakeUserId = nanoid();

describe("Shorten URL Set", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should shorten a url and return shortened path", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(Promise.resolve(nanoid()));

    const result = await setShortUrlToCache(
      "https://ogzhanolguncu.com/",
      undefined,
      fakeUserId,
    );
    expect(result).toBeTruthy();
  });

  it("should fail to shorten a url and should return null", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(Promise.reject(null));

    await expect(
      setShortUrlToCache("https://ogzhanolguncu.com/", undefined, fakeUserId),
    ).resolves.toBe(null);
  });
});

describe("Shorten URL Get", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should shorten a url and return shortened path", async () => {
    const urlToShorten = "https://ogzhanolguncu.com/";
    const keyForShortenedURL = crypto.randomUUID();
    vi.spyOn(redis, "set").mockResolvedValue(
      Promise.resolve(keyForShortenedURL),
    );
    vi.spyOn(redis, "get").mockResolvedValue(Promise.resolve(urlToShorten));

    const resultOfSet = await setShortUrlToCache(
      urlToShorten,
      undefined,
      fakeUserId,
    );
    const resultOfGet = await getShortUrlFromCache(resultOfSet!);
    expect(resultOfGet).toBe(urlToShorten);
  });

  it("should shorten a url and return all shortened path", async () => {
    const urlToShorten = "https://ogzhanolguncu.com/";
    const keyForShortenedURL = crypto.randomUUID();
    vi.spyOn(redis, "set").mockResolvedValue(
      Promise.resolve(keyForShortenedURL),
    );
    vi.spyOn(redis, "get").mockResolvedValue(Promise.resolve(urlToShorten));

    const resultOfSet = await setShortUrlToCache(
      urlToShorten,
      undefined,
      fakeUserId,
    );
    const resultOfGet = await getShortUrlFromCache(resultOfSet!);
    expect(resultOfGet).toBe(urlToShorten);
  });
});
