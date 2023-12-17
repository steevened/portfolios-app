"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
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
    <form onSubmit={handleSubmit}>
      <div className="border p-5 flex items-center justify-center border-dashed aspect-video my-5 mx-auto rounded-lg">
        <div className="grid w-full max-w-sm justify-items-start gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            onChange={(e) => setFile(e.target.files?.[0])}
            id="picture"
            type="file"
          />
        </div>
      </div>
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
