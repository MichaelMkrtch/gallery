"use client";

import { Suspense } from "react";

import ArtworksPageClient from "@/features/artworks/components/artworks-client";

export default function AllArtworksPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ArtworksPageClient />
    </Suspense>
  );
}
