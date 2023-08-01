import { redis } from "@/clients/redis";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getShortUrlFromCache, setShortUrlToCache } from "./shorten-url";
import crypto from "crypto";

vi.mock("@/clients/redis", () => ({
  redis: {
    set: async <T>(
      key: string,
      value: T,
      options: { ex: number },
    ): Promise<string | null> => {
      return "OK";
    },
    get: vi.fn(),
  },
}));

describe("Shorten URL Set", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should shorten a url and return shortened path", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(
      Promise.resolve(crypto.randomUUID()),
    );

    const result = await setShortUrlToCache("https://ogzhanolguncu.com/");
    expect(result).toBeTruthy();
  });

  it("should fail to shorten a url and should return null", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(Promise.reject(null));

    await expect(
      setShortUrlToCache("https://ogzhanolguncu.com/"),
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

    const resultOfSet = await setShortUrlToCache(urlToShorten);
    const resultOfGet = await getShortUrlFromCache(resultOfSet!);
    expect(resultOfGet).toBe(urlToShorten);
  });
});
