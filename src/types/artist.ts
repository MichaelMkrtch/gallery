export type Artist =
  | {
      __typename?: "Article";
      id: string;
      title: string;
      handle: string;
      contentHtml: string;
      image?: {
        __typename?: "Image";
        url: string;
        altText?: string | null;
      } | null;
    }
  | null
  | undefined;
