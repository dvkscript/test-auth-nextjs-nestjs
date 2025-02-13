import * as React from "react"

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  size?: "sm" | "md" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "md", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          size === "md" && "h-10",
          size === "sm" && "h-9",
          size === "lg" && "h-11",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input };
export type { InputProps };