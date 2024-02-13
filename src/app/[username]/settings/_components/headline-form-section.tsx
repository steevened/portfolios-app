"use client";

import LoaderButton from "@/components/atoms/loader-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateHeadline } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function HeadlineFormSection({
  headline,
  username,
}: {
  headline: string;
  username: string;
}) {
  const headlineSchema = z.object({
    headline: z
      .string()
      .max(50, {
        message: "Headline must be less than 50 characters",
      })
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(headlineSchema),
    mode: "onChange",
    values: {
      headline,
    },
  });

  const onSubmit = async (data: z.infer<typeof headlineSchema>) => {
    const updateHeadlinePromise = updateHeadline;
    toast.promise(
      () =>
        updateHeadlinePromise({
          username,
          data,
        }),
      {
        loading: "Saving...",
        success: "Headline updated!",
        error: "Failed to update headline",
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Add a headline" />
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
