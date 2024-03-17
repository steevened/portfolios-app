"use client";

import { useProjectStore } from "@/lib/store/project.store";

export default function CommentSection({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  const { project } = useProjectStore();

  if (projectId === "" || project.id !== projectId || !project.isCommentsOpen)
    return null;

  return <div className="border-t pt-2.5">{children}</div>;
}
