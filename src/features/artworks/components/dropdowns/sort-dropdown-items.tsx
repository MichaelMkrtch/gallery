"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort-by") as SortBy;

  return sortOptions.map((option) => {
    return (
      <Link key={option.text} href={`/artworks?sort-by=${option.queryParam}`}>
        <DropdownMenuItem
          className={`${sortBy === option.queryParam ? "bg-neutral-200 focus:bg-neutral-300" : ""} dropdown-link`}
        >
          {option.icon}
          {option.text}
        </DropdownMenuItem>
      </Link>
    );
  });
}
