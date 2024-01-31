"use server";

import { db } from "@/lib/db";

export const test = async () => {
  console.log(await db.products.findMany());
};
