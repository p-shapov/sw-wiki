import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/components/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "^@sw-wiki/components/(.*)$": "<rootDir>/src/components/$1",
  },
};

const getJestConfig = async () => {
  const jestConfig = await createJestConfig(config)();
  jestConfig.transformIgnorePatterns = [
    "/node_modules/(?!@uidotdev/usehooks)",
    "^.+\\.module\\.(css|sass|scss)$",
  ];
  return jestConfig;
};

export default getJestConfig;
