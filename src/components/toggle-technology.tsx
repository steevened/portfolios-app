"use client";
import { Technology } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Toggle } from "./ui/toggle";
import { useCallback, useEffect, useState } from "react";

export default function ToggleTechnology({
  technologies,
}: {
  technologies: Technology[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (!techArray || techArray.length === 0) {
      router.push(pathname);
    } else {
      router.push(
        pathname + "?" + createQueryString("tech", techArray.join("_"))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techArray]);

  return (
    <div className="flex justify-start gap-2.5 ">
      <Toggle
        size={"sm"}
        pressed={techArray.length === 0}
        onPressedChange={(pressed) => {
          if (pressed) {
            setTechArray([]);
            // router.push(pathname);
          }
        }}
        value="all"
      >
        All
      </Toggle>
      {technologies.map((technology) => (
        <Toggle
          size={"sm"}
          pressed={techArray.includes(technology.slug)}
          onPressedChange={(pressed) => {
            if (pressed) {
              if (techArray.includes(technology.slug)) {
                setTechArray((prevValues) => {
                  return prevValues.filter((v) => v !== technology.slug);
                });
                router.push(
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
  );
}
