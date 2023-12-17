import { projectSchema } from "@/lib/schemas/project.schema";
import { getProjectById } from "@/lib/services/projects.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Technology } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/ui/command";
import { DialogClose, DialogFooter } from "../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Textarea } from "../../../../components/ui/textarea";

const ProjectDetailsForm = ({
  initialProject,
  technologies,
  onSubmit,
}: {
  initialProject?: Awaited<ReturnType<typeof getProjectById>>;
  onSubmit: ({
    data,
    technologiesSelected,
  }: {
    data: z.infer<typeof projectSchema>;
    technologiesSelected: Technology[];
  }) => Promise<any>;
  technologies: Technology[];
}) => {
  const [technologiesSelected, setTechnologiesSelected] = useState<
    Technology[]
  >(initialProject?.technologies.map((t) => t.technology) || []);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialProject?.name || "",
      liveUrl: initialProject?.liveUrl || "",
      githubUrl: initialProject?.githubUrl || "",
      description: initialProject?.description || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          onSubmit({
            data: form.getValues(),
            technologiesSelected,
          })
        )}
        className="space-y-2.5"
      >
        <div className="space-y-5 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your project name." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-5 @md:flex-row gap-x-2.5 ">
            <FormField
              control={form.control}
              name="liveUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Live url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your project live url."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>GitHub url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your project GitHub repo url."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                          if (
                            technologiesSelected.some(
                              (t) => t.id === technology.id
                            )
                          ) {
                            setTechnologiesSelected((prev) =>
                              prev.filter((t) => t.id !== technology.id)
                            );
                          } else {
                            setTechnologiesSelected((prev) => [
                              ...prev,
                              technology,
                            ]);
                          }
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Type your project description."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="gap-y-2.5">
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <Button>Continue</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProjectDetailsForm;
