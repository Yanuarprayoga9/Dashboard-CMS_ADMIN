"use server";
import React from "react";
import { SizeForm } from "./components/color-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/db";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const size = await prismadb.color.findFirst({
    where: {
      id: params.colorId,
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

export default ColorPage;
