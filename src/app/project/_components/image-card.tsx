import Image from "next/image";
import ImageCardContainer from "./image-card-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";

export default function ImageCard({ url }: { url: string }) {
  return (
    <ImageCardContainer>
      <>
        <Image
          src={url}
          alt="image preview"
          fill
          className="object-contain w-full h-full z-10"
        />
        <div className="flex gap-2.5 absolute top-0 right-0 m-2.5">
          <Button
            variant="secondary"
            // onClick={handleDeleteImage}
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
              //   onChange={handleChangeImage}
            />
          </label>
        </div>
      </>
    </ImageCardContainer>
  );
}
