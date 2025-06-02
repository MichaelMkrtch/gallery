import { Suspense } from "react";

import PageHeader from "@/components/page-header";
import ArtworksMain from "@/features/artworks/components/artworks-main";
import ArtworksToolbar from "@/features/artworks/components/artworks-toolbar";

export default function ArtworksPage() {
  return (
    <div className="mb-10">
      <PageHeader title="Artworks" />

      <ArtworksToolbar />

      <Suspense>
        <ArtworksMain />
      </Suspense>
    </div>
  );
}
