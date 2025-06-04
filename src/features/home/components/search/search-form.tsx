"use client";

import type { Dispatch, SetStateAction } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const searchSchema = z.object({
  searchTerm: z.string(),
});

export default function SearchForm({
  setLiveSearchTerm,
}: {
  setLiveSearchTerm: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { searchTerm: "" },
    mode: "onChange",
  });

  async function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  ) {
    const currentValue = event.target.value;
    // RHF's onChange updates internal state to trigger validation
    onChange(event);

    const isValid = await form.trigger("searchTerm");

    if (isValid) {
      setLiveSearchTerm(currentValue);
    } else {
      setLiveSearchTerm("");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Search</FormLabel>
              <FormControl>
                <div className="flex items-center justify-start border-b border-neutral-200">
                  <Search
                    size="20"
                    className="text-neutral-500 active:translate-y-px"
                  />
                  <Input
                    placeholder="Search gallery"
                    autoComplete="off"
                    {...field}
                    onChange={(e) => handleInputChange(e, field.onChange)}
                    className="mx-auto h-10 w-full border-none py-7 text-lg caret-neutral-600 shadow-none ring-0 placeholder:font-medium placeholder:text-neutral-400 focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                Search for artists or artworks. Results will appear as you type.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
