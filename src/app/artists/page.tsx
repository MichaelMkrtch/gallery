import ArtistsGrid from "@/features/artists/components/ArtistsGrid";

export default function ArtistPage() {
  return (
    <main className="animate-fade-in mb-8">
      <section className="mb-8 pt-4">
        <h2 className="text-primary mb-1 text-3xl tracking-tighter">Artists</h2>
        <span className="text-xl">{"Meet AG Gallery's fine artists"}</span>
      </section>

      <ArtistsGrid />
    </main>
  );
}
