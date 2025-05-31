import type { ReactNode } from "react";

import Link from "next/link";

import PageHeader from "@/components/page-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";

export default function ArtworksLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader title="Artworks" description={"all artwork"} />

      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group relative rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 outline-none select-none data-[state=open]:shadow-none data-[state=open]:inset-shadow-sm data-[state=open]:inset-shadow-neutral-300">
              <span className="flex items-center justify-center gap-1 text-neutral-700 active:translate-y-px">
                <ArrowDownUp size={18} />
                Sort
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-background border-neutral-200">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href="/artworks?sort-by=oldest">
                <DropdownMenuItem>
                  <ArrowUp size={16} />
                  Oldest first
                </DropdownMenuItem>
              </Link>
              <Link href="/artworks?sort-by=newest">
                <DropdownMenuItem>
                  <ArrowDown size={16} />
                  Newest first
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/artworks?sort-by=price-low">
                <DropdownMenuItem>
                  <ArrowUp size={16} />
                  Price: low to high
                </DropdownMenuItem>
              </Link>
              <Link href="/artworks?sort-by=price-high">
                <DropdownMenuItem>
                  <ArrowDown size={16} />
                  Price: high to low
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
}
