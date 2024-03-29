"use client";

import { Button } from "@/components/ui/button";
import { publishProject, publishProjectWithGallery } from "@/lib/actions";
import { uploadImage } from "@/lib/helpers/upload-image";
import { getProjectById } from "@/lib/services";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import ImageCard from "./image-card";
import UploadImageCard from "./upload-image-card";

export default function GalleryForm({
  projectId,
  project,
  action,
}: {
  projectId: string;
  project?: Awaited<ReturnType<typeof getProjectById>>;
  action: "create" | "update";
}) {
  const [files, setFiles] = useState<File[]>([]);
  const initialImages = project?.gallery || [];

  const router = useRouter();

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    if (files.length >= 5) return;

    if (files.some((file) => file.name === e.target.files![0].name)) {
      return toast("Error!", {
        description: "You have already uploaded this image",
      });
    }

    setFiles((prev) => prev.concat(e.target.files![0]));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (files.length === 0) {
        await publishProject(projectId);
        return router.push(`/`);
      }

      const uploadPromises = files.map(async (file) => {
        const imageUploadedPath = await uploadImage(file);

        await publishProjectWithGallery(projectId, imageUploadedPath);
      });

      await Promise.all(uploadPromises);

      router.push(`/`);
    } catch (error) {
      return toast("Error!", {
        description: "Something went wrong, please try again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="@container space-y-5">
      <ul
        className={`grid ${
          initialImages.length + files.length > 0
            ? "grid-cols-1 @xl:grid-cols-2"
            : "grid-cols-1"
        }  gap-2.5 `}
      >
        {initialImages.map((image) => (
          <ImageCard id={image.id} key={image.id} url={image.url} />
        ))}
        {files.map((file, index) => (
          <li
            key={index}
            className={`${index === 5 ? "hidden" : ""}
          }`}
          >
            <UploadImageCard file={file} files={files} setFiles={setFiles} />
          </li>
        ))}
        <li
          className={`${
            initialImages.length + files.length >= 5 ? "hidden" : ""
          }`}
        >
          <label className="border-2 p-5 flex items-center justify-center border-dashed aspect-video rounded-lg w-full relative group cursor-pointer hover:bg-muted/90 transition-colors overflow-hidden">
            <FilePlusIcon className="w-20 h-20 text-muted-foreground group-hover:text-muted-foreground/50 transition-colors" />
            <input
              // id="upload-image"
              onChange={handleAddImage}
              type="file"
              className="hidden"
              multiple
            />
          </label>
        </li>
      </ul>

      <div className="flex gap-x-1.5">
        <Button
          onClick={() => router.back()}
          type="button"
          variant={"secondary"}
        >
          Back
        </Button>

        <Button className="">Upload</Button>
      </div>
    </form>
  );
}
