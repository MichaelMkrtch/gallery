import type { Product, RawGraphQLProductNode } from "@/types/products";
import type { ClassValue } from "clsx";

import { Artist } from "@/types/artist";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a string to be a URL slug. This function should only
 * be used for simple strings without special characters.
 * @param s - String to slugify
 * @returns The slugified string
 */
export function slugifyName(s: string | null | undefined) {
  if (!s) return "";

  const lowerCased = s.toLowerCase();
  const split = lowerCased.split(" ");
  const joined = split.join("-");

  return joined;
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

/**
 * Formats raw article data (represents artist) from Shopify
 * @param artist - Article object from Shopify API
 * @returns Formatted artist object
 */
export function formatArtist(artist: Artist) {
  if (!artist || !artist.image) {
    return;
  }

  return {
    id: artist.id,
    name: artist.title,
    handle: artist.handle,
    image: {
      url: artist.image.url,
      alt: artist.image.altText,
    },
    bio: artist.contentHtml,
  };
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
        type: product.type?.value,
        medium: product.medium?.value,
        dimensions: product.dimensions?.value,
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
