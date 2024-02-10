"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { ApiAlertProps } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ProductClientProps {
  data: Billboard[];
}

export const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin()
  const API_BILLBOARD_ITEMS: ApiAlertProps[] = [
    {
      title: "GET",
      description: `${origin}/api/${params.storeId}/billboards`,
      variant: "public",
    },
    {
      title: "GET BY ID",
      description: `${origin}/api/${params.storeId}/billboards/{billboardId}`,
      variant: "public",
    },
    {
      title: "POST",
      description: `${origin}/api/${params.storeId}/billboards`,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${origin}/api/${params.storeId}/billboards/{billboardId}`,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${origin}/api/${params.storeId}/billboards/{billboardId}`,
      variant: "admin",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Blllboards (${data.length})`}
          descriprtion="Manage billboards for your"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="py-10">
        <DataTable searchKey="label" columns={columns} data={data} />
      </div>
      <Heading title="API BILLBOARD" descriprtion="API calls for Billboard" />
      <Separator />
      <div className="py-6">
        <ApiList 
        data={API_BILLBOARD_ITEMS}
        />
      </div>
    </>
  );
};
