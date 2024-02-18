import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProjectImage } from "@/lib/actions";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import ImageCardContainer from "./image-card-container";

export default function ImageCard({ url, id }: { url: string; id: string }) {
  const handlConfirmDelete = async () => {
    await deleteProjectImage(id);
  };

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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                // onClick={handleDeleteImage}
                type="button"
                className="z-20 rounded-full  hover:!text-red-800 hover:!bg-red-300/80 !shadow-md hover:!shadow-lg transition-all"
                size={"icon"}
              >
                <Cross1Icon className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`You can't undo this action.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlConfirmDelete}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </>
    </ImageCardContainer>
  );
}
