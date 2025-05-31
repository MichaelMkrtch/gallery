"use client";

import type { Product } from "@/types/products";

import { useSearchParams } from "next/navigation";

import ArtworksGrid from "@/components/artworks-grid";
import { useAllArtwork } from "@/hooks/useAllArtwork";

type SortBy = "newest" | "oldest" | "price-low" | "price-high" | undefined;

export default function AllArtworksPage() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort-by") as SortBy;

  const { products, loading, error } = useAllArtwork();

  if (loading) {
    return <p>Loading recent products...</p>; // Or a Skeleton Loader
  }

  if (error) {
    throw error;
  }

  if (!products || products.length === 0) {
    return <p>No recent products found.</p>;
  }

  const compareFunctions: Record<
    Exclude<SortBy, undefined>,
    (a: Product, b: Product) => number
  > = {
    newest: (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    oldest: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    "price-low": (a, b) => Number(a.price) - Number(b.price),
    "price-high": (a, b) => Number(b.price) - Number(a.price),
  };

  const compareFn =
    (sortBy && compareFunctions[sortBy]) || compareFunctions["newest"];

  const sortedProducts = products ? [...products].sort(compareFn) : [];

  return (
    <main className="mt-2 mb-8 pb-4">
      <section className="mt-6">
        <ArtworksGrid products={sortedProducts} />
      </section>
    </main>
  );
}
