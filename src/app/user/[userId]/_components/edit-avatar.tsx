"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import UploadAvatarPreview from "./upload-avatar-preview";

export default function EditAvatar({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className="grid gap-2 @sm:grid-cols-2">
        <label
          className={buttonVariants({
            size: "sm",
            className: "cursor-pointer",
            variant: "outline",
          })}
        >
          <input
            onChange={handleFileChange}
            type="file"
            className="hidden"
            accept="image/*"
          />
          Edit
        </label>
        <Button size={"sm"} variant={"outline"}>
          Remove
        </Button>
      </div>
      <UploadAvatarPreview
        userId={userId}
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={file}
      />
    </>
  );
}
