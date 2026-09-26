import type { Config } from "jest";
import nextJest from "next/jest.js";

// Loads next.config.ts and .env, mocks CSS/image/next-font imports, and
// transforms with the Next compiler — so tests see what the app sees.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
