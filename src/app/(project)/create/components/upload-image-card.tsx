import { Button, buttonVariants } from "@/components/ui/button";
import { Cross1Icon, FilePlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function UploadImageCard({
  index,
  files,
  setFiles,
}: {
  index: number;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) {
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files) return;

    setFiles((prev) =>
      prev
        .filter((file) => file.name !== e.target.files![0].name)
        .concat(e.target.files![0])
    );
    setImagePreview(URL.createObjectURL(e.target.files![0]));
  };

  const handleDeleteImage = () => {
    // console.log("delete image", { index, file: files[index] });
    // setImagePreview("");
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // console.log({ index, imagePreview });
  return (
    <label
      htmlFor={`image-${index}`}
      className="border p-5 flex items-center justify-center border-dashed aspect-video rounded-lg w-full relative group cursor-pointer hover:bg-muted/90 transition-colors overflow-hidden"
    >
      <div
        className={`flex flex-col items-center justify-center gap-2.5 ${
          imagePreview ? "opacity-0" : ""
        }`}
      >
        <FilePlusIcon className="w-20 h-20 text-muted group-hover:text-foreground/50 transition-colors" />

        <input
          onChange={handleChange}
          id={`image-${index}`}
          type="file"
          className="hidden"
        />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          !imagePreview ? "opacity-0" : "opacity-100"
        } transition-opacity
        }`}
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="image preview"
            fill
            className="object-contain w-full h-full z-10 group-hover:opacity-50 transition-opacity"
          />
        ) : null}
        <div className="flex gap-2.5 absolute top-0 right-0 m-2.5">
          <Button
            variant="secondary"
            onClick={handleDeleteImage}
            type="button"
            className="z-20 rounded-full"
            size={"icon"}
          >
            <Cross1Icon className="w-5 h-5" />
          </Button>
          <label
            htmlFor={`image-${index}`}
            className={buttonVariants({
              variant: "secondary",
              size: "icon",
              className: "z-20 !rounded-full cursor-pointer",
            })}
            // type="button"
            // variant="secondary"
            // className="z-20 rounded-full"
            // size={"icon"}
          >
            <UpdateIcon className="w-5 h-5" />
          </label>
        </div>
      </div>
    </label>
  );
}
