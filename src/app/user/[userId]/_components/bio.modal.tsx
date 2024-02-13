"use client";

import AddButton from "@/components/atoms/add-button";
import EditButton from "@/components/atoms/edit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import SubmitBioFormButton from "./submit-bio-form-button";
import { useFormState } from "react-dom";
import { updateBio } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  message: "",
  code: 0,
};

export default function BioModal({
  type,
  bio,
}: {
  type: "create" | "update";
  bio?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "create" ? <AddButton /> : <EditButton />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Add Bio" : "Update Bio"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Tell us about yourself, your experience, interests, hobbies, skills, etc."
              : "Update your bio."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <label htmlFor="bio" className=" block text-muted-foreground">
                <h3>Bio</h3>
              </label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={bio}
                rows={5}
                placeholder="Write something about yourself here."
                className="w-full"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <SubmitBioFormButton className="max-sm:w-full" />
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
