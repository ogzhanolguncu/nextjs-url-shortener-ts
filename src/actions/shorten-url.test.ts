import { describe, expect, it, vi } from "vitest";
import { shortenUrl } from "./shorten-url";
import { nanoid } from "nanoid";

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

vi.mock("nanoid", async () => {
  const mockedNanoid = await vi.importActual<typeof import("nanoid")>("nanoid");
  return {
    ...mockedNanoid,
    nanoid: vi.fn().mockReturnValue("YGRxmg"),
  };
});

describe("Shorten URL Server Actions", () => {
  it("should return long url", async () => {
    const formData = new FormData();
    formData.set("long-url", "https://ogzhanolguncu.com/");

    const result = await shortenUrl(formData);
    expect(result).toBe(`http://localhost:3000/${nanoid()}`);
  });

  it("should return error if validation fails", async () => {
    const formData = new FormData();
    formData.set("long-url", "");
    const result = await shortenUrl(formData);
    expect(result).toBe("String must contain at least 1 character(s)");
  });
});
