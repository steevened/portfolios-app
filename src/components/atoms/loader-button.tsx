import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import Loader from "./loader";

interface Props extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function LoaderButton({ ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(
        "flex items-center justify-center w-32",
        props.isLoading ? "" : "",
        props.className
      )}
    >
      {props.isLoading ? <Loader /> : props.children}
    </Button>
  );
}
