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
          <div key={i} className="aspect-[2/3] max-w-[290px]">
            <Skeleton className="aspect-[2/3]" />
          </div>
        ))}
      </div>
    </section>
  );
}
