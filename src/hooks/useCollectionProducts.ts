import type {
  GetCollectionProductsQuery,
  GetCollectionProductsQueryVariables,
} from "@/graphql/generated/graphql";

import { GetCollectionProductsDocument } from "@/graphql/generated/graphql";
import { formatProducts } from "@/lib/utils";

import { useQuery } from "@apollo/client";

export function useCollectionProducts(collectionHandle: string) {
  const { loading, error, data } = useQuery<
    GetCollectionProductsQuery,
    GetCollectionProductsQueryVariables
  >(GetCollectionProductsDocument, {
    variables: { collectionHandle },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(
      "recent products hook error:",
      JSON.stringify(error, null, 2),
    );
  }

  const products = formatProducts(data?.collectionByHandle);

  return {
    products,
    loading: loading && !data,
    error,
  };
}
