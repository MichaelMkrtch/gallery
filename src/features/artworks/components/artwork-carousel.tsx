import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CarouselThumbnail from "./carousel-thumbnail";

type ArtworkCarouselProps = {
  images: {
    id: string | null | undefined;
    url: string;
    altText: string | null | undefined;
    width: number | null | undefined;
    height: number | null | undefined;
  }[];
};

export default function ArtworkCarousel({ images }: ArtworkCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) return;

    const update = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    update();

    carouselApi.on("select", update).on("reInit", update);
  }, [carouselApi]);

  return (
    <div className="flex">
      <div className="mr-2 flex min-w-32 flex-col items-center justify-start gap-2">
        {images.map((_, index) => (
          <CarouselThumbnail
            key={index}
            images={images}
            selected={index === currentSlide}
            index={index}
            onClick={() => {
              setCurrentSlide(index);
              carouselApi?.scrollTo(index);
            }}
          />
        ))}
      </div>

      <Carousel
        setApi={setCarouselApi}
        className="aspect-[5/4] max-w-[620px] grow"
      >
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={image.id ?? index}>
                <div className="bg-neutral-200/60">
                  <Image
                    src={image.url}
                    alt={image.altText ?? `Artwork image ${index + 1}`}
                    width="1920"
                    height="1080"
                    className="carousel-item aspect-[5/4] object-contain"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
