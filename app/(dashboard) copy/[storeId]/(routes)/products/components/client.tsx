"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";
import { useOrigin } from "@/hooks/use-origin";
import { ApiAlertProps } from "@/components/ui/api-alert";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {

  const router = useRouter();
  const params = useParams();
  const origin = useOrigin()
  const entity = "products"
  const API_BILLBOARD_ITEMS: ApiAlertProps[] = [
    {
      title: "GET",
      description: `${origin}/api/${params.storeId}/${entity}`,
      variant: "public",
    },
    {
      title: "GET BY ID",
      description: `${origin}/api/${params.storeId}/${entity}/{productId}`,
      variant: "public",
    },
    {
      title: "POST",
      description: `${origin}/api/${params.storeId}/${entity}`,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${origin}/api/${params.storeId}/${entity}/{productId}`,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${origin}/api/${params.storeId}/${entity}/{productId}`,
      variant: "admin",
    },
  ];
  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} descriprtion="Manage products for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" descriprtion="API Calls for Products" />
      <Separator />
      <div className="py-6">
        <ApiList 
        data={API_BILLBOARD_ITEMS}
        />
      </div>    </>
  );
};

