import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ImageCardContainer from "./image-card-container";

export default function UploadImageCard({
  files,
  setFiles,
  file,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  file: File;
}) {
  const { toast } = useToast();

  const handleDeleteImage = () => {
    setFiles((prev) => prev.filter((item) => item.name !== file.name));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    if (files.some((file) => file.name === e.target.files![0].name)) {
      return toast({
        variant: "destructive",
        title: "Error!",
        description: "You have already uploaded this image",
      });
    }

    setFiles((prev) =>
      prev.map((item) => {
        if (item.name === file.name) {
          return e.target.files![0];
        }
        return item;
      })
    );
  };

  return (
    <ImageCardContainer>
      <>
        <Image
          src={URL.createObjectURL(file)}
          alt="image preview"
          fill
          className="object-contain w-full h-full z-10 "
        />

        <div className="flex gap-2.5 absolute top-0 right-0 m-2.5">
          <Button
            variant="secondary"
            onClick={handleDeleteImage}
            type="button"
            className="z-20 rounded-full  hover:!text-red-800 hover:!bg-red-300/80 !shadow-md hover:!shadow-lg transition-all"
            size={"icon"}
          >
            <Cross1Icon className="w-5 h-5" />
          </Button>
          <label
            // htmlFor="upload-image"
            className={buttonVariants({
              variant: "secondary",
              size: "icon",
              className:
                "z-20 !rounded-full cursor-pointer hover:!text-green-800 hover:!bg-green-300/80 !shadow-md hover:!shadow-lg transition-all",
            })}
          >
            <UpdateIcon className="w-5 h-5" />
            <input
              type="file"
              className="hidden"
              onChange={handleChangeImage}
            />
          </label>
        </div>
      </>
    </ImageCardContainer>
  );
}
