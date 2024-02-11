"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";

import { OrderColumn, columns } from "./columns";


interface OrdersCLientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrdersCLientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          descriprtion="Manage orders for your store"
        />
      </div>
      <Separator />
      <div className="py-10">
        <DataTable searchKey="products" columns={columns} data={data} />
      </div>
    </>
  );
};
