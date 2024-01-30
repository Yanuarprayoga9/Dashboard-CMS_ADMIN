"use client";
import { Modal } from "@/components/ui/modal";
import { SignInButton, SignedOut, UserButton, auth } from "@clerk/nextjs";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/sign-in" />
    
    </>
  );
}
