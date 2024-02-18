import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function AddButton({
  text,
  buttonProps,
}: {
  buttonProps?: ButtonProps;
  text?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            {...buttonProps}
            size={"icon"}
            variant={"ghost"}
            className={cn(
              "flex items-center gap-1 rounded-full",
              buttonProps?.className
            )}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 15 15"
              strokeWidth={2}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text ?? "Add"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
