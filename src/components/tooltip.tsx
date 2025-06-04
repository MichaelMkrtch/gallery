"use client";

import type { ReactElement, ReactNode } from "react";

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as TooltipUI,
} from "@/components/ui/tooltip-ui";

type TooltipProps = {
  side: "top" | "right" | "bottom" | "left" | undefined;
  sideOffset: number;
  content: string | ReactElement;
  isEnabled?: boolean;
  classes?: string;
  children: ReactNode;
};

export default function Tooltip({
  side,
  sideOffset,
  content,
  isEnabled,
  classes,
  children,
}: TooltipProps) {
  return (
    <TooltipUI open={isEnabled}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        className={`${classes} slide-in-from-bottom-2`}
      >
        <div className="text-[13px] tracking-wide">{content}</div>
      </TooltipContent>
    </TooltipUI>
  );
}
