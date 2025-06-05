import { Suspense } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DropdownSkeleton from "./dropdowns/dropdown-skeleton";
import FilterDropdownItems from "./dropdowns/filter-dropdown-items";
import SortDropdownItems from "./dropdowns/sort-dropdown-items";
import { ArrowDownUp, ListFilter } from "lucide-react";

export default function ArtworksToolbar() {
  return (
    <aside className="mb-4 flex items-center justify-end gap-2">
      {/* Filter Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative cursor-pointer rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 transition-colors duration-150 outline-none select-none hover:bg-neutral-100 data-[state=open]:shadow-none data-[state=open]:inset-shadow-sm data-[state=open]:inset-shadow-neutral-300">
            <span className="flex items-center justify-center gap-1 active:translate-y-px">
              <ListFilter size={18} />
              Filter
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-background relative top-1 right-4 border-neutral-200 px-3">
          <DropdownMenuLabel className="text-base">Filter by</DropdownMenuLabel>

          <DropdownMenuGroup className="mt-3 w-full space-y-0.25">
            <Suspense fallback={<DropdownSkeleton count={4} />}>
              <FilterDropdownItems />
            </Suspense>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative cursor-pointer rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 transition-colors duration-150 outline-none select-none hover:bg-neutral-100 data-[state=open]:shadow-none data-[state=open]:inset-shadow-sm data-[state=open]:inset-shadow-neutral-300">
            <span className="flex items-center justify-center gap-1 active:translate-y-px">
              <ArrowDownUp size={18} />
              Sort
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-background border-neutral-200">
          <DropdownMenuLabel className="text-base">Sort by</DropdownMenuLabel>
          <DropdownMenuGroup className="space-y-0.25">
            <Suspense fallback={<DropdownSkeleton count={4} />}>
              <SortDropdownItems />
            </Suspense>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}
