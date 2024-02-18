import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function SettingsButton({
  text,
  buttonProps,
}: {
  text?: string;
  buttonProps?: ButtonProps;
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
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.9 18.45c1.35 0 2.45-1.1 2.45-2.45s-1.1-2.45-2.45-2.45c-1.36 0-2.45 1.1-2.45 2.45s1.09 2.45 2.45 2.45m5.2-1.77l1.48 1.16c.13.11.17.29.08.45l-1.4 2.42a.35.35 0 0 1-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.27 1.85c-.02.17-.17.3-.34.3h-2.8c-.18 0-.32-.13-.35-.3l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.75.7c-.15.06-.34 0-.42-.15l-1.4-2.42a.351.351 0 0 1 .08-.45l1.48-1.16l-.05-.68l.05-.69l-1.48-1.15a.353.353 0 0 1-.08-.45l1.4-2.42c.08-.16.27-.22.42-.16l1.75.71c.36-.28.75-.52 1.18-.69l.26-1.86c.03-.16.17-.29.35-.29h2.8c.17 0 .32.13.34.29l.27 1.86c.42.17.82.41 1.18.69l1.74-.71c.17-.06.34 0 .43.16l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.15l.05.69zM6.69 8.07c.87 0 1.57-.7 1.57-1.57c0-.87-.7-1.58-1.57-1.58A1.58 1.58 0 0 0 5.11 6.5c0 .87.71 1.57 1.58 1.57m3.34-1.13l.97.74c.07.07.09.19.03.29l-.9 1.56c-.05.1-.17.14-.27.1l-1.12-.45l-.74.44l-.19 1.19c-.02.11-.11.19-.22.19h-1.8c-.12 0-.21-.08-.23-.19L5.4 9.62l-.76-.44l-1.14.45c-.09.04-.2 0-.26-.1l-.9-1.56c-.06-.1-.03-.22.05-.29l.95-.74l-.03-.44l.03-.44l-.95-.74a.229.229 0 0 1-.05-.29l.9-1.56c.06-.1.17-.14.26-.1l1.13.45l.77-.44l.16-1.19c.02-.11.11-.19.23-.19h1.8c.11 0 .2.08.22.19L8 3.38l.74.44l1.12-.45c.1-.04.22 0 .27.1l.9 1.56c.06.1.04.22-.03.29l-.97.74l.03.44z"
              ></path>
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text ?? "Settings"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
