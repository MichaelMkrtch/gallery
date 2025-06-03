"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAllArtists } from "@/hooks/useAllArtists";

import ArtistsCarouselSkeleton from "./artists-carousel-skeleton";

export default function ArtistsCarousel() {
  const { artists, loading, error } = useAllArtists(12);

  if (loading) {
    return <ArtistsCarouselSkeleton />;
  }

  if (error) {
    throw error;
  }

  if (!artists || artists.length === 0) {
    return <p>No artwork found.</p>;
  }

  return (
    <section className="carousel-container animate-fade-in group/artists relative mb-12">
      <h2 className="text-primary mb-4 text-2xl tracking-tighter">Artists</h2>
      <Carousel
        opts={{ align: "start", startIndex: 0, skipSnaps: true, loop: false }}
        className="mx-auto"
      >
        <CarouselContent>
          {artists.map((artist) => {
            return (
              artist && (
                <CarouselItem
                  key={artist.id}
                  className="group relative w-fit basis-1/2 select-none md:basis-1/3 lg:basis-1/4"
                >
                  <Image
                    src={artist.image.url}
                    alt={
                      artist.image.alt ??
                      `Portrait of the artist ${artist.name}`
                    }
                    width="1920"
                    height="1080"
                    className="carousel-item"
                  />
                  <div className="bg-foreground/75 text-background absolute bottom-0 left-0 flex h-14 w-full items-center justify-center rounded-sm opacity-0 transition-opacity duration-150 ease-in select-none group-hover:opacity-100">
                    <p className="text-lg tracking-wide">{artist.name}</p>
                  </div>
                </CarouselItem>
              )
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          variant="outline"
          className="group/artists animate-fade-in absolute left-1 md:left-2 lg:hidden lg:group-hover/artists:flex"
        />
        <CarouselNext
          variant="outline"
          className="group/artists animate-fade-in absolute right-1 md:right-2 lg:hidden lg:group-hover/artists:flex"
        />
      </Carousel>
    </section>
  );
}
