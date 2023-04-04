import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-_darkNavy transition-colors uppercase disabled:pointer-events-none focus:outline-none",
  {
    variants: {
      variant: {
        yellow: "bg-_lightYellow hover:bg-_lightYellowHover",
        blue: "bg-_lightBlue hover:bg-_lightBlueHover",
        silver: "bg-_silver hover:bg-_silverHover",
      },
      size: {
        sm: "headingXs py-4 px-4 rounded-small w-fit",
        lg: "headingSm py-5 rounded-large w-full",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
