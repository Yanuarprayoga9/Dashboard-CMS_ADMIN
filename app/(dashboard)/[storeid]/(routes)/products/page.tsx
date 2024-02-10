"use server";
import React from "react";
import { ProductClient } from "./components/client";
import { prismadb } from "@/lib/db";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductsColumns } from "./components/columns";
const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  console.log(products)
  const formattedData:ProductsColumns[] = products.map((data:any) => (
     {
      id: data.id,
      name: data.name,
      isFeatured: data.isFeatured,
      isArchived: data.isArchived,
      price: formatter.format(data.price.toNumber()),
      category: data.category.name,
      size: data.size.name,
      color: data.color.value,
      createdAt: format(data.createdAt, 'MMMM do, yyyy'),
    }
  ));

  return (
    <div className="flex-col px-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedData} />
      </div>
    </div>
  );
};

export default ProductPage;
