import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from "@/graphql/generated/graphql";
import type { Product } from "@/types/products";

import { GetAllProductsDocument } from "@/graphql/generated/graphql";
import { formatProducts } from "@/lib/utils";

import { useQuery } from "@apollo/client";

type UseAllArtworksResult = {
  products: Product[] | undefined;
  loading: boolean;
  error?: Error;
};

export function useAllArtwork(): UseAllArtworksResult {
  const { loading, error, data } = useQuery<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >(GetAllProductsDocument, {
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
