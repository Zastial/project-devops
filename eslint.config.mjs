import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,      // ajoute les globals Node.js ici
        ...globals.browser,   // ajoute aussi globals browser si nécessaire
      }
    },
  },
  {
    ignores: ["**/*.test.js", "**/*.spec.js", "**/tests/**"],
  },
]);
