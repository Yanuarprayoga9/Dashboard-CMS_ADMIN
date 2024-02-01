import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const DashboardLayout = async (
  children: React.ReactNode,
) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: userId,
    },
  });

  if (!store) redirect(`/${store.id}`);

  return (
    <>
      <div className="">This is wiill be navbar</div>
      {children}
    </>
  );
};
