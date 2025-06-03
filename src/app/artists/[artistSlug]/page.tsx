"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import PageHeader from "@/components/page-header";
import ProductsGrid from "@/components/products-grid";
import ProductsGridSkeleton from "@/components/products-grid-skeleton";
import ArtistPageSkeleton from "@/features/artists/components/artist-page-skeleton";
import { useArtist } from "@/hooks/useArtist";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";

export default function ArtistPage() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const artistHandle = segments[segments.length - 1] || "";

  const {
    artist,
    loading: artistLoading,
    error: artistError,
  } = useArtist(artistHandle);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useCollectionProducts(artistHandle);

  if (artistLoading) {
    return <ArtistPageSkeleton />;
  }

  if (artistError || productsError) {
    throw artistError || productsError;
  }

  if (!artist || Object.keys(artist).length === 0) {
    return <p>No artwork found.</p>;
  }

  if (productsLoading) {
    return (
      <div>
        <ArtistPageSkeleton />
        <ProductsGridSkeleton count={3} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p>No artwork found.</p>;
  }

  return (
    <div className="mb-10">
      <PageHeader title={artist.name} />

      <main className="animate-fade-in">
        <div className="grid grid-cols-[300px_1fr] gap-8">
          <Image
            src={artist.image.url}
            alt={artist.image.alt ?? `Portrait image of ${artist.name}`}
            height={1920}
            width={1080}
            priority
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />

          <section className="place-self-center">
            <div
              dangerouslySetInnerHTML={{ __html: artist.bio }}
              className="leading-7 tracking-wide"
            />
          </section>
        </div>

        <section className="mt-12 w-full">
          <h3 className="mb-4 text-2xl tracking-tighter">Collection</h3>

          <ProductsGrid products={products} />
        </section>
      </main>
    </div>
  );
}
