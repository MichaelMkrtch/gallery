import { createSelectors } from "@/lib/create-selectors";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UrlStoreState = {
  query: {
    [key: string]: string[];
  };
};

type UrlStoreActions = {
  // Set a single key to one or more values (overwrites existing)
  setQuery: (k: string, v: string | string[] | undefined) => void;
  // Toggle a single value in the array of a key
  toggleQueryValue: (k: string, v: string) => void;
  clearAllQueries: () => void;
  // Sync Zustand query with the actual URLSearchParams
  syncQueryFromUrl: (params: URLSearchParams) => void;
};

const useUrlStoreBase = create<UrlStoreState & UrlStoreActions>()(
  persist(
    (set) => ({
      query: {},

      setQuery: (k, v) =>
        set((state) => {
          const newQuery = { ...state.query };

          if (typeof v === "undefined") {
            delete newQuery[k];
          } else if (Array.isArray(v)) {
            newQuery[k] = v;
          } else {
            newQuery[k] = [v];
          }

          return { query: newQuery };
        }),

      toggleQueryValue: (k, v) =>
        set((state) => {
          const current = new Set(state.query[k] ?? []);
          if (current.has(v)) {
            current.delete(v);
          } else {
            current.add(v);
          }
          return {
            query: {
              ...state.query,
              [k]: Array.from(current),
            },
          };
        }),

      clearAllQueries: () => set({ query: {} }),

      syncQueryFromUrl: (params) => {
        const query: Record<string, string[]> = {};
        params.forEach((value, key) => {
          if (!query[key]) query[key] = [];
          query[key].push(value);
        });
        set({ query });
      },
    }),
    {
      name: "url-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useUrlStore = createSelectors(useUrlStoreBase);
