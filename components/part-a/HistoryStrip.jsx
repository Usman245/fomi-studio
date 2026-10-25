"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./WorkspacePartA.module.css";

export default function HistoryStrip({
  items = [],
  selectedId,
  onSelectItem,
  onViewAll,
  darkMode = false,
}) {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section
      aria-label="Recent Generation History"
      className={`relative w-full rounded-[16px] p-2 flex items-center gap-2 transition-colors ${
        darkMode
          ? "bg-[#181514]/95 border border-[#2C2624] shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
          : "bg-[#F9F3F0]/95 border border-[#EFE4DE] shadow-[0_8px_24px_rgba(40,28,22,0.04)]"
      } backdrop-blur-md`}
    >
      {/* Left "History / View All" Square Card */}
      <button
        type="button"
        onClick={onViewAll}
        className={`w-[58px] h-[54px] sm:w-[62px] sm:h-[56px] rounded-[11px] shrink-0 flex flex-col items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] group ${
          darkMode
            ? "bg-[#221E1C] hover:bg-[#2A2422] text-[#F5F0ED]"
            : "bg-white hover:bg-[#FFFDFB] text-[#1D1917] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        }`}
        aria-label="View all generation history"
      >
        <span className="text-[11.5px] font-bold tracking-tight leading-tight">
          History
        </span>
        <span
          className={`text-[8.5px] mt-0.5 transition-colors ${
            darkMode
              ? "text-[#9E938E] group-hover:text-[#E08B6D]"
              : "text-[#8A7F7A] group-hover:text-[#D17D60]"
          }`}
        >
          View All
        </span>
      </button>

      {/* Subtle Vertical Divider */}
      <div
        className={`w-[1.5px] h-8 shrink-0 rounded-full mx-0.5 ${
          darkMode ? "bg-[#2E2725]" : "bg-[#EBE0DA]"
        }`}
        aria-hidden="true"
      />

      {/* Horizontal Scrollable Thumbnail Strip */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className={`${styles.historyScroller} flex-1 flex items-center gap-2.5 overflow-x-auto pr-10 py-0.5`}
        role="list"
      >
        {items.map((item, idx) => {
          const isSelected = selectedId === item.id;
          // Match the subtle fade on the last two items on the right edge like the mockup
          const isTrailingFade = idx === items.length - 1;
          const isSecondTrailing = idx === items.length - 2;

          return (
            <button
              key={item.id}
              type="button"
              role="listitem"
              onClick={() => onSelectItem(item)}
              aria-label={`Load history item: ${item.title}`}
              title={`${item.title} (${item.model}) — Click to inspect or reuse prompt`}
              className={`relative w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-[10px] overflow-hidden shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] group ${
                isSelected
                  ? "ring-2 ring-[#D17D60] scale-[1.04]"
                  : "hover:scale-[1.04]"
              } ${
                isTrailingFade
                  ? "opacity-45 hover:opacity-100"
                  : isSecondTrailing
                  ? "opacity-75 hover:opacity-100"
                  : "opacity-100"
              }`}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={108}
                height={108}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {item.type === "video" && (
                <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/65 text-white text-[7px] font-medium leading-none">
                  {item.duration || "VID"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Edge Soft Gradient Fade matching mockup */}
      <div
        className={`${styles.historyRightFade} pointer-events-none absolute right-0 top-0 bottom-0 w-16 rounded-r-[16px]`}
        aria-hidden="true"
      />
    </section>
  );
}
