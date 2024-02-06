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

interface BillboardCLientProps {
  data: Billboard[];
}

export const BillboardClient = ({ data }: BillboardCLientProps) => {
  const router = useRouter();
  const params = useParams();

  const API_BILLBOARD_ITEMS: ApiAlertProps[] = [
    {
      title: "CREATE BILLBOARD",
      description: `${origin}/api/${params.storeId}/billboards`,
      variant: "admin",
    },
    {
      title: "UPDATE BILLBOARD",
      description: `${origin}/api/${params.storeId}/billboards/${params.billboardid}`,
      variant: "admin",
    },
    {
      title: "CREATE BILLBOARD",
      description: `${origin}/api/${params.storeId}/billboards`,
      variant: "admin",
    },
    {
      title: "CREATE BILLBOARD",
      description: `${origin}/api/${params.storeId}/billboards`,
      variant: "admin",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Blllboard (${data.length})`}
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
        <DataTable columns={columns} data={data} />
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
