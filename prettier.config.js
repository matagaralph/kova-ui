/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 100,
  quoteProps: "consistent",
  semi: false,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
  tailwindFunctions: ["clsx"],
  tabWidth: 2,
}
