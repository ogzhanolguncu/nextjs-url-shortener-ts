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
  };
});
