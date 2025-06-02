import Image from "next/image";

type CarouselThumbnailProps = {
  images?: {
    id: string | null | undefined;
    url: string;
    altText: string | null | undefined;
    width: number | null | undefined;
    height: number | null | undefined;
  }[];
  selected: boolean;
  index: number;
  onClick: () => void;
};

export default function CarouselThumbnail({
  images,
  selected,
  index,
  onClick,
}: CarouselThumbnailProps) {
  if (!images || images.length === 0) {
    return;
  }

  return (
    <div
      className={`${selected ? "border-primary" : "border-neutral-200"} rounded-lg border-2 p-2 shadow-xs`}
    >
      <Image
        src={images[index].url}
        alt={images[index].altText ?? ""}
        width={images[index].width ?? "1920"}
        height={images[index].height ?? "1080"}
        onClick={onClick}
        className="aspect-[5/4] size-24 rounded-md"
      />
    </div>
  );
}
