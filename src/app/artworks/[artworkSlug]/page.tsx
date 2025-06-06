"use client";

import { usePathname } from "next/navigation";

import AddToBagBtn from "@/components/bag/add-to-bag-btn";
import PageHeader from "@/components/page-header";
import ArtworkCarousel from "@/features/artworks/components/product-page/artwork-carousel";
import ArtworkPageSkeleton from "@/features/artworks/components/product-page/artwork-page-skeleton";
import ReturnButton from "@/features/artworks/components/product-page/return-button";
import { useProduct } from "@/hooks/useProduct";

export default function ArtworkPage() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const productHandle = segments[segments.length - 1] || "";

  const { product: productArray, loading, error } = useProduct(productHandle);

  if (loading) {
    return <ArtworkPageSkeleton />;
  }

  if (error) {
    throw error;
  }

  if (!productArray || productArray.length === 0) {
    return <p>No artwork found.</p>;
  }

  const product = productArray && productArray[0];
  const dimensions = product.dimensions?.match(/^(.*in )(.+)$/);

  return (
    <div className="mb-10">
      <PageHeader title={product.title} artist={product.artist} />

      <ReturnButton />

      <main className="animate-fade-in grid grid-cols-[800px_1fr] gap-6">
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
            <AddToBagBtn type="solid" product={product} />
          </section>
        </section>
      </main>
    </div>
  );
}
