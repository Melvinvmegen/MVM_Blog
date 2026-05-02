// @ts-check
import prettier from "@vue/eslint-config-prettier/skip-formatting";
import vueParser from "vue-eslint-parser";
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  prettier,
  {
    ignores: ["**/*.ts", "**/*.json", "**/*.css", "**/*.md", "**/*.png", "**/*.svg", "**/api-*.js"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: "Types|Models",
        },
      ],
      "no-undef": "off",
      "vue/no-unused-components": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-v-text-v-html-on-component": "off",
      "vue/prop-name-casing": "off",
      "vue/require-default-prop": "off",
      "vue/valid-v-slot": [
        "error",
        {
          allowModifiers: true,
        },
      ],
    },
  },
)
