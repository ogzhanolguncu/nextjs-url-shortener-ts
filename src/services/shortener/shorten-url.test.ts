import { redis } from "@/clients/redis";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setShortUrlToCache } from "./shorten-url";
import crypto from "crypto";

vi.mock("@/clients/redis", () => ({
  createRedisClient: {
    set: async <T>(
      key: string,
      value: T,
      options: { ex: number }
    ): Promise<string | null> => {
      return "OK";
    },
  },
}));

describe("Shorten URL", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should shorten a url and return shortened path", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(
      Promise.resolve(crypto.randomUUID())
    );

    const result = await setShortUrlToCache(
      "https://ogzhanolguncu.com/"
    );
    expect(result).toBeTruthy();
  });

  it("should fail to shorten a url and should return null", async () => {
    vi.spyOn(redis, "set").mockResolvedValue(Promise.reject(null));

    await expect(
      setShortUrlToCache("https://ogzhanolguncu.com/")
    ).resolves.toBe(null);
  });
});
