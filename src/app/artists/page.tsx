import PageHeader from "@/components/page-header";
import ArtistsGrid from "@/features/artists/components/artists-grid";

export default function ArtistPage() {
  return (
    <main className="mb-8 pb-4">
      <PageHeader
        title="Artists"
        description="Meet AG Gallery's fine artists"
      />
      <ArtistsGrid />
    </main>
  );
}
