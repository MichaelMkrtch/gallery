const artists = [
  "Artist 1",
  "Artist 2",
  "Artist 3",
  "Artist 4",
  "Artist 5",
  "Artist 6",
  "Artist 7",
  "Artist 8",
  "Artist 9",
  "Artist 10",
  "Artist 11",
  "Artist 12",
];

export default function ArtistsGrid() {
  return (
    <section>
      <div className="grid grid-cols-2 place-items-center gap-3 lg:grid-cols-3 lg:gap-3 2xl:gap-5">
        {artists.map((artist) => {
          return (
            <div
              key={artist}
              className="group/artists relative flex aspect-[5/4] size-full items-center justify-center rounded bg-neutral-300 sm:max-h-[350px]"
            >
              <div className="bg-foreground/75 absolute bottom-0 flex h-10 w-full items-center justify-start px-4 transition-opacity duration-150 ease-in sm:justify-center xl:opacity-0 xl:group-hover/artists:opacity-100">
                <p className="text-background">{artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
