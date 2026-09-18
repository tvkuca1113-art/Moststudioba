import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // The webshop is standalone React, so Next route/image rules do not apply.
  { files: ["webshop/**/*.tsx"], rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
  } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "public/webshop-assets/assets/**", // Built vendor bundle, lint original sources instead.
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
