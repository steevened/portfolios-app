"use client";

import LoaderButton from "@/components/atoms/loader-button";
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
import { upsertProject } from "@/lib/actions";
import { projectSchema } from "@/lib/schemas/project.schema";
import { getProjectUnpublished } from "@/lib/services";
import { getLanguages } from "@/lib/services/languages.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Language } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ProjectFormSection({
  languages,
  initialProject,
  action,
}: {
  languages: Awaited<ReturnType<typeof getLanguages>>;
  initialProject?: Awaited<ReturnType<typeof getProjectUnpublished>>;
  action: "create" | "update";
}) {
  const router = useRouter();
  const [languagesSelected, setLanguagesSelected] = useState<Language[]>(
    initialProject
      ? initialProject.languages.map((l) => ({
          id: l.languageId,
          name: l.language.name,
          slug: l.language.slug,
        }))
      : []
  );

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialProject
      ? {
          name: initialProject.name || "",
          description: initialProject.description || "",
          liveUrl: initialProject.liveUrl || "",
          githubUrl: initialProject.githubUrl || "",
        }
      : {},
  });

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    try {
      const projectData = {
        ...data,
        languages: languagesSelected.map((l) => l.id),
      };

      const project = await upsertProject({
        ...projectData,
        id: initialProject?.id,
        isOnDraft: action === "create" ? true : false,
        published: action === "create" ? false : true,
      });

      router.push(
        action === "create"
          ? `/project/create/${project.id}/gallery`
          : `/project/${project.id}/update/gallery`
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type your project name." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
        <div className="flex flex-col gap-2.5 @md:flex-row  ">
          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Live url</FormLabel>
                <FormControl>
                  <Input placeholder="Type your project live url." {...field} />
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
        <div className="grid items-center gap-1.5 ">
          <Label className="">Used programming languages</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                // aria-expanded={open}
                className="w-full justify-between text-muted-foreground"
              >
                Java, Python, TypeScript...
                <CaretSortIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search technologies..." />
                <CommandList className="p-1">
                  <CommandEmpty>No technologies found.</CommandEmpty>
                  {languages.map((language) => (
                    <CommandItem
                      key={language.id}
                      value={language.name}
                      onSelect={() => {
                        if (
                          languagesSelected.some((l) => l.id === language.id)
                        ) {
                          setLanguagesSelected((prev) =>
                            prev.filter((l) => l.id !== language.id)
                          );
                        } else {
                          setLanguagesSelected((prev) => [...prev, language]);
                        }
                      }}
                    >
                      <p>{language.name}</p>
                      {languagesSelected.some((l) => l.id === language.id) ? (
                        <CheckIcon />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className=" flex flex-wrap gap-2.5">
            {languagesSelected.map((l) => (
              <Badge key={l.id}>{l.name}</Badge>
            ))}
          </div>
        </div>
        <div className="text-start">
          <LoaderButton
            disabled={
              form.formState.isSubmitting ||
              !form.formState.isValid ||
              languagesSelected.length === 0
            }
            isLoading={form.formState.isSubmitting}
          >
            Continue
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
