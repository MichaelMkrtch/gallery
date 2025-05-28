import PageHeader from "@/components/page-header";
import ArtistsGrid from "@/features/artists/components/artists-grid";

export default function ArtistPage() {
  return (
    <main className="animate-fade-in">
      <PageHeader
        title="Artists"
        description="Meet AG Gallery's fine artists"
      />
      <ArtistsGrid />
    </main>
  );
}
