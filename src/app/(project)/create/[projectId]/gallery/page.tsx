"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FilePlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

export default function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const [files, setFiles] = useState<File[]>([]);

  console.log(files);
  const [file, setFile] = useState<File | undefined>(undefined);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.set("file", file as File);

      await fetch(`/api/projects/${params.projectId}/gallery?skip=${!!!file}`, {
        method: "POST",
        body: formData,
      });

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
    <form onSubmit={handleSubmit} className="@container">
      <ul
        className={`grid ${
          files.length > 0 ? "grid-cols-1 @xl:grid-cols-2" : "grid-cols-1"
        }  gap-2.5 my-5`}
      >
        {Array.from([...files, "_"]).map((_, index) => (
          <li
            key={index}
            className={`${index === 5 ? "hidden" : ""}
          }`}
          >
            <UploadItem index={index} setFiles={setFiles} />
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5">
        <Button onClick={() => router.back()} type="button" variant={"outline"}>
          Back
        </Button>
        <Button onClick={() => setFile(undefined)} variant={"secondary"}>
          Skip
        </Button>
        <Button disabled={!file}>Continue</Button>
      </div>
    </form>
  );
}

const UploadItem = ({
  index,
  setFiles,
}: {
  index: number;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFiles((prev) =>
      prev.filter((_, i) => i !== index).concat(e.target.files![0])
    );
    setImagePreview(URL.createObjectURL(e.target.files![0]));
  };
  return (
    <label
      htmlFor={`image-${index}`}
      className="border p-5 flex items-center justify-center border-dashed aspect-video  mx-auto rounded-lg w-full relative group cursor-pointer hover:bg-muted/90 transition-colors overflow-hidden"
    >
      <div
        className={`flex flex-col items-center justify-center gap-2.5 ${
          imagePreview ? "opacity-0" : ""
        }`}
      >
        <FilePlusIcon className="w-20 h-20 text-muted group-hover:text-foreground/50 transition-colors" />
        <Input
          onChange={handleChange}
          id={`image-${index}`}
          type="file"
          className="cursor-pointer hidden"
        />
      </div>
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center ${
          !imagePreview ? "opacity-0" : "opacity-100"
        } transition-opacity
      }`}
      >
        <Image
          src={imagePreview}
          alt="image preview"
          fill
          className="object-contain w-full h-full z-10 group-hover:opacity-50 transition-opacity"
        />
        <div
          className={`opacity-0 group-hover:opacity-100 transition-opacity bg-muted/90 p-5 rounded-full z-20`}
        >
          <UpdateIcon className="w-10 h-10  " />
        </div>
      </div>
    </label>
  );
};
