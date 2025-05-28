// import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const artists = [
  "Artist 1",
  "Artist 2",
  "Artist 3",
  "Artist 4",
  "Artist 5",
  "Artist 6",
  "Artist 7",
  "Artist 8",
];

export default function ArtistsCarousel() {
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
              <CarouselItem
                key={artist}
                className="w-fit basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                {/* <Image
                  src={artist}
                  alt="demo image"
                  width="1920"
                  height="1080"
                  className="carousel-item"
                /> */}
                <div className="flex aspect-[3/4] items-center justify-center rounded-md bg-neutral-200 select-none">
                  <p>{artist}</p>
                </div>
              </CarouselItem>
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
