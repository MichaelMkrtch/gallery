"use client";

import ArtworksGrid from "@/components/artworks-grid";
import ArtistsCarousel from "@/features/home/components/artists-carousel";
import OverviewCarousel from "@/features/home/components/overview-carousel";
import { useRecentProducts } from "@/hooks/useRecentProducts";

export default function Home() {
  const { products, loading, error } = useRecentProducts();

  if (loading) {
    return <p>Loading recent artwork...</p>; // Or a Skeleton Loader
  }

  if (error) {
    throw error;
  }

  if (!products || products.length === 0) {
    return <p>No recent artwork found.</p>;
  }

  return (
    <main className="animate-fade-in">
      <OverviewCarousel />

      <section className="mt-8 mb-8 md:mt-10">
        <h2 className="mb-2 text-center text-xl font-semibold tracking-tight">
          Welcome to the Agajanian Gallery
        </h2>
        <p className="mx-auto text-center leading-5 tracking-wide text-balance md:max-w-3/5 md:text-lg md:leading-6 lg:max-w-1/2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit error
          nisi sequi tempore obcaecati vero impedit dolores, iste totam quod
          eaque deleniti, adipisci. Soluta officiis nesciunt accusamus voluptas
          totam.
        </p>
      </section>

      <ArtistsCarousel />

      <section className="my-14">
        <h2 className="text-primary mb-4 text-2xl tracking-tighter">
          Recent Artworks
        </h2>
        <ArtworksGrid products={products} />
      </section>
    </main>
  );
}
