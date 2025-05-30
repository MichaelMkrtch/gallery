import "./envConfig.ts";

import type { CodegenConfig } from "@graphql-codegen/cli";

const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN as string;
const storefrontAccessToken = process.env
  .NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN as string;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION as string;

if (!storeDomain || !storefrontAccessToken) {
  console.log(storeDomain);
  console.log(storefrontAccessToken);
  throw new Error(
    "Something went wrong while connecting to our gallery! Please try again later.",
  );
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`https://${storeDomain}/api/${apiVersion}/graphql.json`]: {
        headers: {
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
      },
    },
  ],
  documents: "src/graphql/queries/*.gql",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      plugins: [],
      config: {},
    },
  },
  ignoreNoDocuments: true,
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
