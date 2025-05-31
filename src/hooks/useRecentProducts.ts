import type {
  GetRecentProductsQuery,
  GetRecentProductsQueryVariables,
} from "@/graphql/generated/graphql";
import type { Product } from "@/types/products";

import { GetRecentProductsDocument } from "@/graphql/generated/graphql";
import { formatProducts } from "@/lib/utils";

import { useQuery } from "@apollo/client";

type UseRecentProductsResult = {
  products: Product[] | undefined;
  loading: boolean;
  error?: Error;
};

export function useRecentProducts(): UseRecentProductsResult {
  const { loading, error, data } = useQuery<
    GetRecentProductsQuery,
    GetRecentProductsQueryVariables
  >(GetRecentProductsDocument, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(
      "recent products hook error:",
      JSON.stringify(error, null, 2),
    );
  }

  const products = formatProducts(data);

  return {
    products,
    loading: loading && !data,
    error,
  };
}
