"use client";
import { getProjectUnpublished } from "@/lib/services/projects.service";
import { Technology } from "@prisma/client";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { UploadGalleryForm } from "./upload-gallery-form";
import { UploadProjectForm } from "./upload-project-form";

export default function UploadDialog({
  technologies,
  projectUnpublished,
}: {
  technologies: Technology[];
  projectUnpublished: Awaited<ReturnType<typeof getProjectUnpublished>>;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => {
      setStep(1);
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSetIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon">
          <UploadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md @container">
        <ScrollArea className="h-full max-h-[80svh]">
          <div className="p-4">
            <DialogHeader>
              <DialogTitle>Upload project</DialogTitle>
              <DialogDescription className="max-sm:text-sm">
                Click on the button below to upload your project
              </DialogDescription>
            </DialogHeader>
            {step === 1 ? (
              <UploadProjectForm
                technologies={technologies}
                projectUnpublished={projectUnpublished}
                onContinue={() => {
                  setStep(2);
                }}
              />
            ) : (
              <>
                {projectUnpublished && projectUnpublished.id ? (
                  <UploadGalleryForm
                    projectId={projectUnpublished.id}
                    setStep={setStep}
                    onContinue={() => setIsOpen(false)}
                  />
                ) : null}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
