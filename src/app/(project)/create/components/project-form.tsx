"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { projectSchema } from "@/lib/schemas/project.schema";
import {
  getProjectUnpublished,
  getProjectById,
  updateProject,
  upsertProject,
} from "@/lib/services/projects.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Technology } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  initialProject?: Awaited<
    ReturnType<typeof getProjectUnpublished | typeof getProjectById>
  >;
  technologies: Technology[];
  origin: "create" | "update";
};

export default function ProjectForm({
  initialProject,
  technologies,
  origin,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  // console.log(initialProject);

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

  const upsertProjectMutation = useMutation({
    mutationFn: upsertProject,
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
  });

  async function onSubmit(data: z.infer<typeof projectSchema>) {
    // if (technologiesSelected.length <= 0) {
    //   return toast({
    //     variant: "destructive",
    //     title: "Wait!",
    //     description: "You must select at least one technology.",
    //   });
    // }

    try {
      if (origin === "create") {
        upsertProjectMutation.mutate(
          {
            data: {
              ...data,
              id: initialProject?.id || "",
            },
            technologiesSelected,
          },
          {
            onSuccess: ({ data: resData }) => {
              router.refresh();
              router.push(`/create/${resData.id}/gallery`);
            },
          }
        );
      } else {
        if (!initialProject) return;
        updateProjectMutation.mutate(
          {
            data,
            technologiesSelected,
            id: initialProject.id,
          },
          {
            onSuccess: ({ data }) => {
              router.refresh();
              router.push(`/${data.id}/update/gallery`);
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2.5 my-2.5 text-left">
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
          <div className="flex flex-col gap-2.5 @md:flex-row  ">
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
          <div className="grid items-center gap-2.5 ">
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
        <div className="text-start">
          <Button>Continue</Button>
        </div>
      </form>
    </Form>
  );
}
