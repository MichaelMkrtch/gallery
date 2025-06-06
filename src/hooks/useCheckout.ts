import { useState } from "react";

import {
  CartCreateDocument,
  CartCreateMutation,
  CartCreateMutationVariables,
  GetProductsForCheckoutDocument,
  GetProductsForCheckoutQuery,
  GetProductsForCheckoutQueryVariables,
} from "@/graphql/generated/graphql";
import { useBagStore } from "@/store/bag-store";

import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "sonner";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const items = useBagStore.use.items();
  const clearBag = useBagStore.use.clearBag();
  const removeItem = useBagStore.use.removeItem();

  const [getProducts] = useLazyQuery<
    GetProductsForCheckoutQuery,
    GetProductsForCheckoutQueryVariables
  >(GetProductsForCheckoutDocument, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [createCartMutation] = useMutation<
    CartCreateMutation,
    CartCreateMutationVariables
  >(CartCreateDocument, {
    errorPolicy: "all",
  });

  const proceedToCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your bag is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Validate products availability
      const productIds = items.map((item) => item.id);
      const gids = productIds.map((id) =>
        id.startsWith("gid://") ? id : `gid://shopify/Product/${id}`,
      );

      const { data: productsData, error: productsError } = await getProducts({
        variables: { ids: gids },
      });

      if (productsError) {
        throw new Error(
          `Failed to validate products: ${productsError.message}`,
        );
      }

      if (!productsData) {
        throw new Error("No product data returned");
      }

      // Filter to only get Product nodes
      const products = productsData.products.filter(
        (node): node is NonNullable<typeof node> & { __typename: "Product" } =>
          node?.__typename === "Product",
      );

      // Check availability and prepare cart lines
      const lines = items.map((bagItem) => {
        const productGid = bagItem.id.startsWith("gid://")
          ? bagItem.id
          : `gid://shopify/Product/${bagItem.id}`;
        const product = products.find((p) => p.id === productGid);

        if (!product) {
          throw new Error(`Product "${bagItem.title}" not found`);
        }

        if (!product.availableForSale) {
          throw new Error(
            `"${bagItem.title}" is no longer available for purchase`,
          );
        }

        const defaultVariant = product.variants.edges[0]?.node;

        if (!defaultVariant) {
          throw new Error(`No variant found for "${bagItem.title}"`);
        }

        if (!defaultVariant.availableForSale) {
          throw new Error(`"${bagItem.title}" is currently unavailable`);
        }

        if (
          defaultVariant.quantityAvailable !== null &&
          defaultVariant.quantityAvailable !== undefined &&
          defaultVariant.quantityAvailable < 1
        ) {
          throw new Error(`"${bagItem.title}" is out of stock`);
        }

        return {
          merchandiseId: defaultVariant.id,
          quantity: 1,
        };
      });

      // Create cart
      const { data: cartData, errors: cartErrors } = await createCartMutation({
        variables: {
          input: { lines },
        },
      });

      if (cartErrors) {
        throw new Error(
          `GraphQL errors: ${cartErrors.map((e) => e.message).join(", ")}`,
        );
      }

      if (!cartData?.cartCreate) {
        throw new Error("Failed to create cart");
      }

      if (cartData.cartCreate.userErrors.length > 0) {
        const errors = cartData.cartCreate.userErrors
          .map((error) => error.message)
          .join(", ");
        throw new Error(`Cart errors: ${errors}`);
      }

      const cart = cartData.cartCreate.cart;

      if (!cart) {
        throw new Error("Cart creation failed");
      }

      // Success: clear bag and redirect
      clearBag();
      toast.success("Redirecting to checkout...");
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        if (
          errorMessage.includes("no longer available") ||
          errorMessage.includes("out of stock") ||
          errorMessage.includes("unavailable")
        ) {
          const productMatch = error.message.match(/"([^"]+)"/);
          const productName = productMatch ? productMatch[1] : null;

          if (productName) {
            const unavailableItem = items.find(
              (item) => item.title === productName,
            );
            if (unavailableItem) {
              removeItem(unavailableItem.id);
              toast.error(
                `"${productName}" is no longer available and has been removed from your bag.`,
              );
            }
          } else {
            toast.error(
              "Some items in your bag are no longer available. Please review your bag.",
            );
          }
        } else if (errorMessage.includes("not found")) {
          toast.error(
            "One or more items in your bag could not be found. Please refresh and try again.",
          );
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to create checkout. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    proceedToCheckout,
    isLoading,
  };
}
