"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { ApiAlertProps } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient = ({ data }: CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin()

  const API_BILLBOARD_ITEMS: ApiAlertProps[] = [
    {
      title: "GET",
      description: `${origin}/api/${params.storeId}/categories`,
      variant: "public",
    },
    {
      title: "GET BY ID",
      description: `${origin}/api/${params.storeId}/categories/{categoriesid}`,
      variant: "public",
    },
    {
      title: "POST",
      description: `${origin}/api/${params.storeId}/categories`,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${origin}/api/${params.storeId}/categories/{categoriesid}`,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${origin}/api/${params.storeId}/categories/{categoriesid}`,
      variant: "admin",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          descriprtion="Manage categories for your"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
          }}
        >
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="py-10">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
      <Heading title="API CATEGORIES" descriprtion="API calls for Category" />
      <Separator />
      <div className="py-6">
        <ApiList 
        data={API_BILLBOARD_ITEMS}
        />
      </div>
    </>
  );
};
