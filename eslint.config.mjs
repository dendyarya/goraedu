import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "react/no-danger": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "MemberExpression[property.name='innerHTML']",
          message: "Do not write innerHTML. Render with JSX so text is escaped.",
        },
      ],
    },
  },
  { ignores: [".next/**", "out/**", "node_modules/**", ".wrangler/**", "next-env.d.ts"] },
];

export default config;
