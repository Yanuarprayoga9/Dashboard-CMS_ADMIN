"use server";
import React from "react";
import { BillboardForm } from "./components/billboard-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/db";

const BllboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  });
  console.log(billboard);
  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BllboardPage;
