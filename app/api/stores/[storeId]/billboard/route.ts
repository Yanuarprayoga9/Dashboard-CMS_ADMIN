import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
 try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
    const body = await req.json();
    const { storeId, label } = body;
    if (!storeId || !label)
      return new NextResponse("Invalid fields", { status: 400 });
    const billboard = await prismadb.billboard.create({
      data: {
        storeId: "9c6ce7a0-d39b-4687-94a1-5872f99111d6",
        label: "jlk",
        imageUrl: "kn",
      },
    });
    return NextResponse.json(billboard)
 } catch (error) {
    return new NextResponse("Somehing went wrong",{status:500})
 }
}
