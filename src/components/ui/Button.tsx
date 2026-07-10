import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "pill";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary-blue text-white hover:bg-blue-600": variant === "primary",
            "bg-primary-soft text-primary-blue hover:bg-blue-100": variant === "secondary",
            "border border-slate-200 bg-transparent hover:bg-slate-100": variant === "outline",
            "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md": variant === "pill",
            "hover:bg-slate-100 text-slate-600": variant === "ghost",
            "h-11 px-8": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-12 px-10 text-base": size === "lg",
            "h-11 w-11": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
