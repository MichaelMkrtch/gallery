import ArtworksGrid from "@/components/artworks-grid";
import PageHeader from "@/components/page-header";

export default function ArtworksPage() {
  return (
    <main>
      <PageHeader title="Artworks" description="Artworks Page" />

      <section>
        <ArtworksGrid />
      </section>
    </main>
  );
}
