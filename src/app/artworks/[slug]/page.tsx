"use client";

import type { Product } from "@/types/products";

import { usePathname, useSearchParams } from "next/navigation";

import ArtworksGrid from "@/components/artworks-grid";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";

type SortBy = "newest" | "oldest" | "price-low" | "price-high" | undefined;

export default function GenrePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const collectionHandle = segments[segments.length - 1] || "";

  const sortBy = searchParams.get("sort-by") as SortBy;

  const { products, loading, error } = useCollectionProducts(collectionHandle);

  if (loading) {
    return <p>Loading artwork...</p>; // Or a Skeleton Loader
  }

  if (error) {
    throw error;
  }

  if (!products || products.length === 0) {
    return <p>No artwork found.</p>;
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
    <main>
      <section>
        <ArtworksGrid products={sortedProducts} />
      </section>
    </main>
  );
}
