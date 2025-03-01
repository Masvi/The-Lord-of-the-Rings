import type { Config } from "@jest/types";
import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config.InitialOptions = {
  verbose: true,
  testRegex: "(test|spec).tsx?$",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
    ".+\\.(css|scss|less|jpg|png|svg)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/assets/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
};

export default config;