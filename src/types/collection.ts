export type CollectionDiscriminantType =
  | "artist"
  | "category"
  | "genre"
  | "style"
  | undefined;

interface BaseCollectionNode {
  __typename?: "Collection";
  id: string;
  handle: string;
  title: string;
  type: CollectionDiscriminantType;
}

export interface ArtistCollectionNode extends BaseCollectionNode {
  type: "artist";
}

export interface CategoryCollectionNode extends BaseCollectionNode {
  type: "category";
}

export interface GenreCollectionNode extends BaseCollectionNode {
  type: "genre";
}

export interface StyleCollectionNode extends BaseCollectionNode {
  type: "style";
}

export interface OtherCollectionNode extends BaseCollectionNode {
  type: undefined;
}

export type CollectionNode =
  | ArtistCollectionNode
  | CategoryCollectionNode
  | GenreCollectionNode
  | StyleCollectionNode
  | OtherCollectionNode;

type CollectionNodeMap = {
  artist: ArtistCollectionNode;
  category: CategoryCollectionNode;
  genre: GenreCollectionNode;
  style: StyleCollectionNode;
  undefined: OtherCollectionNode;
};

type CollectionType = keyof CollectionNodeMap;

export type CollectionOf<T extends CollectionType> = CollectionNodeMap[T];
