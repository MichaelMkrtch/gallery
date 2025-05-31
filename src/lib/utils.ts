import type { Product, RawGraphQLProductNode } from "@/types/products";
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number with commas as thousands separators.
 *
 * @param value - The number to format.
 * @param locale - Optional: The locale to use for formatting (e.g., 'en-US').
 *                 Defaults to the user's default locale if not provided.
 * @returns A string representation of the formatted number, or an empty string
 *          if the input is not a valid number.
 */
export function formatNumber(
  value: number | string | undefined | null,
  locale?: string,
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (typeof num !== "number" || isNaN(num)) {
    console.warn(
      `formatNumberWithCommas: Invalid input '${value}'. Expected a number or a string convertible to a number.`,
    );
    return "";
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  } catch (error) {
    console.error(
      `formatNumberWithCommas: Error formatting number '${num}' with locale '${locale}':`,
      error,
    );
    // Fallback in case of an unexpected Intl error
    return String(num);
  }
}

type ProductEdge<TProductNode> = {
  cursor: string;
  node: TProductNode;
};

type ProductConnection<TProductNode> = {
  edges: Array<ProductEdge<TProductNode> | null | undefined>;
};

interface DataWithConnection<TProductNode> {
  products: ProductConnection<TProductNode> | null | undefined;
}

export function formatProducts<
  TGraphQLProductNode extends RawGraphQLProductNode,
>(
  data: DataWithConnection<TGraphQLProductNode> | undefined | null,
): Product[] | undefined {
  if (!data?.products?.edges) {
    return undefined;
  }

  const products = data.products.edges
    .map((edge) => {
      // Skip if edge or node is null
      if (!edge?.node) return null;

      const product = edge.node;

      const images = product.images.edges
        .map((imgEdge) => {
          // Skip if edge or node is null
          if (!imgEdge?.node) return null;

          const image = imgEdge.node;

          return {
            id: image.id,
            url: image.url,
            altText: image.altText,
            width: image.width,
            height: image.height,
          };
        })
        .filter((img) => img !== null);

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
    })
    .filter((product) => product !== null);

  return products;
}
