"use server";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/db";
import { CategoryForm } from "./components/categories-form";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryid: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryid,
      storeId: params.storeId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
