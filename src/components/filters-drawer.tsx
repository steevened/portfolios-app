"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import { Language } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function FiltersDrawer({
  languages,
}: {
  languages: Language[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [languagesSelected, setLanguagesSelected] = useState<string[]>(
    searchParams.get("languages")
      ? searchParams.get("languages")?.split("_") ?? []
      : []
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleApply = () => {
    if (languagesSelected.length === 0) {
      router.replace(pathname);
    } else {
      router.replace(
        pathname +
          "?" +
          createQueryString("languages", languagesSelected.join("_"))
      );
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          className="rounded-full shadow-md flex items-center text-xs gap-1 border "
          // size={"icon"}
          variant={"default"}
        >
          Filter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"
            ></path>
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-screen-md px-2.5">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Filters allows you to refine your search results in order to find
              your desired projects.
            </DrawerDescription>
          </DrawerHeader>
          <div className="py-2.5">
            <h6 className="text-sm">Programming Languages</h6>
            <div className="py-2.5">
              <ul className="flex flex-wrap gap-2.5">
                <Toggle
                  size={"sm"}
                  pressed={languagesSelected.length === 0}
                  onPressedChange={(pressed) => {
                    if (pressed) {
                      setLanguagesSelected([]);
                    }
                  }}
                  value="all"
                >
                  All
                </Toggle>
                {languages.map((lang) => (
                  <Toggle
                    pressed={languagesSelected.includes(lang.slug)}
                    onPressedChange={(pressed: boolean) => {
                      if (pressed) {
                        setLanguagesSelected((prevValues) => [
                          ...prevValues,
                          lang.slug,
                        ]);
                      } else {
                        setLanguagesSelected((prevValues) =>
                          prevValues.filter((v) => v !== lang.slug)
                        );
                      }
                    }}
                    size={"sm"}
                    key={lang.id}
                  >
                    {lang.name}
                  </Toggle>
                ))}
              </ul>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleApply}>Apply</Button>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
