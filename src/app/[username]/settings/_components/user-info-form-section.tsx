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
import { updateUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function UserInfoFormSection({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const userInfoSchema = z.object({
    name: z
      .string({
        required_error: "Your name is required",
      })
      .min(2, {
        message: "Your name must be at least 2 characters",
      })
      .max(40, {
        message: "Your name must be less than 40 characters",
      }),
    username: z
      .string({
        required_error: "Your username is required",
      })
      .min(2, {
        message: "Your uername must be at least 2 characters",
      })
      .max(35, {
        message: "Your uername must be less than 35 characters",
      }),
  });

  const form = useForm({
    resolver: zodResolver(userInfoSchema),
    mode: "onChange",
    values: {
      name,
      username,
    },
  });

  const onSubmit = async (data: z.infer<typeof userInfoSchema>) => {
    const updatePromise = updateUser;
    toast.promise(
      () =>
        updatePromise({
          name: data.name,
          username: data.username,
        }),
      {
        loading: "Saving...",
        success: "User info updated!",
        error: "Failed to update user info",
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Names</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Write your names" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
