import * as shortenUrlService from "@/services/shortener/shorten-url";
import { nanoid } from "nanoid";
import { describe, expect, it, vi } from "vitest";
import { getFullUrl } from "./get-shorten-url";
import { shortenUrl } from "./set-shorten-url";

vi.mock("shortenUrlPayloadSchema", async () => {
  const shortenUrlPayloadSchema = await vi.importActual<
    typeof import("@/lib/schema/shorten-url-schema")
  >("@/lib/schema/shorten-url-schema");
  return {
    shortenUrlPayloadSchema,
  };
});

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
      Promise.resolve({
        actualLink: urlToShorten,
      } as shortenUrlService.ShortLinkCacheValues),
    );

    await getFullUrl(keyForShortenedURL);
    expect(shortenUrlService.getShortUrlFromCache).toHaveBeenCalledOnce();
  });
});
