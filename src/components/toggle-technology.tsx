"use client";
import { Technology } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import { useOnClickOutside } from "usehooks-ts";

export default function ToggleTechnology({
  technologies,
}: {
  technologies: Technology[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const [techArray, setTechArray] = useState<string[]>(
    searchParams.get("tech") ? searchParams?.get("tech")?.split("_")! : []
  );
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClickOutside = () => {
    setIsSearchOpen(false);
  };

  const handleClickInside = () => {
    setIsSearchOpen(true);
  };

  useOnClickOutside(tabsContainerRef, handleClickOutside);

  useEffect(() => {
    if (!techArray || techArray.length === 0) {
      router.replace(pathname);
    } else {
      router.replace(
        pathname + "?" + createQueryString("tech", techArray.join("_"))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techArray]);

  return (
    <div className="w-full overflow-x-auto snap-x scrollbar-hide">
      <div
        ref={tabsContainerRef}
        className="flex justify-start w-min  gap-2.5 items-center "
      >
        <label
          className="flex items-center  gap-2.5"
          role="button"
          onClick={handleClickInside}
        >
          <span
            className={buttonVariants({
              size: "sm",
              variant: "secondary",
              className: "p-0",
            })}
          >
            <MagnifyingGlassIcon className="font-semibold" />
          </span>
          {isSearchOpen ? (
            <Input
              value={searchValue}
              className="h-8 min-w-[150px]"
              placeholder="Search technology"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          ) : null}
        </label>
        <Toggle
          size={"sm"}
          pressed={techArray.length === 0}
          onPressedChange={(pressed) => {
            if (pressed) {
              setTechArray([]);
            }
          }}
          value="all"
        >
          All
        </Toggle>
        {technologies
          .filter((t) =>
            t.name.toUpperCase().includes(searchValue.toUpperCase())
          )
          .map((technology) => (
            <Toggle
              size={"sm"}
              pressed={techArray.includes(technology.slug)}
              onPressedChange={(pressed) => {
                if (pressed) {
                  if (techArray.includes(technology.slug)) {
                    setTechArray((prevValues) => {
                      return prevValues.filter((v) => v !== technology.slug);
                    });
                    router.replace(
                      pathname,
                      createQueryString("tech", techArray.join("_"))
                    );
                  } else {
                    setTechArray((prevValues) =>
                      prevValues.concat(technology.slug)
                    );
                  }
                } else {
                  setTechArray((prevValues) =>
                    prevValues.filter((v) => v !== technology.slug)
                  );
                }
              }}
              key={technology.id}
              value={technology.slug}
            >
              {technology.name}
            </Toggle>
          ))}
      </div>
    </div>
  );
}
