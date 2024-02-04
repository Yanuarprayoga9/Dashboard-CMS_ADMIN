/*
 * GetBillboardbyid
 * GET
 * return []
 */

import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(params: { storeId: string; billboardid: string }) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
    if (!params.storeId || !params.billboardid)
      return new NextResponse("store id and billboard id required", {
        status: 400,
      });
    const billboard = await prismadb.billboard.findMany({
      where: {
        id: params.billboardid,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

/*
 * update billboard
 * PATCH
 * return []
 */

export const PATCH = async () => {
  
}
