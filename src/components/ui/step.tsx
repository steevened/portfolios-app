import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stepVariants = cva(
  "inline-flex items-center rounded-lg  p-2 focus:outline-none focus:ring-2 text-sm font-medium focus:ring-ring focus:ring-offset-2 ",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        saved: "bg-blue-100 text-blue-500",
        completed: "bg-green-100 text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StepProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepVariants> {}

function Step({ className, variant, ...props }: StepProps) {
  return (
    <div className={cn(stepVariants({ variant }), className)} {...props} />
  );
}
export { Step, stepVariants };
