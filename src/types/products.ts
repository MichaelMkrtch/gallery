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
  artist?: string | null;
  genre?: string | null;
  createdAt: string;
};

export type RawGraphQLProductNode = {
  __typename?: "Product";
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    __typename?: "ImageConnection";
    edges: Array<{
      __typename?: "ImageEdge";
      node: {
        __typename?: "Image";
        id?: string | null;

        url: string;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      };
    } | null>;
  };
  priceRange: {
    __typename?: "ProductPriceRange";
    minVariantPrice: {
      __typename?: "MoneyV2";
      amount: string;
      currencyCode: CurrencyCode;
    };
  };
  createdAt: string;
  artist?: {
    __typename?: "Metafield";
    value?: string | null;
    type?: string;
  } | null;
  genre?: {
    __typename?: "Metafield";
    value?: string | null;
    type?: string;
  } | null;
};
