import { vi } from "vitest";

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

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
    redirect: vi.fn(),
  };
});

vi.mock("shortenUrlPayloadSchema", async () => {
  const shortenUrlPayloadSchema = await vi.importActual<
    typeof import("@/lib/schema/shorten-url-schema")
  >("@/lib/schema/shorten-url-schema");
  return {
    shortenUrlPayloadSchema,
  };
});

vi.mock("next/headers", async () => {
  const mockedHeaders = await vi.importActual<typeof import("next/headers")>(
    "next/headers",
  );
  return {
    ...mockedHeaders,
    cookies: vi.fn(() => ({
      get: vi.fn(),
      set: vi.fn(),
    })),
  };
});
vi.mock(
  "@/actions/utils.ts",
  async () => await vi.importActual("@/__mocks__/actions/utils.ts"),
);
