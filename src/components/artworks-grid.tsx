"use client";

import type {
  GetCollectionWithProductsQuery,
  GetCollectionWithProductsQueryVariables,
} from "../graphql/generated/graphql";

import Image from "next/image";

import { GetCollectionWithProductsDocument } from "../graphql/generated/graphql";
import { useQuery } from "@apollo/client";

export default function ArtworksGrid() {
  const { loading, error, data, fetchMore } = useQuery<
    GetCollectionWithProductsQuery,
    GetCollectionWithProductsQueryVariables
  >(GetCollectionWithProductsDocument, {
    variables: {
      collectionHandle: "Paintings",
    },
    fetchPolicy: "cache-first",
  });

  if (loading && !data) {
    // TODO: loading state if there is no data
    return <p>Loading products...</p>;
  }

  if (error) {
    console.error("ProductList Error:", JSON.stringify(error, null, 2));
    // TODO: customize the error object before throwing
    throw error;
  }

  const products = data?.collection?.products.edges;
  const pageInfo = data?.collection?.products?.pageInfo;

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  const handleLoadMore = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
        // TODO: might need an updateQuery function here if cache doesn't
        // merge paginated results correctly.
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="grid place-items-center gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 2xl:gap-5">
        {products.map((product) => {
          return (
            <div
              key={product.cursor}
              className="flex aspect-[5/4] w-full items-center justify-center rounded bg-neutral-100 p-5 shadow-xs select-none"
            >
              <div className="flex size-full items-center justify-center bg-neutral-300">
                <Image
                  src={product.node.images.edges[0].node.url}
                  alt={product.node.images.edges[0].node.altText ?? ""}
                  width={product.node.images.edges[0].node.width ?? "1920"}
                  height={product.node.images.edges[0].node.height ?? "1080"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
