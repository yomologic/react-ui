import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
      "import": importPlugin,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      
      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_"
        }
      ],
      
      // Import sorting
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "never",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      
      // Console statements
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    }
  },
  eslintConfigPrettier,
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
