"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAllCollections } from "@/hooks/useAllCollections";
import { categorizeCollections } from "@/lib/utils";
import { useUrlStore } from "@/store/url-store";

import DropdownSkeleton from "./dropdown-skeleton";

export default function FilterDropdownItems() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleQueryValue = useUrlStore.use.toggleQueryValue();
  const clearAllQueries = useUrlStore.use.clearAllQueries();
  const syncQueryFromUrl = useUrlStore.use.syncQueryFromUrl();
  const query = useUrlStore.use.query();

  const { collections, loading, error } = useAllCollections();

  useEffect(() => {
    syncQueryFromUrl(searchParams);
  }, [searchParams, syncQueryFromUrl]);

  if (error) {
    throw error;
  }

  if (loading) {
    return <DropdownSkeleton count={4} />;
  }

  if (!collections || collections.length === 0) {
    return <p className="mx-auto text-center">No collections found.</p>;
  }

  const { categories, artists, styles, genres } =
    categorizeCollections(collections);

  const filters = [
    { title: "Category", data: categories },
    { title: "Artist", data: artists },
    { title: "Style", data: styles },
    { title: "Genre", data: genres },
  ];

  const handleClick = (type: string, handle: string) => {
    toggleQueryValue(type, handle);

    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(type);
    const isSelected = currentValues.includes(handle);

    if (isSelected) {
      const filtered = currentValues.filter((v) => v !== handle);
      params.delete(type);
      filtered.forEach((val) => params.append(type, val));
    } else {
      params.append(type, handle);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    ["category", "artist", "style", "genre"].forEach((key) => {
      params.delete(key);
    });

    clearAllQueries();
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="grid size-full grid-cols-4 gap-3">
        {filters.map((filter, index) => (
          <div
            key={filter.title}
            className={`${
              index === filters.length - 1 ? "border-r-none" : "border-r-none"
            } rounded-md border-neutral-200 bg-neutral-200/30 p-2`}
          >
            <h4 className="mr-auto mb-2 place-self-center px-2 text-start">
              {filter.title}
            </h4>
            {filter.data.map((collection) => {
              const isSelected = query[collection.type]?.includes(
                collection.handle,
              );

              return (
                <DropdownMenuItem
                  asChild
                  key={collection.id}
                  onSelect={(e) => e.preventDefault()}
                  className="justify-between"
                >
                  <div
                    className="dropdown-link relative overflow-hidden"
                    onClick={() =>
                      handleClick(collection.type, collection.handle)
                    }
                  >
                    {collection.title}
                    <span
                      className={`${isSelected ? "opacity-100" : "opacity-0"} float-right size-1 rounded-full bg-sky-400 transition-opacity duration-75 ease-in`}
                    />
                  </div>
                </DropdownMenuItem>
              );
            })}
          </div>
        ))}
      </div>

      <DropdownMenuSeparator className="my-3" />

      <button
        onClick={handleClearSearchParams}
        className="float-right mb-1 cursor-pointer rounded-md px-3 py-1 text-sm transition-colors duration-100 ease-in hover:bg-neutral-100"
      >
        Clear all
      </button>
    </>
  );
}
