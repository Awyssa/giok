import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import node from "eslint-plugin-node";

export default defineConfig([
	tseslint.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		plugins: { js, node },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]);
