import { getProfileRolesByProfileId } from "@/lib/services/profile.service";

export default async function ProfileRolea({
  profileId,
}: {
  profileId: string;
}) {
  const roles = await getProfileRolesByProfileId(profileId);
  if (!roles || !roles.length) return null;
  return (
    <div>
      <p className="text-muted-foreground">{JSON.stringify(roles)}</p>
    </div>
  );
}
