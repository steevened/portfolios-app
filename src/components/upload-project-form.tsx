import { Technology } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export function UploadProjectForm({
  technologies,
  onContinue,
}: {
  technologies: Technology[];
  onContinue: () => void;
}) {
  const [technologiesSelected, setTechnologiesSelected] = useState<
    Technology[]
  >([]);

  return (
    <form>
      <div className="space-y-5 my-2.5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Project name</Label>
          <Input
            required
            type="text"
            id="name"
            placeholder="Type your project name."
          />
        </div>
        <div className="flex flex-col gap-y-5 @md:flex-row gap-x-2.5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="live-url">Live url</Label>
            <Input
              type="text"
              id="live-url"
              placeholder="Type your project live url."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="github-url">GitHub url</Label>
            <Input
              type="text"
              id="github-url"
              placeholder="Type your project live url."
            />
          </div>
        </div>
        <div className="grid items-center gap-1.5">
          <Label>Used technologies</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                // aria-expanded={open}
                className="w-full justify-between"
              >
                React, Node, TypeScript...
                <CaretSortIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search technologies..." />
                <CommandList className="p-1">
                  <CommandEmpty>No technologies found.</CommandEmpty>
                  {technologies.map((technology) => (
                    <CommandItem
                      key={technology.id}
                      value={technology.name}
                      onSelect={() => {
                        setTechnologiesSelected((prevValue) => {
                          if (prevValue.includes(technology)) {
                            return prevValue.filter(
                              (tech) => tech.id !== technology.id
                            );
                          } else {
                            return [...prevValue, technology];
                          }
                        });
                      }}
                    >
                      <p>{technology.name}</p>
                      {technologiesSelected.some(
                        (t) => t.id === technology.id
                      ) ? (
                        <CheckIcon />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className=" flex flex-wrap gap-2.5">
            {technologiesSelected.map((technology) => (
              <Badge key={technology.id}>{technology.name}</Badge>
            ))}
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Description</Label>
          <Textarea
            rows={4}
            placeholder="Type your project description."
            id="message"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant={"ghost"}>
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={onContinue}>Continue</Button>
      </DialogFooter>
    </form>
  );
}
