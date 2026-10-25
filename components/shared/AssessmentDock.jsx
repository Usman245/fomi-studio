"use client";

import React, { useState } from "react";

export default function AssessmentDock({ activeView, onChangeView }) {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="print:hidden fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="px-3.5 py-2 rounded-full bg-[#191615]/90 hover:bg-[#191615] text-white text-[11px] font-semibold shadow-xl border border-white/15 backdrop-blur-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          title="Expand Assessment Part Switcher"
        >
          <span className="w-2 h-2 rounded-full bg-[#D17D60]" />
          <span>Switch Part A / Part B</span>
        </button>
      </div>
    );
  }

  return (
    <nav
      aria-label="Assessment Deliverable Switcher"
      className="print:hidden fixed bottom-4 right-4 z-50 rounded-full bg-[#191615]/92 text-white p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-white/15 backdrop-blur-xl flex items-center gap-1"
    >
      <button
        type="button"
        onClick={() => onChangeView("part-a")}
        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
          activeView === "part-a"
            ? "bg-[#D17D60] text-white shadow-xs"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        Part A: Mockup
      </button>

      <button
        type="button"
        onClick={() => onChangeView("part-b")}
        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
          activeView === "part-b"
            ? "bg-[#D17D60] text-white shadow-xs"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        Part B: Studio Redesign
      </button>

      <button
        type="button"
        onClick={() => onChangeView("doc")}
        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
          activeView === "doc"
            ? "bg-[#D17D60] text-white shadow-xs"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        📄 Product Doc
      </button>

      <button
        type="button"
        onClick={() => setMinimized(true)}
        aria-label="Minimize switcher dock"
        title="Minimize switcher for clean view"
        className="w-6 h-6 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs cursor-pointer"
      >
        –
      </button>
    </nav>
  );
}
