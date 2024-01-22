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
import EditButton from "@/components/atoms/edit-button";

export default function EditProfileModal({
  user,
}: {
  user: Awaited<ReturnType<typeof getUserById>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditButton />
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
