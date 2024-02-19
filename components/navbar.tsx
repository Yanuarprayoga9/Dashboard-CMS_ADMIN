import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { StoreSwicther } from "./store-switcher";
import { prismadb } from "@/lib/db";
import { redirect } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <StoreSwicther className="mr-auto ml-8" items={stores} />
          <MainNav />
          <div className="ml-auto flex items-center space-x-4 mr-4">
            <ModeToggle></ModeToggle>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
