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
import { useSearch } from "@/hooks/useSearch";

import SearchForm from "./search-form";
import SearchResults from "./search-results";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [liveSearchTerm, setLiveSearchTerm] = useState("");

  const { results, loading, error, currentSearchTerm } =
    useSearch(liveSearchTerm);

  function handleOpenChange(open: boolean) {
    setIsDialogOpen(open);

    if (!open) {
      setLiveSearchTerm("");
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="focus-visible:outline-primary ml-auto w-fit cursor-pointer rounded-full border border-neutral-200 p-2 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 active:shadow-none active:inset-shadow-xs">
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

        <SearchForm setLiveSearchTerm={setLiveSearchTerm} />
        <SearchResults
          results={results}
          loading={loading}
          error={error}
          searchTerm={currentSearchTerm}
        />
      </DialogContent>
    </Dialog>
  );
}
