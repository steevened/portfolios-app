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
import { useState } from "react";

export default function BioModal({
  type,
  action,
}: {
  type: "create" | "update";
  action: (formData: FormData) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
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
        <form action={action}>
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <label htmlFor="bio" className=" block text-muted-foreground">
                <h3>Bio</h3>
              </label>
              <Textarea
                id="bio"
                name="bio"
                rows={5}
                placeholder="Write something about yourself here."
                className="w-full"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <div className="flex justify-end">
                <Button type="submit">Save</Button>
              </div>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
