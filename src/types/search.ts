interface ShopifyImageNode {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

// --- Formatted Node Types (Refined) ---

/**
 * Represents a Product node after transformations.
 */
export interface FormattedProductNode {
  __typename: "Product";
  id: string;
  title: string;
  handle: string;
  images: ShopifyImageNode[];
  artist?: string | null;
}

/**
 * Represents an Article node after transformation.
 */
export interface FormattedArticleNode {
  __typename: "Article";
  id: string;
  title: string;
  handle: string;
  image?: ShopifyImageNode | null;
}

/**
 * A discriminated union for the items within the formattedResults array.
 */
export type FormattedResultItem =
  | FormattedProductNode
  | undefined
  | FormattedArticleNode;

/**
 * The type for the `formattedResults` array variable.
 */
export type FormattedSearchResultsType = FormattedResultItem[] | undefined;
