import { Skeleton } from "@/components/ui/skeleton";

import ArtworkCarouselSkeleton from "./artwork-carousel-skeleton";

export default function ArtworkPageSkeleton() {
  return (
    <div className="mb-10">
      <div className="min-h-[163px] space-y-2 pt-4">
        <Skeleton className="h-9 w-42" />
        <Skeleton className="h-7 w-42" />
      </div>

      <main className="animate-fade-in grid grid-cols-[800px_1fr] gap-6">
        <ArtworkCarouselSkeleton />

        <Skeleton className="size-full" />
      </main>
    </div>
  );
}
