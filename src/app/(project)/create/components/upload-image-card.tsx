import { Button, buttonVariants } from "@/components/ui/button";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function UploadImageCard({
  setFiles,
  file,
}: {
  index: number;
  setFiles: Dispatch<SetStateAction<File[]>>;
  file: File;
}) {
  const handleDeleteImage = () => {
    setFiles((prev) => prev.filter((item) => item.name !== file.name));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

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
    <div className="border border-dashed aspect-video rounded-lg w-full relative group cursor-pointer hover:bg-muted/90 transition-colors overflow-hidden">
      <Image
        src={URL.createObjectURL(file)}
        alt="image preview"
        fill
        className="object-contain w-full h-full z-10 group-hover:opacity-50 transition-opacity"
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
              "z-20 !rounded-full cursor-pointer !text-green-800 hover:!bg-green-300/80 !shadow-md hover:!shadow-lg transition-all",
          })}
        >
          <UpdateIcon className="w-5 h-5" />
          <input type="file" className="hidden" onChange={handleChangeImage} />
        </label>
      </div>
    </div>
  );
}
