import ProjectList from "@/components/atoms/projects-list";
import { getMyBookmarks } from "@/lib/services";

export default async function Page() {
  const bookmarks = await getMyBookmarks();

  if (!bookmarks)
    return <div className="text-center my-10">You have no bookmarks yet.</div>;

  return <ProjectList projects={bookmarks?.projects.map((p) => p.project)} />;
}
