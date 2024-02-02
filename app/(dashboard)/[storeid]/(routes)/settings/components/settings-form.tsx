"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const SettinggsSchema = z.object({
  name: z.string().min(1, {
    message: "name must be at least 1 character",
  }),
});

interface SettingsFormProps {
  initialData: Store;
}
export const SettingForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [isLoading,setIsloading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof SettinggsSchema>>({
    resolver: zodResolver(SettinggsSchema),
    defaultValues: initialData,
  });
  const onclick = () => {};
  const onSubmit = (values: z.infer<typeof SettinggsSchema>) => {
    console.log(values);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" descriprtion="Manage store preferences" />
        <Button variant="destructive" size="icon" onClick={onclick}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mr-20 mt-4 " />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
