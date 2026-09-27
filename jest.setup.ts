import "@testing-library/jest-dom";
import type { ReactNode } from "react";

// `<ViewTransition>` only exists in the React that Next vendors for the App
// Router. Jest resolves `react` to the copy in node_modules, which is stable
// 19.x and doesn't export it — so any component using it renders `undefined`.
//
// @types/react already declares it, so this is a runtime-only gap. The shim
// renders children straight through, which is what the real component does
// outside a navigation: it adds no DOM node, only a view-transition-name.
jest.mock("react", () => {
  const react: Record<string, unknown> = jest.requireActual("react");
  if ("ViewTransition" in react) return react;
  return {
    ...react,
    ViewTransition: ({ children }: { children: ReactNode }) => children,
  };
});
