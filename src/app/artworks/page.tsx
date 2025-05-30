import ArtworksGrid from "@/components/artworks-grid";
import PageHeader from "@/components/page-header";

export default function ArtworksPage() {
  return (
    <main className="mb-8 pb-4">
      <PageHeader title="Artworks" description="Artworks Page" />

      <section>
        <ArtworksGrid />
      </section>
    </main>
  );
}
