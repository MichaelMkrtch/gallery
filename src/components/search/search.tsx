"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SearchForm from "./search-form";
import SearchResults from "./search-results";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="focus-visible:outline-primary ml-auto w-fit cursor-pointer rounded-full border border-neutral-200 p-2 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-colors duration-150 hover:bg-neutral-100 active:shadow-none active:inset-shadow-xs">
          <SearchIcon
            size="20"
            className="text-neutral-500 active:translate-y-px"
          />
        </button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search across our gallery by artist or artwork.
          </DialogDescription>
        </DialogHeader>

        {/* <SearchForm /> */}
        {/* <SearchResults
          results={results}
          loading={loading}
          error={error}
          searchTerm={currentSearchTerm}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
