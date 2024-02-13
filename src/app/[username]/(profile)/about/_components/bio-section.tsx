import AddButton from "@/components/atoms/add-button";
import EditButton from "@/components/atoms/edit-button";
import Link from "next/link";

export default function BioSection({
  bio,
  isMyProfile,
  username,
}: {
  bio?: string;
  isMyProfile: boolean;
  username: string;
}) {
  return (
    <div className="border p-2.5 rounded-lg grid gap-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-muted-foreground text-lg ">Bio</h3>
        {isMyProfile ? (
          <Link href={`/${username}/settings#bio`}>
            {bio ? (
              <EditButton text="Edit bio" />
            ) : (
              <AddButton text="Add bio" />
            )}
          </Link>
        ) : null}
      </div>
      {!bio ? (
        <p className="text-sm">{"There's nothing here yet."}</p>
      ) : (
        <p className="text-sm">{bio}</p>
      )}
    </div>
  );
}
