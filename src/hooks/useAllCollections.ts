import type {
  GetAllCollectionsQuery,
  GetAllCollectionsQueryVariables,
} from "@/graphql/generated/graphql";

import { GetAllCollectionsDocument } from "@/graphql/generated/graphql";
import { CollectionNode } from "@/types/collection";

import { useQuery } from "@apollo/client";

export function useAllCollections() {
  const { loading, error, data } = useQuery<
    GetAllCollectionsQuery,
    GetAllCollectionsQueryVariables
  >(GetAllCollectionsDocument, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(
      "all collections hook error:",
      JSON.stringify(error, null, 2),
    );
  }

  const collections = data?.collections.edges.map((edge) => {
    return {
      ...edge.node,
      type: edge.node.type?.value,
    };
  });

  return {
    collections: collections as CollectionNode[],
    loading: loading && !data,
    error,
  };
}
