const artworks = [
  "Artwork 1",
  "Artwork 2",
  "Artwork 3",
  "Artwork 4",
  "Artwork 5",
  "Artwork 6",
];

export default function RecentArtGrid() {
  return (
    <section className="animate-fade-in my-14">
      <h2 className="text-primary mb-4 text-2xl tracking-tighter">
        Recent Artworks
      </h2>

      <div className="grid grid-cols-2 place-items-center gap-5 md:grid-cols-3">
        {artworks.map((artwork) => {
          return (
            <div
              key={artwork}
              className="bg-foreground/[0.02] flex items-center justify-center rounded p-5 select-none md:h-[370px] md:w-[395px]"
            >
              <div className="flex size-full items-center justify-center bg-neutral-200">
                <p>{artwork}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
