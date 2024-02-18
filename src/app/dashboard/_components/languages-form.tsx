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
import { createLanguage } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function LanguagesForm() {
  const languageSchema = z.object({
    name: z
      .string({
        required_error: "Please enter a valid language name",
      })
      .min(1, {
        message: "Please enter a valid language name.",
      })
      .max(50),
  });

  const form = useForm<z.infer<typeof languageSchema>>({
    resolver: zodResolver(languageSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof languageSchema>) => {
    try {
      await createLanguage(data);
      form.setValue("name", "");
      toast.success("Language added!");
    } catch (error) {
      toast.error(`${error}`);
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programming language</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="language-name"
                  placeholder="Write some programming language..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <LoaderButton
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            isLoading={form.formState.isSubmitting}
          >
            Add language
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
