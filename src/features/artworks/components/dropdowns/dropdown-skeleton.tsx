import { Skeleton } from "@/components/ui/skeleton";

export default function DropdownSkeleton({ count }: { count: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="h-5 w-full rounded-sm" />
      ))}
    </>
  );
}
