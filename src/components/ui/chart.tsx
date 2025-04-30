"use client";

import * as React from "react";
import type { TooltipProps as ChartTooltipProps } from "recharts";

import { cn } from "@/lib/utils";

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-full w-full", className)} {...props} />
));
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  ChartTooltipProps<number, string> & React.ComponentProps<"div">
>(({ active, payload, label, className, ...props }, ref) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}
      {...props}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[0.70rem] text-muted-foreground">
                {item.name}
              </span>
              <span className="font-medium">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1 rounded-lg border bg-background p-2 shadow-sm",
      className
    )}
    {...props}
  />
));
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent };
