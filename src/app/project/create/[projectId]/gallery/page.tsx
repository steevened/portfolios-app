"use client";

import GalleryForm from "@/app/project/_components/gallery-form";

export default function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  return <GalleryForm projectId={params.projectId} action="create" />;
}
