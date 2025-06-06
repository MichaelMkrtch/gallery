"use client";

import { useEffect, useState } from "react";

import { useCheckout } from "@/hooks/useCheckout";
import { useBagStore } from "@/store/bag-store";

import { BagIcon } from "../icons/BagIcon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import BagItem from "./bag-item";

export default function Bag() {
  const [drawerDirection, setDrawerDirection] = useState<"right" | "bottom">(
    "right",
  );
  const [isHydrated, setIsHydrated] = useState(false);

  const items = useBagStore.use.items();
  const getItemCount = useBagStore.use.getItemCount();
  const getTotalPriceFormatted = useBagStore.use.getTotalPriceFormatted();
  const clearBag = useBagStore.use.clearBag();

  const { proceedToCheckout, isLoading: isCheckoutLoading } = useCheckout();

  const itemCount = getItemCount();
  const totalPrice = getTotalPriceFormatted();

  useEffect(() => {
    useBagStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setDrawerDirection(window.innerWidth < 768 ? "bottom" : "right");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isHydrated) {
    return (
      <Drawer direction={drawerDirection}>
        <DrawerTrigger asChild>
          <button className="focus-visible:primary relative cursor-pointer rounded-full border border-neutral-200 p-2 text-neutral-500 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-colors duration-150 hover:bg-neutral-100 active:shadow-none active:inset-shadow-xs">
            <BagIcon classes="size-5 active:translate-y-px" />
          </button>
        </DrawerTrigger>
        <DrawerContent
          className={
            drawerDirection === "right" ? "ml-auto h-full w-full max-w-md" : ""
          }
        >
          <div
            className={`mx-auto size-full ${drawerDirection === "right" ? "max-w-none" : "max-w-md"}`}
          >
            <DrawerHeader>
              <DrawerTitle>Bag</DrawerTitle>
              <DrawerDescription className="sr-only">
                View the artwork in your bag.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="animate-pulse">
                  <BagIcon classes="size-12 text-neutral-300" />
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  const renderEmptyBag = () => (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <BagIcon classes="size-12 text-neutral-300 mb-4" />
      <h3 className="mb-2 text-lg font-medium">Your bag is empty</h3>
      <p className="mb-6 text-neutral-500">
        Discover unique artwork and add pieces to your collection.
      </p>
      <DrawerClose asChild>
        <button className="bg-background inline-flex h-9 cursor-pointer items-center rounded-md border border-neutral-200 px-4 py-2 text-sm shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-all hover:bg-neutral-100 active:inset-shadow-sm">
          <span className="active:translate-y-px">Continue Browsing</span>
        </button>
      </DrawerClose>
    </div>
  );

  const renderBagItems = () => (
    <div className="space-y-4">
      {items.map((item) => (
        <BagItem key={item.id} item={item} />
      ))}
    </div>
  );

  const renderBagFooter = () => {
    if (itemCount === 0) return null;

    return (
      <DrawerFooter className="border-t border-neutral-200">
        <div className="mb-4 flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="font-medium">{totalPrice}</span>
        </div>
        <Button
          className="text-background rounded-md bg-sky-800 font-medium hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={proceedToCheckout}
          disabled={isCheckoutLoading}
        >
          {isCheckoutLoading ? "Processing..." : "Checkout"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" disabled={isCheckoutLoading}>
            Continue Browsing
          </Button>
        </DrawerClose>
      </DrawerFooter>
    );
  };

  return (
    <Drawer direction={drawerDirection}>
      <DrawerTrigger asChild>
        <button
          className="focus-visible:primary relative cursor-pointer rounded-full border border-neutral-200 p-2 text-neutral-500 shadow-2xs shadow-neutral-300 inset-shadow-neutral-300 transition-colors duration-150 hover:bg-neutral-100 active:shadow-none active:inset-shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isCheckoutLoading}
        >
          <BagIcon classes="size-5 active:translate-y-px" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-700 text-xs font-medium text-white">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </button>
      </DrawerTrigger>

      <DrawerContent
        className={
          drawerDirection === "right" ? "ml-auto h-full w-full max-w-md" : ""
        }
      >
        <div
          className={`mx-auto size-full ${drawerDirection === "right" ? "max-w-none" : "max-w-md"}`}
        >
          <DrawerHeader className="flex flex-row items-center justify-between">
            <div>
              <DrawerTitle>
                {itemCount === 0 ? (
                  "Bag"
                ) : (
                  <span className="flex items-center gap-2">
                    Bag
                    <span className="bg-foreground size-[3px] rounded-full" />
                    {itemCount}
                  </span>
                )}
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                View the artwork in your bag.
              </DrawerDescription>
            </div>
            {itemCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearBag}
                className="text-neutral-500 hover:text-neutral-700"
                disabled={isCheckoutLoading}
              >
                Clear all
              </Button>
            )}
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4">
            {itemCount === 0 ? renderEmptyBag() : renderBagItems()}
          </div>

          {renderBagFooter()}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
