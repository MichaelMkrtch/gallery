"use client";

import ArtworksGrid from "@/components/artworks-grid";
import { useAllArtwork } from "@/hooks/useAllArtwork";

export default function AllArtworksPage() {
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

  return (
    <main className="mt-2 mb-8 pb-4">
      <section className="mt-6">
        <ArtworksGrid products={products} />
      </section>
    </main>
  );
}
