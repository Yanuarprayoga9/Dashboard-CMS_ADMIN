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
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
const SettinggsSchema = z.object({
  label: z.string().min(1, {
    message: "label must be at least 1 character",
  }),
  imageUrl: z.string().min(1, {
    message: "image is required",
  }),
});

interface BillboardsFormProps {
  initialData: Store;
}
export const BillboardsForm: React.FC<BillboardsFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const title = initialData ? "Edit billboard " : "Create billboard";
  const description = initialData ? "Edit a billboard " : "Create a billboard";
  const toastMessage = initialData ? "Billboard created" : "Billboard updated";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<z.infer<typeof SettinggsSchema>>({
    resolver: zodResolver(SettinggsSchema),
    defaultValues: initialData || null,
  });
  const onSubmit = async (values: z.infer<typeof SettinggsSchema>) => {
    try {
      setIsloading(true);
      const validatedFields = SettinggsSchema.safeParse(values);
      if (!validatedFields.success) toast.error("Invalid fields");
      const response = await axios.patch(`/api/stores/${initialData.id}`, {
        ...values,
      });
      router.refresh();
      console.log(response.data);
      toast.success(`Success update store`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products and category first.");
    } finally {
      setIsloading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} descriprtion={description} />
        {initialData ? (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Separator className="mr-20 mt-4 " />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-4">
          <div className="grid grid-cols-3 pt-6">
            <FormField
              control={form.control}
              name="label"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="type your label here.." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
