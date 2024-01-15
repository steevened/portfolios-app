import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserById } from "@/lib/services/user.service";
import EditProfileForm from "./edit-profile-form";

export default function EditProfileModal({
  user,
}: {
  user: Awaited<ReturnType<typeof getUserById>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="flex items-center gap-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="@container max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div>
          <EditProfileForm user={user} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
