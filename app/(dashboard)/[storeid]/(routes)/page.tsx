import { prismadb } from "@/lib/db";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <>
      Dashboard Store Page
      {store.name}
    </>
  );
};

export default DashboardPage;
