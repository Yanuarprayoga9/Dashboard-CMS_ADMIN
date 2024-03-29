"use server"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { prismadb } from "@/lib/db";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  /*
   * This layout checked user login
   * check store wtih params storeId
   */

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
