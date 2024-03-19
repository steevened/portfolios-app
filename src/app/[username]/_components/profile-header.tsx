import SettingsButton from "@/components/atoms/settings-button";
import { buttonVariants } from "@/components/ui/button";
import { isMyProfile } from "@/lib/helpers";
import { Developer, User } from "@prisma/client";
import Link from "next/link";
import DeveloperLinks from "./developer-links";
import UserImage from "./user-image";

export default async function ProfileHeader({
  user,
  developer,
}: {
  user: User;
  developer: Developer;
}) {
  return (
    <div>
      <div className="flex gap-2.5 py-5 max-sm:px-2.5">
        <UserImage
          imageUrl={(user.image as string) || undefined}
          name={user.name || ""}
        />
        <div className=" w-full flex flex-col justify-between">
          <div className="h-full">
            <div className="flex h-full items-start justify-between">
              <div className="flex flex-col gap-1.5 h-full">
                <p className="font-semibold text-lg leading-none first-letter:uppercase">
                  {user.name}
                </p>
                <p className="text-sm text-muted-foreground leading-none">
                  @{user.username}
                </p>
                <div>
                  <HeadlineSection
                    userId={user.id}
                    username={user.username as string}
                    headline={developer.headline as string}
                  />
                </div>
              </div>
              {(await isMyProfile(user.id)) ? (
                <Link href={`/${user.username}/settings`}>
                  <SettingsButton />
                </Link>
              ) : null}
            </div>
          </div>
          <div className="sm:flex gap-2.5 items-center hidden">
            <DeveloperLinks developerId={developer.id} />
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 items-center sm:hidden justify-center">
        <DeveloperLinks developerId={developer.id} />
      </div>
    </div>
  );
}

async function HeadlineSection({
  userId,
  username,
  headline,
}: {
  userId: string;
  headline: string;
  username: string;
}) {
  return (
    <>
      {(await isMyProfile(userId)) ? (
        <>
          {headline ? (
            <p className="text-sm">{headline}</p>
          ) : (
            <Link
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
              })}
              href={`/${username}/settings`}
            >
              <p>Add headline</p>
              <span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 15 15"
                  strokeWidth={2}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </Link>
          )}
        </>
      ) : (
        <>{headline ? <p>{headline}</p> : null}</>
      )}
    </>
  );
}
