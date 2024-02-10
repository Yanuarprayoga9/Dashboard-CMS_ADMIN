"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { ApiAlertProps } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SizeClientProps {
  data: Size[];
}

export const SizeClient = ({ data }: SizeClientProps) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin()
  const API_BILLBOARD_ITEMS: ApiAlertProps[] = [
    {
      title: "GET",
      description: `${origin}/api/${params.storeId}/sizes`,
      variant: "public",
    },
    {
      title: "GET BY ID",
      description: `${origin}/api/${params.storeId}/sizes/{sizeId}`,
      variant: "public",
    },
    {
      title: "POST",
      description: `${origin}/api/${params.storeId}/sizes`,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${origin}/api/${params.storeId}/sizes/{sizeId}`,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${origin}/api/${params.storeId}/sizes/{sizeId}`,
      variant: "admin",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          descriprtion="Manage sizes for your"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/sizes/new`);
          }}
        >
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="py-10">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
      <Heading title="API SIZES" descriprtion="API calls for Sizes" />
      <Separator />
      <div className="py-6">
        <ApiList 
        data={API_BILLBOARD_ITEMS}
        />
      </div>
    </>
  );
};
