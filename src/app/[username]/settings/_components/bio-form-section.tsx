"use client";

import LoaderButton from "@/components/atoms/loader-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateBio } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function BioFormSection({
  bio,
  username,
}: {
  bio?: string;
  username: string;
}) {
  const { toast } = useToast();
  const bioSchema = z.object({
    bio: z
      .string()
      .max(500, {
        message: "Bio must be less than 500 characters",
      })
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(bioSchema),
    values: {
      bio: bio || "",
    },

    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof bioSchema>) => {
    await updateBio({
      username,
      data: {
        bio: data.bio?.trim(),
      },
    });
    toast({
      title: "Success!",
      description: "Your bio has been updated successfully",
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  placeholder="Write something about you."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoaderButton
            isLoading={form.formState.isSubmitting}
            disabled={
              !form.formState.isDirty ||
              !form.formState.isValid ||
              form.formState.isSubmitting ||
              form.formState.isSubmitSuccessful
            }
            type="submit"
          >
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
