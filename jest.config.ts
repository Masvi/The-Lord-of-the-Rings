import type { Config } from "@jest/types";
import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config.InitialOptions = {
  verbose: true,
  testRegex: "(test|spec).(ts|tsx)?$",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|scss|less|jpg|png|svg)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["<rootDir>/**/*.tsx", "<rootDir>/**/*.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/assets/",
    "/coverage",
    "/src/models/",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
};

export default config;