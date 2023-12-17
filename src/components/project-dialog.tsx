"use client";
import {
  getProjectById,
  getProjectUnpublished,
} from "@/lib/services/projects.service";
import { Technology } from "@prisma/client";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ProjectDetailsForm from "./project-details-form-provider";
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

type Update = {
  type: "update";
  initialProject:
    | Awaited<ReturnType<typeof getProjectById>>
    | Awaited<ReturnType<typeof getProjectUnpublished>>;
};

type Upload = {
  type: "upload";
};

type Props = (Update | Upload) & {
  technologies: Technology[];
};

export default function ProjectDialog({ technologies, type }: Props) {
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
      <DialogContent className="max-w-screen-md @container p-0 gap-0 ">
        <DialogHeader className="p-4">
          <DialogTitle>
            {type === "update" ? "Update project" : "Upload project"}
          </DialogTitle>
          <DialogDescription className="max-sm:text-sm">
            {type === "update"
              ? "Click on the button below to update your project"
              : "Click on the button below to upload your project"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[80svh]">
          <div className="px-4 pb-4">
            {step === 1 ? (
              <ProjectDetailsForm type={"upload"} technologies={technologies} />
            ) : (
              //   <UploadProjectForm
              //     technologies={technologies}
              //     projectUnpublished={initialProject}
              //     onContinue={() => {
              //       setStep(2);
              //     }}
              //   />
              <>
                hi
                {/* {initialProject && initialProject.id ? (
                  <UploadGalleryForm
                    projectId={initialProject.id}
                    setStep={setStep}
                    onContinue={() => setIsOpen(false)}
                  />
                ) : null} */}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
