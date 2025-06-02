import type {
  GetProductQuery,
  GetProductQueryVariables,
} from "@/graphql/generated/graphql";

import { GetProductDocument } from "@/graphql/generated/graphql";
import { formatProducts } from "@/lib/utils";

import { useQuery } from "@apollo/client";

export function useProduct(productHandle: string) {
  const { loading, error, data } = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(GetProductDocument, {
    variables: { handle: productHandle },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(
      "recent products hook error:",
      JSON.stringify(error, null, 2),
    );
  }

  const product = formatProducts(data);

  return {
    product,
    loading: loading && !data,
    error,
  };
}
