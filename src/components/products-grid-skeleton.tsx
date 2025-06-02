import { Skeleton } from "./ui/skeleton";

export default function ProductsGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="animate-fade-in mb-8 pb-4">
      <div className="grid place-items-center gap-3 lg:grid-cols-3 lg:gap-4 2xl:gap-5">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="aspect-[5/4] w-full flex-col items-center justify-center rounded select-none"
          >
            <Skeleton className="size-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
