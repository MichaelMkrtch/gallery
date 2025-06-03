import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistsCarouselSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <section className="carousel-container animate-fade-in group/artists relative mb-12">
      <h2 className="text-primary mb-4 text-2xl tracking-tighter">Artists</h2>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="w-fit basis-1/2 md:basis-1/3 lg:basis-1/4">
          <Skeleton className="carousel-item size-full" />
        </div>
      ))}
    </section>
  );
}
