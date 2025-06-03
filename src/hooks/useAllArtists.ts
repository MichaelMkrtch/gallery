import type {
  GetAllArtistsQuery,
  GetAllArtistsQueryVariables,
} from "@/graphql/generated/graphql";

import { GetAllArtistsDocument } from "@/graphql/generated/graphql";
import { formatArtist } from "@/lib/utils";

import { useQuery } from "@apollo/client";

export function useAllArtists(artistCount?: number) {
  const { loading, error, data } = useQuery<
    GetAllArtistsQuery,
    GetAllArtistsQueryVariables
  >(GetAllArtistsDocument, {
    variables: { blogHandle: "artist", first: artistCount },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error("all artists hook error:", JSON.stringify(error, null, 2));
  }

  const artists = data?.blog?.articles.edges;

  if (!artists) {
    return {
      artists: null,
      loading: loading && !data,
      error,
    };
  }

  const formattedArtists = artists.map((artist) => {
    return formatArtist(artist.node);
  });

  return {
    artists: formattedArtists,
    loading: loading && !data,
    error,
  };
}
