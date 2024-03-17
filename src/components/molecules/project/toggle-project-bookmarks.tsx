"use client";

import { Button } from "@/components/ui/button";
import { toggleProjectToBookmark } from "@/lib/actions/bookmarks.action";

export default function ToggleProjectBookmarks({
  projectId,
  isBookmarked,
}: {
  projectId: string;
  isBookmarked: boolean;
}) {
  return (
    <div className="">
      <Button
        onClick={async () => await toggleProjectToBookmark({ projectId })}
        size={"icon"}
        variant={"ghostSecondary"}
        className="rounded-full"
      >
        {isBookmarked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"
            ></path>
          </svg>
        )}
      </Button>
    </div>
  );
}
