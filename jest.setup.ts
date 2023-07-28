import "@testing-library/jest-dom";
import { createElement } from "react";
import type { ImageProps } from "next/image";

function MockImage({ priority, ...props }: ImageProps) {
  return createElement("img", {
    ...props,
    priority: priority ? "true" : undefined,
  });
}

jest.mock("next/image", () => MockImage); // https://github.com/vercel/next.js/issues/53272
