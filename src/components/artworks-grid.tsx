"use client";

import type { Product } from "@/types/products";

import Image from "next/image";
import Link from "next/link";

import { formatNumber } from "@/lib/utils";

import { BagIcon } from "./icons/BagIcon";

type ArtworksGridProps = {
  products: Product[];
};

export default function ArtworksGrid({ products }: ArtworksGridProps) {
  return (
    <div className="animate-fade-in mb-8 pb-4">
      <div className="grid place-items-center gap-3 lg:grid-cols-3 lg:gap-4 2xl:gap-5">
        {products.map((product) => {
          const mainImage = product.images[0];
          const price = formatNumber(product.price);
          const dimensions = product.dimensions?.match(/^(.*in )(.+)$/);

          return (
            <div key={product.cursor} className="group hover:cursor-pointer">
              <Link href={`/artworks/${product.handle}`}>
                <div className="flex aspect-[5/4] w-full flex-col items-center justify-center rounded bg-neutral-100 p-6 shadow-xs inset-shadow-sm transition-colors duration-100 ease-in select-none group-hover:bg-neutral-200/50">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText ?? ""}
                    width={mainImage.width ?? "1920"}
                    height={mainImage.height ?? "1080"}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">{product.title}</h3>
                    <div className="flex flex-col items-end justify-center text-sm font-normal tracking-wide">
                      {/* <span>{dimensions && dimensions[1]}</span> */}
                      <span>{dimensions && dimensions[2]}</span>
                    </div>
                  </div>

                  <span className="font-normal tracking-wide">
                    {product.artist}
                  </span>
                  <span className="mt-0.5 text-[15px] font-normal tracking-wide">
                    {product.type} on {product.medium}
                  </span>

                  <div className="my-2 flex items-center justify-start gap-1 font-normal">
                    <span>{price}</span>
                    <span>{product.currencyCode}</span>
                  </div>
                </div>
              </Link>

              <button className="flex w-fit cursor-pointer items-center gap-1 text-blue-900 duration-100 ease-in outline-none hover:text-blue-700">
                <BagIcon classes="size-5" />
                <span>Add to bag</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
