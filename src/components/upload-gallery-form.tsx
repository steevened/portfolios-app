"use client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const UploadGalleryForm = ({
  setStep,
  projectId,
}: {
  setStep: Dispatch<SetStateAction<1 | 2>>;
  projectId: string;
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("file", file as File);

    const res = await fetch(
      `/api/projects/${projectId}/gallery?skip=${!!!file}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-5 flex items-center justify-center border-dashed aspect-video my-5 mx-auto rounded-lg">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            onChange={(e) => setFile(e.target.files?.[0])}
            id="picture"
            type="file"
          />
        </div>
      </div>
      <DialogFooter className="gap-y-2.5">
        <Button onClick={() => setStep(1)} type="button" variant={"outline"}>
          Back
        </Button>
        <Button onClick={() => setFile(undefined)} variant={"secondary"}>
          Skip
        </Button>
        <Button disabled={!file}>Continue</Button>
      </DialogFooter>
    </form>
  );
};
