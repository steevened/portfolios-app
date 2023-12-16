import { useToast } from "@/components/ui/use-toast";
import { projectSchema } from "@/lib/schemas/project.schema";
import {
  createPost,
  getProjectUnpublished,
  updatePost,
} from "@/lib/services/projects.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Technology } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export function UploadProjectForm({
  technologies,
  onContinue,
  projectUnpublished,
}: {
  technologies: Technology[];
  onContinue: () => void;
  projectUnpublished?: Awaited<ReturnType<typeof getProjectUnpublished>>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [technologiesSelected, setTechnologiesSelected] = useState<
    Technology[]
  >(projectUnpublished?.technologies.map((t) => t.technology) || []);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: projectUnpublished
      ? {
          name: projectUnpublished.name,
          liveUrl: projectUnpublished.liveUrl || "",
          githubUrl: projectUnpublished.githubUrl || "",
          description: projectUnpublished.description || "",
        }
      : {
          name: "",
          liveUrl: "",
          githubUrl: "",
          description: "",
        },
  });

  async function onSubmit(data: z.infer<typeof projectSchema>) {
    if (technologiesSelected.length <= 0) {
      return toast({
        variant: "destructive",
        title: "Wait!",
        description: "You must select at least one technology.",
      });
    }

    try {
      if (projectUnpublished) {
        const res = await updatePost({
          data,
          technologiesSelected,
          id: projectUnpublished.id,
        });
        if (res.status !== 200) return;
        router.refresh();
        onContinue();
        return await res.json();
      } else {
        const res = await createPost({ data, technologiesSelected });
        if (res.status !== 201) return;
        router.refresh();
        onContinue();
        return await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5 my-5">
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
}
