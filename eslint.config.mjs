import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_"
        }
      ]
    }
  },
  globalIgnores([
    "dist/**",
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "*.config.*",
  ]),
]);

export default eslintConfig;
