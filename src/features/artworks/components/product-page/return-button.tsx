import Link from "next/link";

import { useUrlStore } from "@/store/url-store";

import { ArrowLeft } from "lucide-react";

export default function ReturnButton() {
  const query = useUrlStore.use.query();

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  const returnLink = params.toString()
    ? `/artworks?${params.toString()}`
    : "/artworks";

  return (
    <div className="mb-4 flex w-fit items-center rounded-full border border-neutral-200 p-1 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-colors duration-150 hover:bg-neutral-100 active:shadow-none active:inset-shadow-xs">
      <Link href={returnLink} aria-label="Return to artworks list with filters">
        <ArrowLeft
          size={20}
          className="text-foreground cursor-pointer transition-colors duration-100 active:translate-y-px"
        />
      </Link>
    </div>
  );
}
