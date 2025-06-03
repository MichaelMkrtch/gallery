import type { GetArtistQueryVariables } from "@/graphql/generated/graphql";

import { GetArtistDocument, GetArtistQuery } from "@/graphql/generated/graphql";
import { formatArtist } from "@/lib/utils";

import { useQuery } from "@apollo/client";

export function useArtist(artistHandle: string) {
  const { loading, error, data } = useQuery<
    GetArtistQuery,
    GetArtistQueryVariables
  >(GetArtistDocument, {
    variables: { blogHandle: "artist", articleHandle: artistHandle },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error("artist details hook error:", JSON.stringify(error, null, 2));
  }

  const rawArtist = data?.blog?.articleByHandle;

  const artist = formatArtist(rawArtist);

  return {
    artist,
    loading: loading && !data,
    error,
  };
}
