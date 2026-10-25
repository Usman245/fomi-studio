"use client";

import React, { useState } from "react";
import WorkspacePartA from "@/components/part-a/WorkspacePartA";
import StudioPartB from "@/components/part-b/StudioPartB";
import ProductThinkingView from "@/components/part-b/ProductThinkingView";
import AssessmentDock from "@/components/shared/AssessmentDock";

export default function HomePage() {
  // 'part-a' | 'part-b' | 'doc'
  const [activeView, setActiveView] = useState("part-a");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      {activeView === "part-a" && (
        <WorkspacePartA
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          onSwitchToPartB={() => setActiveView("part-b")}
          onOpenProductDoc={() => setActiveView("doc")}
        />
      )}

      {activeView === "part-b" && (
        <StudioPartB
          onSwitchToPartA={() => setActiveView("part-a")}
          onOpenProductDoc={() => setActiveView("doc")}
        />
      )}

      {activeView === "doc" && (
        <ProductThinkingView
          onSwitchToPartA={() => setActiveView("part-a")}
          onSwitchToPartB={() => setActiveView("part-b")}
        />
      )}

      <AssessmentDock activeView={activeView} onChangeView={setActiveView} />
    </>
  );
}
