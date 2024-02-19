import {prismadb} from "@/lib/db";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount;
};