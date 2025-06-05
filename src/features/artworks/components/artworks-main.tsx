"use client";

import type { Product } from "@/types/products";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import ProductsGrid from "@/components/products-grid";
import ProductsGridSkeleton from "@/components/products-grid-skeleton";
import { useAllArtwork } from "@/hooks/useAllArtwork";
import { slugifyName } from "@/lib/utils";

type SortBy = "newest" | "oldest" | "price-low" | "price-high" | undefined;

const filterKeys = ["genre", "artist", "style", "category"] as const;
type FilterKey = (typeof filterKeys)[number];

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

export default function ArtworksMain() {
  const searchParams = useSearchParams();
  const { products, loading, error } = useAllArtwork();

  const filters = useMemo(() => {
    const parsed: Partial<Record<FilterKey, string[]>> = {};
    filterKeys.forEach((key) => {
      const values = searchParams.getAll(key);
      if (values.length > 0) parsed[key] = values;
    });
    return parsed;
  }, [searchParams]);

  const sortBy = searchParams.get("sort-by") as SortBy;

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;
    for (const key of filterKeys) {
      const selected = filters[key];
      if (selected && selected.length > 0) {
        filtered = filtered.filter((product) =>
          selected.includes(slugifyName(product[key] as string)),
        );
      }
    }

    const compareFn =
      (sortBy && compareFunctions[sortBy]) || compareFunctions["newest"];

    return [...filtered].sort(compareFn);
  }, [products, filters, sortBy]);

  if (loading) return <ProductsGridSkeleton />;
  if (error) throw error;
  if (filteredAndSortedProducts.length === 0)
    return <p className="text-center text-xl">No artwork found.</p>;

  return (
    <main>
      <section>
        <ProductsGrid products={filteredAndSortedProducts} />
      </section>
    </main>
  );
}
