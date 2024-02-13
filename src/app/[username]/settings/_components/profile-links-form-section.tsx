"use client";

import LoaderButton from "@/components/atoms/loader-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfileLinks } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { DeveloperLinks } from "@prisma/client";

type Props = Pick<
  DeveloperLinks,
  "github" | "twitter" | "linkedin" | "website"
>;

export default function ProfileLinksFormSection({
  links,
  username,
}: {
  links: Props | null;
  username: string;
}) {
  const linksSchema = z.object({
    github: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(linksSchema),
    mode: "onChange",
    values: {
      github: links?.github || "",
      twitter: links?.twitter || "",
      linkedin: links?.linkedin || "",
      website: links?.website || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof linksSchema>) => {
    const updatePromise = updateProfileLinks;
    toast.promise(
      updatePromise({
        data,
        username,
      }),
      {
        loading: "Updating links...",
        success: "Links updated",
        error: "Failed to update links",
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={`https://github.com/${username}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={`https://www.linkedin.com/in/${username}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>X (Twitter)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={`https://twitter.com/${username}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://yourwebsite.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoaderButton
            isLoading={form.formState.isSubmitting}
            disabled={
              !form.formState.isValid ||
              !form.formState.isDirty ||
              form.formState.isSubmitting ||
              form.formState.isSubmitting
            }
          >
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
