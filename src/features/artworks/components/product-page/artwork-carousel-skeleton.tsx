import { Skeleton } from "@/components/ui/skeleton";

export default function ArtworkCarouselSkeleton() {
  return (
    <div className="flex">
      <div className="mr-2 flex min-w-32 flex-col items-center justify-start gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="size-full" />
        ))}
      </div>

      <div className="aspect-[5/4] max-w-[620px] grow">
        <Skeleton className="size-full" />
      </div>
    </div>
  );
}
