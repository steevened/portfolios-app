"use client";

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
import { upsertAvatar } from "@/lib/actions";

import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { FormEvent } from "react";

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

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      console.log("file", file);
      // await upsertAvatar(file);
    } catch (error) {
      throw error;
    }

    // avatarMutation.mutate(file, {
    //   onSuccess: () => {
    //     onOpenChange(false);
    //     toast({
    //       title: "Success!",
    //       description: `Your avatar has been ${
    //         action === "update" ? "updated" : "uploaded"
    //       } successfully!`,
    //     });
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //     toast({
    //       title: "Error",
    //       description: "Something went wrong, please try again later.",
    //     });
    //   },
    // });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleConfirm}>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className=" sm:w-32" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            {file ? (
              <Button
                // onClick={handleConfirm}
                className="max-sm:w-full"
                // disabled={avatarMutation.status === "pending"}
                // isLoading={avatarMutation.status === "pending"}
              >
                Save
              </Button>
            ) : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
