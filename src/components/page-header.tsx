"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useAllCollections } from "@/hooks/useAllCollections";
import { slugifyName } from "@/lib/utils";
import { useUrlStore } from "@/store/url-store";

type PageHeaderProps = {
  title: string;
  artist?: string | null;
};

export default function PageHeader({ title, artist }: PageHeaderProps) {
  const pathname = usePathname();
  const { collections } = useAllCollections();
  const categorySlugs = useUrlStore.use.query().category;

  const categoryNames = useMemo(() => {
    if (!collections || !categorySlugs?.length) return [];

    return collections
      .filter((c) => c.type === "category")
      .filter((c) => categorySlugs.includes(c.handle))
      .map((c) => c.title);
  }, [collections, categorySlugs]);

  const getSubtitleText = () => {
    if (artist) return artist;
    if (!categoryNames.length) return "All Artworks";
    if (categoryNames.length === 1) return categoryNames[0];

    const last = categoryNames[categoryNames.length - 1];
    const others = categoryNames.slice(0, -1);
    return `${others.join(", ")} and ${last}`;
  };

  const subtitleText = getSubtitleText();
  const subtitleLink = artist ? `/artists/${slugifyName(artist)}` : "";

  const subtitle = subtitleLink ? (
    <Link
      href={subtitleLink}
      className="group relative inline-block w-fit text-xl tracking-tight"
    >
      {subtitleText}
      <div className="bg-primary relative right-0 bottom-1.25 left-0 -z-50 mx-auto h-[1.25px] w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  ) : (
    <span className="text-xl tracking-tight">{subtitleText}</span>
  );

  if (pathname.includes("/artists")) {
    return (
      <div className="mb-8 pt-4">
        <h2 className="text-primary mb-1 text-3xl tracking-tighter">{title}</h2>
      </div>
    );
  }

  return (
    <div className="mb-8 w-fit pt-4">
      <h2 className="text-primary mb-1 text-3xl tracking-tighter">{title}</h2>
      <div className="min-h-7">
        {artist ? (
          <div className="text-xl tracking-tight">by {subtitle}</div>
        ) : (
          subtitle
        )}
      </div>
    </div>
  );
}
