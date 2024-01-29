import LoaderButton from "@/components/atoms/loader-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { upsertAvatar } from "@/lib/services/profile.service";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UploadAvatarPreview({
  isOpen,
  onOpenChange,
  file,
  action,
}: {
  isOpen: boolean;
  file?: File;
  onOpenChange: (open: boolean) => void;
  action: "upload" | "update";
}) {
  const { toast } = useToast();
  const router = useRouter();

  const avatarMutation = useMutation({
    mutationFn: upsertAvatar,
  });
  const handleConfirm = async () => {
    if (!file) return;
    avatarMutation.mutate(file, {
      onSuccess: () => {
        router.refresh();
        onOpenChange(false);
        toast({
          title: "Success!",
          description: `Your avatar has been ${
            action === "update" ? "updated" : "uploaded"
          } successfully!`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong, please try again later",
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Preview</DialogTitle>
        </DialogHeader>
        {file ? (
          <div className="flex justify-center ">
            <div className="aspect-square w-40 rounded-full border">
              <Image
                src={URL.createObjectURL(file)}
                alt="user avatar preview"
                width={300}
                height={300}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
        ) : null}
        {/* <Image src={imagePreview} alt="user avatar preview" /> */}
        <DialogFooter>
          <DialogClose asChild>
            <Button className=" sm:w-32" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          {file ? (
            <LoaderButton
              onClick={handleConfirm}
              className="max-sm:w-full"
              disabled={avatarMutation.status === "pending"}
              isLoading={avatarMutation.status === "pending"}
            >
              Save
            </LoaderButton>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
