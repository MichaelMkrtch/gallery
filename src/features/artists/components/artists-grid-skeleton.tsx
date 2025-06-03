import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistsGridSkeleton({
  count = 12,
}: {
  count?: number;
}) {
  return (
    <section className="animate-fade-in">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="aspect-[4/5] max-w-[290px]">
            <Skeleton className="aspect-[4/5]" />
          </div>
        ))}
      </div>
    </section>
  );
}
