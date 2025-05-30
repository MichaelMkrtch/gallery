"use client";

import type { Product } from "@/types/products";

import Image from "next/image";

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

          return (
            <div key={product.cursor} className="group hover:cursor-pointer">
              <div className="flex aspect-[5/4] w-full flex-col items-center justify-center rounded bg-neutral-100 p-6 shadow-xs select-none">
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? ""}
                  width={mainImage.width ?? "1920"}
                  height={mainImage.height ?? "1080"}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="mt-5 flex flex-col">
                <h3 className="text-lg">{product.title}</h3>

                <span className="font-normal">
                  {product.artist} | PRODUCT TYPE
                </span>

                <div className="my-1 flex items-center justify-start gap-1 font-normal">
                  <span>{price}</span>
                  <span>{product.currencyCode}</span>
                </div>

                <div className="flex w-fit items-center gap-1 text-blue-900 duration-100 ease-in hover:text-blue-700">
                  <BagIcon classes="size-5" />
                  <span>Add to bag</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
