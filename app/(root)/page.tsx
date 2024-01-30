"use client";
import { Modal } from "@/components/ui/modal";
import { SignInButton, SignedOut, UserButton, auth } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/sign-in" />
      <Modal title="test" description="test desc" isOpen onClose={() => {}}>
        children
      </Modal>
    </>
  );
}
