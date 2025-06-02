"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAllCollections } from "@/hooks/useAllCollections";

import DropdownSkeleton from "./dropdown-skeleton";

type SortBy = "newest" | "oldest" | "price-low" | "price-high" | undefined;

export default function FilterDropdownItems() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const collectionHandle = segments[segments.length - 1] || "";

  const sortBy = searchParams.get("sort-by") as SortBy;
  const queryParam = sortBy ? `?sort-by=${sortBy}` : "";

  const { collections, loading, error } = useAllCollections();

  if (error) {
    throw error;
  }

  if (loading) {
    return <DropdownSkeleton count={4} />;
  }

  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>;
  }

  return (
    <>
      <Link href={`/artworks${queryParam}`}>
        <DropdownMenuItem
          className={`${collectionHandle === "artworks" ? "bg-neutral-200 focus:bg-neutral-300" : ""} dropdown-link`}
        >
          All Artworks
        </DropdownMenuItem>
      </Link>
      {collections.map((collection) => {
        return (
          <Link
            key={collection.id}
            href={`/artworks/genres/${collection.handle}${queryParam}`}
          >
            <DropdownMenuItem
              className={`${collectionHandle === collection.handle ? "bg-neutral-200 focus:bg-neutral-300" : ""} dropdown-link`}
            >
              {collection.title}
            </DropdownMenuItem>
          </Link>
        );
      })}
    </>
  );
}
