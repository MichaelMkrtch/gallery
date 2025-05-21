"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const imageLinks = [
  "/test-images/gallery-1.jpg",
  "/test-images/gallery-2.jpg",
  "/test-images/gallery-3.jpg",
  "/test-images/gallery-4.jpg",
];

export default function OverviewCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [_scrollSnaps, setScrollSnaps] = useState<number[]>();

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: true,
    }),
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrentSlide(carouselApi.selectedScrollSnap());

    function onSelect() {
      setCurrentSlide(carouselApi!.selectedScrollSnap());
    }

    carouselApi.on("select", onSelect);

    carouselApi.on("reInit", () => {
      setScrollSnaps(carouselApi.scrollSnapList());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", () => {
        setScrollSnaps(carouselApi.scrollSnapList());
        setCurrentSlide(carouselApi.selectedScrollSnap());
      });
    };
  }, [carouselApi]);

  return (
    <div className="carousel-container group/overview relative">
      <Carousel
        setApi={setCarouselApi}
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="mx-auto w-full max-w-[90%]"
      >
        <CarouselContent>
          {imageLinks.map((link) => {
            return (
              <CarouselItem key={link}>
                <Image
                  src={link}
                  alt="demo image"
                  width="1920"
                  height="1080"
                  className="carousel-item rounded-md"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          api={carouselApi}
          className="animate-fade-in hidden group-hover/overview:flex"
        />
        <CarouselNext
          api={carouselApi}
          className="animate-fade-in hidden group-hover/overview:flex"
        />

        <div className="z-50 mt-4 flex justify-center gap-1.5">
          {carouselApi?.scrollSnapList().map((_, index) => (
            <div
              key={index}
              className={`${currentSlide === index ? "border-primary" : "border-foreground/15"} bg-background top-0 h-4 w-4 rounded-full border-3`}
              onClick={() => {
                carouselApi.scrollTo(index);
                carouselApi.plugins().autoplay.reset();
              }}
            ></div>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
