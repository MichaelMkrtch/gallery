import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

if (!storeDomain || !storefrontAccessToken) {
  throw new Error(
    "Something went wrong while connecting to our gallery! Please try again later.",
  );
}

const httpLink = new HttpLink({
  uri: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
  headers: { "X-Shopify-Storefront-Access-Token": storefrontAccessToken },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

export default client;
