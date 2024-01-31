"use client";
import { test } from "@/actions/test";
import { useStoreModal } from "@/hooks/use-store-modal";

import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  test();
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return <></>;
}
