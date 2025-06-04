import Image from "next/image";
import Link from "next/link";

import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FormattedResultItem,
  FormattedSearchResultsType,
} from "@/types/search";

import { type ApolloError } from "@apollo/client";

type SearchResultsProps = {
  results: FormattedSearchResultsType;
  loading: boolean;
  error: ApolloError | undefined;
  searchTerm: string;
};

function getLink(result: FormattedResultItem) {
  if (result?.__typename === "Product") {
    return `/artworks/${result.handle}`;
  }
  if (result?.__typename === "Article") {
    return `/artists/${result.handle}`;
  }
  return "#";
}

export default function SearchResults({
  results,
  loading,
  error,
  searchTerm,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="bg-background h-[350px] w-full space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[67px] w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    throw error;
  }

  if (!searchTerm) {
    results = [];
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-background w-fulloverflow-auto relative h-[350px]">
        <p className="animate-fade-in absolute top-1/3 right-0 left-0 text-center text-lg text-neutral-500">
          Search for an artist or artwork
        </p>
      </div>
    );
  }

  return (
    results && (
      <div className="bg-background h-[350px] w-full overflow-auto">
        {results.map((result) => {
          if (!result) {
            return;
          }

          const image =
            result.__typename === "Product" ? result.images[0] : result.image;

          return (
            <DialogClose key={result.id} asChild className="w-full">
              <Link
                href={getLink(result)}
                className="animate-fade-in flex w-full cursor-pointer items-center justify-start gap-3 rounded-sm bg-neutral-200/60 pl-2 transition-colors duration-150 outline-none hover:bg-neutral-300/70 md:py-2"
              >
                <Image
                  src={image?.url ?? ""}
                  alt={""}
                  width={1080}
                  height={720}
                  className={`${result.__typename === "Article" ? "grayscale filter" : ""} aspect-[5/4] max-w-16 object-contain select-none`}
                />

                <div>
                  {result.title}

                  {result.__typename === "Product" && (
                    <span className="ml-1 text-base text-neutral-600">
                      by {result.artist}
                    </span>
                  )}
                </div>
              </Link>
            </DialogClose>
          );
        })}
      </div>
    )
  );
}
