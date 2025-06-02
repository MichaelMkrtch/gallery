"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAllCollections } from "@/hooks/useAllCollections";
import { slugifyName } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  artist?: string | null;
};

export default function PageHeader({ title, artist }: PageHeaderProps) {
  const [collectionName, setCollectionName] = useState("");
  const pathname = usePathname();

  // Loading and error states are handled in main page components.
  // They are unnecessary here since the subtitle is informational.
  const { collections } = useAllCollections();

  useEffect(() => {
    if (collections) {
      const collectionMatch = collections.find(
        (collection) => `/artworks/genres/${collection.handle}` === pathname,
      ) ?? { title: "All Artworks" };

      setCollectionName(collectionMatch.title);
    }
  }, [collections, pathname]);

  const slug = slugifyName(artist);

  const subtitleText = artist ? artist : (collectionName ?? "");
  const subtitleLink = artist ? `/artists/${slug}` : "";

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
