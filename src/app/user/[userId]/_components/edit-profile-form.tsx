import { getUserById } from "@/lib/services/user.service";
import Image from "next/image";
import EditAvatar from "./edit-avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { getServerAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function EditProfileForm({
  user,
}: {
  user: Awaited<ReturnType<typeof getUserById>>;
}) {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col @sm:flex-row gap-5">
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
      <form
        action={async (formData) => {
          "use server";
          const names = formData.get("name") as string;
          if (!session || !session.user.id) return;
          if (names && names.length > 3) {
            await prisma.user.update({
              where: {
                id: session.user.id,
              },
              data: {
                name: names,
              },
            });
            revalidatePath(`/user/${session.user.id}`);
          }
        }}
        className="w-full flex flex-col"
      >
        <div className="h-full">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your name."
              defaultValue={user?.name ?? ""}
              minLength={3}
            />
          </div>
        </div>
        <div className="text-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
