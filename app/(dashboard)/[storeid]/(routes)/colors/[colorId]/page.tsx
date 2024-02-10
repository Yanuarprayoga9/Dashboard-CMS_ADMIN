"use server";
import React from "react";
import { SizeForm } from "./components/size-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/db";

const BllboardPage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const size = await prismadb.size.findFirst({
    where: {
      id: params.sizeId,
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default BllboardPage;
