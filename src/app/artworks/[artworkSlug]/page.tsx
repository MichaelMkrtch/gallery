"use client";

import { usePathname, useRouter } from "next/navigation";

import PageHeader from "@/components/page-header";
import ArtworkCarousel from "@/features/artworks/components/artwork-carousel";
import { useProduct } from "@/hooks/useProduct";

import { ArrowLeft } from "lucide-react";

export default function ArtworkPage() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const productHandle = segments[segments.length - 1] || "";

  const { product: productArray, loading, error } = useProduct(productHandle);

  if (loading) {
    return <p>Loading artwork...</p>; // Or a Skeleton Loader
  }

  if (error) {
    throw error;
  }

  if (!productArray || productArray.length === 0) {
    return <p>No artwork found.</p>;
  }

  const product = productArray[0];
  const dimensions = product.dimensions?.match(/^(.*in )(.+)$/);

  return (
    <main>
      <PageHeader title={product.title} artist={product.artist} />

      <button
        onClick={() => router.back()}
        className="mb-4 rounded-full border border-neutral-200 p-1 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 active:shadow-none active:inset-shadow-xs"
      >
        <ArrowLeft
          size={20}
          className="text-foreground cursor-pointer transition-colors duration-100 active:translate-y-px"
        />
      </button>

      <section className="animate-fade-in grid grid-cols-[800px_1fr] gap-6">
        <ArtworkCarousel images={product.images} />

        {/* Product Metafields */}
        <section>
          <div className="space-y-0.5">
            <span className="block">
              Type: <span className="font-normal">{product.type}</span>
            </span>
            <span className="block">
              Medium: <span className="font-normal">{product.medium}</span>
            </span>
            <span className="block">Presentation: </span>
            <span className="inline">Dimensions: </span>
            <div className="inline-flex items-center">
              {dimensions && (
                <>
                  <span className="font-normal">{dimensions[1]}</span>
                  <span className="bg-foreground inline-block h-px w-5 rotate-90" />
                  <span className="font-normal">{dimensions[2]}</span>
                </>
              )}
            </div>
          </div>

          <section className="mt-4">
            <button className="text-background w-full rounded-lg bg-sky-800 px-6 py-2 shadow-2xs shadow-sky-900 transition-colors duration-200 hover:bg-sky-700 active:scale-[99%]">
              Add to bag
            </button>
          </section>
        </section>
      </section>
    </main>
  );
}
