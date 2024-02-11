"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function UserImageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-24 h-24 sm:w-32 sm:h-32 items-center justify-center relative flex shrink-0 overflow-hidden rounded-full border",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function UserImage({
  imageUrl,
  name,
  className,
}: {
  imageUrl?: string;
  name?: string;
  className?: string;
}) {
  if (!imageUrl)
    return (
      <UserImageContainer className={cn("bg-muted", className)}>
        <div className="uppercase text-5xl">{name?.slice(0, 2) || ""}</div>
      </UserImageContainer>
    );

  return (
    <UserImageContainer className={className}>
      <Zoom>
        <Image
          src={imageUrl}
          alt="user image"
          width={1000}
          height={1000}
          className="aspect-square object-cover h-full w-full"
        />
      </Zoom>
    </UserImageContainer>
  );
}
