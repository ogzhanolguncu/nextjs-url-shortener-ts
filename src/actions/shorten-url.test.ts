import { afterEach, describe, expect, it, vi } from "vitest";
import { shortenUrl } from "./shorten-url";

vi.mock("shortenUrlPayloadSchema", async () => {
  const shortenUrlPayloadSchema = await vi.importActual<
    typeof import("@/lib/schema/shorten-url-schema")
  >("@/lib/schema/shorten-url-schema");
  return {
    shortenUrlPayloadSchema,
  };
});

describe("Shorten URL Server Actions", () => {
  it("should return long url", async () => {
    const formData = new FormData();
    formData.set("long-url", "https://ogzhanolguncu.com/");
    const result = await shortenUrl(formData);
    expect(result).toBe("https://ogzhanolguncu.com/");
  });

  it("should return error if validation fails", async () => {
    const formData = new FormData();
    formData.set("long-url", "");
    const result = await shortenUrl(formData);
    expect(result).toBe("String must contain at least 1 character(s)");
  });
});
