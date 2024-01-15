import { getUserById } from "@/lib/services/user.service";
import Image from "next/image";
import EditAvatar from "./edit-avatar";

export default function EditProfileForm({
  user,
}: {
  user: Awaited<ReturnType<typeof getUserById>>;
}) {
  return (
    <div>
      <div className="w-full @sm:w-min flex @sm:flex-col gap-2.5 @sm:items-start justify-center items-center  py-2.5 @sm:py-0 ">
        <div className="aspect-square w-20 @sm:w-28">
          {user?.image ? (
            <Image
              width={100}
              height={100}
              className="w-full h-full object-contain rounded-full"
              src={user?.image}
              alt={user?.name + "profile image" ?? ""}
            />
          ) : (
            <div></div>
          )}
        </div>

        {user ? <EditAvatar userId={user.id} /> : null}
      </div>
    </div>
  );
}
