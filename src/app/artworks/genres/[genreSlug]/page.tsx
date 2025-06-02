"use client";

import { Suspense } from "react";

import GenrePageClient from "@/features/artworks/components/genre-client";

export default function GenrePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GenrePageClient />
    </Suspense>
  );
}
