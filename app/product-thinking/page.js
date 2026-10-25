"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductThinkingView from "@/components/part-b/ProductThinkingView";

export default function ProductThinkingRoutePage() {
  const router = useRouter();
  return (
    <ProductThinkingView
      onSwitchToPartA={() => router.push("/")}
      onSwitchToPartB={() => router.push("/studio")}
    />
  );
}
