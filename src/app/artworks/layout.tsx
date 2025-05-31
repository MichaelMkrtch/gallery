import type { ReactNode } from "react";

import PageHeader from "@/components/page-header";

import { ArrowDownUp } from "lucide-react";

export default function ArtworksLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader title="Artworks" description={"all artwork"} />

      <div className="flex items-center justify-end">
        <button className="group/sort rounded-lg border border-neutral-200 px-1.5 py-1 shadow-2xs shadow-neutral-300 active:shadow-none active:inset-shadow-sm active:inset-shadow-neutral-300">
          <span className="flex items-center justify-center gap-1 text-neutral-700 group-active/sort:translate-y-0.25">
            <ArrowDownUp size={18} />
            Sort
          </span>
        </button>
      </div>
      {children}
    </div>
  );
}
