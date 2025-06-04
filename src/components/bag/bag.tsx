import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BagIcon } from "../icons/BagIcon";

export default function Bag() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="focus-visible:primary cursor-pointer rounded-full border border-neutral-200 p-2 text-neutral-500 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-colors duration-150 hover:bg-neutral-100 active:shadow-none active:inset-shadow-xs">
          <BagIcon classes="size-5 active:translate-y-px" />
        </button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="h-[350px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Bag</DialogTitle>
          <DialogDescription>
            View the artwork saved to your bag.
          </DialogDescription>
        </DialogHeader>

        <div>Hi</div>
      </DialogContent>
    </Dialog>
  );
}
