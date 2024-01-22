import LoaderButton from "@/components/atoms/loader-button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

export default function SubmitBioFormButton(buttonProps?: ButtonProps) {
  const { pending, data, method, action } = useFormStatus();

  return (
    <LoaderButton
      {...buttonProps}
      className={cn(buttonProps?.className)}
      isLoading={pending}
      disabled={pending}
      type="submit"
    >
      Save
    </LoaderButton>
  );
}
