import type {
  GetRecentProductsQuery,
  GetRecentProductsQueryVariables,
} from "@/graphql/generated/graphql";
import type { Product } from "@/types/products";

import { GetRecentProductsDocument } from "@/graphql/generated/graphql";

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
    fetchPolicy: "cache-first",
  });

  if (error) {
    console.error(
      "recent products hook error:",
      JSON.stringify(error, null, 2),
    );
  }

  const products = data?.products.edges.map((edge) => {
    const product = edge.node;

    const images = product.images.edges.map((edge) => {
      const image = edge.node;

      return {
        id: image.id,
        url: image.url,
        altText: image.altText,
        width: image.width,
        height: image.height,
      };
    });

    const formattedProduct = {
      cursor: edge.cursor,
      id: product.id,
      title: product.title,
      handle: product.handle,
      descriptionHtml: product.descriptionHtml,
      artist: product.artist?.value,
      genre: product.genre?.value,
      price: product.priceRange.minVariantPrice.amount as string,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      images,
      createdAt: product.createdAt,
    };

    return formattedProduct;
  });

  return {
    products,
    loading: loading && !data,
    error,
  };
}
