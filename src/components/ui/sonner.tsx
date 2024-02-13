"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-md",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-muted-foreground",
          closeButton:
            "group-[.toast]:bg-background group-[.toast]:border-border group-[.toast]:text-muted-foreground group-[.toast]:hover:!bg-background group-[.toast]:hover:!border-border",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
