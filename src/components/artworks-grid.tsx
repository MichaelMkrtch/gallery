const artworks = [
  "Artwork 1",
  "Artwork 2",
  "Artwork 3",
  "Artwork 4",
  "Artwork 5",
  "Artwork 6",
];

export default function ArtworksGrid() {
  return (
    <div className="animate-fade-in">
      <div className="grid place-items-center gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 2xl:gap-5">
        {artworks.map((artwork) => {
          return (
            <div
              key={artwork}
              className="flex aspect-[5/4] w-full items-center justify-center rounded bg-neutral-100 p-5 shadow-xs select-none"
            >
              <div className="flex size-full items-center justify-center bg-neutral-300">
                <p>{artwork}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
