import { describe, expect, it, vi, afterEach } from "vitest";
import { shortenUrl } from "./set-shorten-url";
import { nanoid } from "nanoid";
import * as shortenUrlService from "@/services/shortener/shorten-url";
import { getFullUrl } from "./get-shorten-url";
import { redis } from "@/clients/redis";

vi.mock("shortenUrlPayloadSchema", async () => {
  const shortenUrlPayloadSchema = await vi.importActual<
    typeof import("@/lib/schema/shorten-url-schema")
  >("@/lib/schema/shorten-url-schema");
  return {
    shortenUrlPayloadSchema,
  };
});

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

vi.mock("next/navigation", async () => {
  const mockedNavigation = await vi.importActual<
    typeof import("next/navigation")
  >("next/navigation");
  return {
    ...mockedNavigation,
    redirect: vi.fn(),
  };
});

describe("Shorten URL Server Actions", () => {
  it("should call setShortUrlToCache to cache", async () => {
    vi.spyOn(shortenUrlService, "setShortUrlToCache").mockImplementation(() =>
      Promise.resolve(nanoid()),
    );

    const formData = new FormData();
    formData.set("long-url", "https://ogzhanolguncu.com/");

    await shortenUrl(formData);
    expect(shortenUrlService.setShortUrlToCache).toHaveBeenCalledOnce();
  });

  it("should return error if validation fails", async () => {
    const formData = new FormData();
    formData.set("long-url", "");
    const result = await shortenUrl(formData);
    expect(result).toBe("String must contain at least 1 character(s)");
  });

  it("should call getShortUrlFromCache and get full url", async () => {
    const urlToShorten = "https://ogzhanolguncu.com/";
    const keyForShortenedURL = nanoid(6);
    vi.spyOn(shortenUrlService, "getShortUrlFromCache").mockImplementation(() =>
      Promise.resolve(null),
    );
    vi.spyOn(redis, "set").mockResolvedValue(
      Promise.resolve(keyForShortenedURL),
    );
    vi.spyOn(redis, "get").mockResolvedValue(Promise.resolve(urlToShorten));

    await getFullUrl(nanoid(shortenUrlService.UUID_LENGTH));
    expect(shortenUrlService.getShortUrlFromCache).toHaveBeenCalledOnce();
  });
});
