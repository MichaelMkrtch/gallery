import { CurrencyCode } from "@/graphql/generated/graphql";

export type Product = {
  cursor: string;
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    id: string | null | undefined;
    url: string;
    altText: string | null | undefined;
    width: number | null | undefined;
    height: number | null | undefined;
  }[];
  price: string;
  currencyCode: CurrencyCode;
  artist: string | undefined;
  genre: string | undefined;
};
