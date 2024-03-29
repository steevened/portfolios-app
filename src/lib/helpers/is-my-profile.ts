import { getServerAuthSession } from "../auth";

export default async function isMyProfile(userId: string): Promise<boolean> {
  const session = await getServerAuthSession();
  if (!session || !session.user) return false;
  if (session.user.id !== userId) return false;
  return true;
}
