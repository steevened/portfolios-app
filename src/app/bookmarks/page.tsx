import { getMyBookmarks } from "@/lib/services";

export default async function Page() {
  const bookmarks = await getMyBookmarks();
  console.log({ bookmarks });
  return <div>bookmarks</div>;
}
