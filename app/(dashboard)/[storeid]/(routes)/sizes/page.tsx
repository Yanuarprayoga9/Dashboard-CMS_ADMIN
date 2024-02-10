"use server";
import React from "react";
import { BillboardClient } from "./components/client";
import { prismadb } from "@/lib/db";
import { format } from "date-fns";
const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData = sizes.map((data:any) => {
    return {
      id:data.id,
      label: data.label,
      imageUrl: data.imageUrl,
      createdAt: format(data.createdAt,"MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col px-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedData} />
      </div>
    </div>
  );
};

export default SizePage;
