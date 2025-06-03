"use client";

import Image from "next/image";
import Link from "next/link";

import ArtistsGridSkeleton from "@/features/artists/components/artists-grid-skeleton";
import { useAllArtists } from "@/hooks/useAllArtists";

export default function ArtistsGrid() {
  const { artists, loading, error } = useAllArtists();

  if (loading) {
    return <ArtistsGridSkeleton />;
  }

  if (error) {
    throw error;
  }

  if (!artists || artists.length === 0) {
    return <p>No artwork found.</p>;
  }

  return (
    <section className="animate-fade-in">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3">
        {artists.map((artist, index) => {
          return (
            artist && (
              <Link
                key={artist.id}
                href={`/artists/${artist.handle}`}
                className="group/artists relative aspect-[4/5] size-full max-w-[290px] object-cover"
              >
                <Image
                  src={artist.image.url}
                  alt={artist.image.url}
                  width={1920}
                  height={1080}
                  priority={index <= 2}
                  className="aspect-[4/5] size-full rounded-sm"
                />
                <div className="bg-foreground/75 absolute bottom-0 flex h-full w-full items-center justify-start rounded-sm transition-opacity duration-150 ease-in sm:justify-center xl:opacity-0 xl:group-hover/artists:opacity-100">
                  <p className="text-background">{artist.name}</p>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </section>
  );
}
