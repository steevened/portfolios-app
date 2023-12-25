"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import UploadImageCard from "../../components/upload-image-card";

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
        {Array.from({
          length: files.length + 1,
        }).map((_, index) => (
          <li
            key={index}
            className={`${index === 5 ? "hidden" : ""}
          }`}
          >
            <UploadImageCard files={files} index={index} setFiles={setFiles} />
          </li>
        ))}
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
