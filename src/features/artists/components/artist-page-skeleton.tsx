import ProductsGridSkeleton from "@/components/products-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistPageSkeleton() {
  return (
    <div className="mb-8 pb-4">
      <div className="mb-8 min-h-[52px] space-y-2 pt-4">
        <Skeleton className="h-9 w-42" />
      </div>

      <main className="animate-fade-in">
        <div className="grid grid-cols-[300px_1fr] gap-8">
          <Skeleton className="aspect-[4/5] size-full" />

          <section className="size-full place-self-center">
            <Skeleton className="size-full" />
          </section>
        </div>

        <section className="mt-12 size-full">
          <Skeleton className="mb-4 h-8 w-full" />

          <ProductsGridSkeleton count={6} />
        </section>
      </main>
    </div>
  );
}
