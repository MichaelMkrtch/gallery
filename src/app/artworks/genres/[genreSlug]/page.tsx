import PageHeader from "@/components/page-header";
import ArtworksToolbar from "@/features/artworks/components/artworks-toolbar";
import GenreMain from "@/features/artworks/components/genre-main";

export default function GenrePage() {
  return (
    <div className="mb-10">
      <PageHeader title="Artworks" />

      <ArtworksToolbar />

      <GenreMain />
    </div>
  );
}
