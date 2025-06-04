import type { ApolloError } from "@apollo/client";

import { useEffect, useState } from "react";

import {
  PredictiveSearchDocument,
  PredictiveSearchQuery,
} from "@/graphql/generated/graphql";

import { useLazyQuery } from "@apollo/client";

type PredictiveSearchOptions = {
  debounceDelay?: number;
  first?: number;
};

const defaultHookOptions: Required<PredictiveSearchOptions> = {
  debounceDelay: 300,
  first: 5,
};

export function useSearch(
  searchTerm: string,
  options?: PredictiveSearchOptions,
) {
  const mergedOptions = { ...defaultHookOptions, ...options };
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const [executeSearch, { loading, error, data }] =
    useLazyQuery<PredictiveSearchQuery>(PredictiveSearchDocument, {
      fetchPolicy: "cache-and-network",
    });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, mergedOptions.debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, mergedOptions.debounceDelay]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      executeSearch({
        variables: {
          searchText: debouncedSearchTerm,
          first: mergedOptions.first,
          types: ["PRODUCT", "ARTICLE"],
        },
      });
    }
  }, [debouncedSearchTerm, executeSearch, mergedOptions.first]);

  const formattedResults = data?.search?.edges.map((edge) => {
    if (!edge || !edge.node) return undefined;

    if (edge.node.__typename === "Product") {
      const artist = edge.node.artist?.value;
      const images = edge.node.images.edges.map((edge) => edge?.node);

      return {
        ...edge.node,
        artist,
        images,
      };
    } else if (edge.node.__typename === "Article") {
      const image = edge.node.image;

      return {
        ...edge.node,
        image,
      };
    }
  });

  return {
    results: formattedResults || [],
    loading,
    error: error as ApolloError | undefined,
    currentSearchTerm: debouncedSearchTerm,
  };
}
