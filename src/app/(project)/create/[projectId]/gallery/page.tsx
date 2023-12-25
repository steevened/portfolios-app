"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import UploadImageCard from "../../components/upload-image-card";
import { FilePlusIcon } from "@radix-ui/react-icons";

export default function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const { toast } = useToast();

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    if (files.length >= 5) return;

    if (files.some((file) => file.name === e.target.files![0].name)) {
      return toast({
        variant: "destructive",
        title: "Error!",
        description: "You have already uploaded this image",
      });
    }

    setFiles((prev) => prev.concat(e.target.files![0]));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.set("file", file);
      });

      await fetch(
        `/api/projects/${params.projectId}/gallery?skip=${!!!files.length}`,
        {
          method: "POST",
          body: formData,
        }
      );

      router.push("/");
      return toast({
        variant: "default",
        title: "Success!",
        description: "Your project has been successfully uploaded",
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong, please try again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="@container space-y-5">
      <ul
        className={`grid ${
          files.length > 0 ? "grid-cols-1 @xl:grid-cols-2" : "grid-cols-1"
        }  gap-2.5 `}
      >
        {files.map((file, index) => (
          <li
            key={index}
            className={`${index === 5 ? "hidden" : ""}
          }`}
          >
            <UploadImageCard file={file} index={index} setFiles={setFiles} />
          </li>
        ))}
        <li className={`${files.length >= 5 ? "hidden" : ""}`}>
          <label className="border p-5 flex items-center justify-center border-dashed aspect-video rounded-lg w-full relative group cursor-pointer hover:bg-muted/90 transition-colors overflow-hidden">
            <FilePlusIcon className="w-20 h-20 text-muted-foreground group-hover:text-muted-foreground/50 transition-colors" />
            <input
              // id="upload-image"
              onChange={handleAddImage}
              type="file"
              className="hidden"
            />
          </label>
        </li>
      </ul>

      <div className="flex gap-x-1.5">
        <Button onClick={() => router.back()} type="button" variant={"outline"}>
          Back
        </Button>
        <Button onClick={() => setFiles([])} variant={"outline"}>
          Omit
        </Button>
        <Button disabled={files.length <= 0}>Post</Button>
      </div>
    </form>
  );
}
