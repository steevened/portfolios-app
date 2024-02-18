"use client";

import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import UploadAvatarPreview from "./upload-avatar-preview";

export default function UpdateProfileImage({
  userId,
  action,
}: {
  userId: string;
  action: "upload" | "update";
}) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <label
        className={cn(
          buttonVariants({
            // variant: "",
            className: "cursor-pointer",
          })
        )}
      >
        <input
          onChange={handleFileChange}
          type="file"
          className="hidden"
          accept="image/*"
        />

        {action === "upload" ? "Add profile image" : "Update"}
      </label>
      <UploadAvatarPreview
        action={action}
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={file}
      />
    </>
  );
}
