"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StudioPartB from "@/components/part-b/StudioPartB";

export default function StudioRoutePage() {
  const router = useRouter();
  return (
    <StudioPartB
      onSwitchToPartA={() => router.push("/")}
      onOpenProductDoc={() => router.push("/product-thinking")}
    />
  );
}
