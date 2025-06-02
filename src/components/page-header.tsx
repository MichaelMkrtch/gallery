"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAllCollections } from "@/hooks/useAllCollections";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  const [collectionName, setCollectionName] = useState("");

  const pathname = usePathname();

  const { collections, loading, error } = useAllCollections();

  useEffect(() => {
    if (collections) {
      const collectionMatch = collections.find(
        (collection) => `/artworks/genres/${collection.handle}` === pathname,
      ) ?? { title: "All Artworks" };

      setCollectionName(collectionMatch.title);
    }
  }, [collections, pathname]);

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
    <div className="mb-8 pt-4">
      <h2 className="text-primary mb-1 text-3xl tracking-tighter">{title}</h2>
      <span className="text-xl">
        {description ? description : collectionName}
      </span>
    </div>
  );
}
