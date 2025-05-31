"use client";

import type { ReactNode } from "react";

import { Suspense } from "react";

import ArtworksLayoutClient from "@/features/artworks/components/artworks-layout-client";

export default function ArtworksLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ArtworksLayoutClient>{children}</ArtworksLayoutClient>
    </Suspense>
  );
}
