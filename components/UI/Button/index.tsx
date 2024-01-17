import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-theme-primary text-theme-primary-fg hover:bg-theme-primary/90",
                destructive:
                    "bg-destructive text-destructive-fg hover:bg-destructive/90",
                outline:
                    "border border-theme-primary-fg text-theme-primary-fg hover:bg-theme-primary-fg/20",
                'outline-secondary':
                    "border border-theme-secondary-fg text-theme-secondary-fg hover:bg-theme-secondary-fg/20",
                secondary:
                    "bg-theme-secondary text-theme-secondary-fg hover:bg-theme-secondary/80",
                ghost:
                    "text-theme-primary-fg hover:bg-theme-primary-fg/20",
                'ghost-secondary':
                    "text-theme-secondary-fg hover:bg-theme-secondary-fg/20",
                link:
                    "text-theme-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2 text-sm",
                sm: "h-9 px-3 text-sm",
                lg: "h-11 px-8 text-base",
                icon: "h-10 w-10 text-sm",
            },
            rounded: {
                default: "rounded-md",
                none: "rounded-none",
                sm: "rounded-sm",
                lg: "rounded-lg",
                xl: "rounded-xl",
                '2xl': "rounded-2xl",
                '3xl': "rounded-3xl",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            rounded: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, rounded, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
