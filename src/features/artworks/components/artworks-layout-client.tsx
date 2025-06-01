"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import PageHeader from "@/components/page-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAllCollections } from "@/hooks/useAllCollections";

import { ArrowDown, ArrowDownUp, ArrowUp, ListFilter } from "lucide-react";

type SortBy = "newest" | "oldest" | "price-low" | "price-high" | undefined;

const sortOptions = [
  {
    text: "Oldest first",
    queryParam: "oldest" as const,
    icon: <ArrowUp size={16} />,
  },
  {
    text: "Newest first",
    queryParam: "newest" as SortBy,
    icon: <ArrowDown size={16} />,
  },
  {
    text: "Price: low to high",
    queryParam: "price-low" as SortBy,
    icon: <ArrowUp size={16} />,
  },
  {
    text: "Price: high to low",
    queryParam: "price-high" as SortBy,
    icon: <ArrowDown size={16} />,
  },
];

export default function ArtworksLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort-by") as SortBy;
  const queryParam = sortBy ? `?sort-by=${sortBy}` : "";

  const { collections, loading, error } = useAllCollections();

  if (error) {
    throw error;
  }

  if (loading) {
    return <p>Collections loading...</p>;
  }

  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>;
  }

  return (
    <div className="mb-10">
      <PageHeader title="Artworks" />

      <aside className="mb-2 flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative cursor-pointer rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 outline-none select-none data-[state=open]:shadow-none data-[state=open]:inset-shadow-sm data-[state=open]:inset-shadow-neutral-300">
              <span className="flex items-center justify-center gap-1 text-neutral-700 active:translate-y-px">
                <ListFilter size={18} />
                Filter
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-background border-neutral-200">
            <DropdownMenuLabel className="text-base">
              Filter by
            </DropdownMenuLabel>
            <DropdownMenuGroup className="w-full space-y-0.25">
              <Link href={`/artworks${queryParam}`}>
                <DropdownMenuItem className="dropdown-link">
                  All Artworks
                </DropdownMenuItem>
              </Link>
              {collections.map((collection) => {
                return (
                  <Link
                    key={collection.id}
                    href={`/artworks/${collection.handle}${queryParam}`}
                  >
                    <DropdownMenuItem className="dropdown-link">
                      {collection.title}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative cursor-pointer rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 outline-none select-none data-[state=open]:shadow-none data-[state=open]:inset-shadow-sm data-[state=open]:inset-shadow-neutral-300">
              <span className="flex items-center justify-center gap-1 text-neutral-700 active:translate-y-px">
                <ArrowDownUp size={18} />
                Sort
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-background border-neutral-200">
            <DropdownMenuLabel className="text-base">Sort by</DropdownMenuLabel>
            <DropdownMenuGroup className="space-y-0.25">
              {sortOptions.map((option) => {
                return (
                  <Link
                    key={option.text}
                    href={`/artworks?sort-by=${option.queryParam}`}
                  >
                    <DropdownMenuItem className="dropdown-link">
                      {option.icon}
                      {option.text}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>

      {children}
    </div>
  );
}
