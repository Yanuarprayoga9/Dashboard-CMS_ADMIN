"use server"
import React from "react";
import { SettingForm } from "./components/settings-form";
import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
import { prismadb } from "@/lib/db";
import { Store } from "@prisma/client";

interface paramsProps{
  params:Store;
}
const SettingsPage = async ({
  params
}:paramsProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const store = await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId

    }
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6 ">
        <SettingForm initialData={store}/>
      </div>
    </div>
  );
};

export default SettingsPage;
