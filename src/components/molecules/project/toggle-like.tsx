"use client";

import { Button } from "@/components/ui/button";
import { toggleLike } from "@/lib/actions";

export default function ToggleLike({
  projectId,
  isLiked,
}: {
  projectId: string;
  isLiked: boolean;
}) {
  return (
    <Button
      onClick={async () => await toggleLike(projectId)}
      size={"icon"}
      variant={"ghostSecondary"}
      className="rounded-full"
    >
      {isLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125"
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
            d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375m.95 4.725"
          ></path>
        </svg>
      )}
    </Button>
  );
}
