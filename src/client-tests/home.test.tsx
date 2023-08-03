import Home from "@/app/page";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react-dom", async () => ({
  ...vi.importActual("react-dom"), // use actual for all non-hook parts
  experimental_useFormStatus: () => vi.fn(),
}));

describe("Home page tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render home page without issues", async () => {
    render(await (async () => await Home())());

    expect(screen.findByText("Time to Shorten!")).toBeDefined();
  });
});
