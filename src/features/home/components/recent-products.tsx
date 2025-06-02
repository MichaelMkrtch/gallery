"use client";

import ProductsGrid from "@/components/products-grid";
import ProductsGridSkeleton from "@/components/products-grid-skeleton";
import { useRecentProducts } from "@/hooks/useRecentProducts";

export default function RecentProducts() {
  const { products, loading, error } = useRecentProducts();

  if (loading) {
    return <ProductsGridSkeleton count={3} />;
  }

  if (error) {
    throw error;
  }

  if (!products || products.length === 0) {
    return <p>No recent artwork found.</p>;
  }

  return (
    <section className="my-14">
      <h2 className="text-primary mb-4 text-2xl tracking-tighter">
        Recent Artworks
      </h2>
      <ProductsGrid products={products} />
    </section>
  );
}
