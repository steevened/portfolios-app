"use client";
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
import { UploadProjectForm } from "./upload-project-form";
import { Technology } from "@prisma/client";
import { ScrollArea } from "./ui/scroll-area";

export default function UploadDialog({
  technologies,
}: {
  technologies: Technology[];
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
        <Button variant={"ghost"} className="rounded-full aspect-square p-0">
          <UploadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md @container">
        <ScrollArea className="h-full max-h-[80svh]">
          <div className="px-1">
            <DialogHeader>
              <DialogTitle>Upload project</DialogTitle>
              <DialogDescription>
                Click on the button below to upload your project
              </DialogDescription>
            </DialogHeader>
            {step === 1 ? (
              <UploadProjectForm
                technologies={technologies}
                onContinue={() => {
                  setStep(2);
                }}
              />
            ) : (
              <div>step 2</div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
