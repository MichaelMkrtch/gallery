"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUrlStore } from "@/store/url-store";

import { ArrowDown, ArrowUp } from "lucide-react";

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

export default function SortDropdownItems() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort-by") as SortBy;

  const setQuery = useUrlStore.use.setQuery();

  const handleSortChange = (value: SortBy) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort-by", value);
      setQuery("sort-by", value);
    } else {
      params.delete("sort-by");
      setQuery("sort-by", undefined);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {sortOptions.map((option) => (
        <DropdownMenuItem
          key={option.text}
          onSelect={(e) => {
            e.preventDefault();
            handleSortChange(option.queryParam);
          }}
          className={`${
            currentSort === option.queryParam ? "bg-neutral-200/85" : ""
          } dropdown-link`}
        >
          {option.icon}
          {option.text}
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSortChange(undefined);
        }}
        className="mx-auto w-full cursor-pointer rounded-md px-3 py-1 text-sm transition-colors duration-100 ease-in hover:bg-neutral-100"
      >
        Reset
      </button>
    </>
  );
}
