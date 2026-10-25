"use client";

import React from "react";
import Image from "next/image";
import {
  ExpandIcon,
  RemixIcon,
  DownloadIcon,
  HeartIcon,
  PlayIcon,
} from "@/components/icons/FomiIcons";
import styles from "./WorkspacePartA.module.css";

export default function GenerationFeed({
  batches = [],
  isGenerating = false,
  pendingPrompt = "",
  pendingCount = 4,
  favorites = {},
  onToggleFavorite,
  onInspectOutput,
  onReusePrompt,
  darkMode = false,
}) {
  const handleDownload = (e, output) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = output.src;
    link.download = `fomi-${output.seed || output.id}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`${styles.feedScroller} flex-1 flex flex-col gap-4 overflow-y-auto pr-1.5 pb-8`}
      role="feed"
      aria-busy={isGenerating}
      aria-label="Generated artwork feed"
    >
      {/* Active Generation Shimmer Row when user clicks Generate */}
      {isGenerating && (
        <article
          aria-label="Generating new artwork batch"
          className="flex flex-col md:flex-row gap-3.5 items-stretch animate-fadeIn"
        >
          <div
            className={`w-full md:w-[195px] xl:w-[215px] shrink-0 rounded-[18px] p-3.5 flex flex-col justify-between border ${
              darkMode
                ? "bg-[#1E1A18] border-[#332C29] text-[#E5DDD8]"
                : "bg-[#F8EDE8] border-[#EDE0D9] text-[#2B2623]"
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D17D60]/15 text-[#D17D60] text-[9.5px] font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D17D60] animate-ping" />
                Rendering Batch...
              </div>
              <p className="text-[10.5px] leading-[1.45] line-clamp-6 opacity-85">
                {pendingPrompt ||
                  "Synthesizing high-resolution creative variations with directional gallery lighting..."}
              </p>
            </div>
            <div className="flex justify-end mt-2">
              <span
                className={`px-3 py-1 rounded-[10px] text-[10px] font-medium ${
                  darkMode ? "bg-[#12100F] text-[#F5F0ED]" : "bg-white text-[#221E1C]"
                }`}
              >
                Model
              </span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
            {Array.from({ length: pendingCount || 4 }).map((_, idx) => (
              <div
                key={idx}
                className={`${styles.shimmerCard} aspect-[119/171] rounded-[14px] relative overflow-hidden flex flex-col items-center justify-end p-3 border ${
                  darkMode ? "border-[#2E2724]" : "border-[#EFE3DC]"
                }`}
              >
                <div className="w-full bg-black/25 backdrop-blur-xs rounded-lg px-2.5 py-1.5 text-white text-[9.5px] flex items-center justify-between">
                  <span>Pass {idx + 1}/4</span>
                  <span className="font-mono">78%</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* Render Feed Batches */}
      {batches.map((batch) => {
        // The first row in the mockup is partially scrolled under the floating History bar!
        if (batch.isTopCroppedPreview) {
          return (
            <article
              key={batch.id}
              aria-label="Previous portrait generation batch"
              className="flex flex-col md:flex-row gap-3.5 items-start -mt-6 sm:-mt-8"
            >
              {/* Top-cropped Prompt Card peeking out below History Strip */}
              <div className="hidden md:flex w-[195px] xl:w-[215px] shrink-0 flex-col">
                <button
                  type="button"
                  onClick={() => onReusePrompt(batch)}
                  title="Click to load this batch's prompt"
                  className={`w-full h-[64px] rounded-[16px] border transition-colors text-left px-3.5 pb-2.5 flex items-end justify-between ${
                    darkMode
                      ? "bg-[#1E1A18] border-[#2E2724] hover:border-[#D17D60]/50"
                      : "bg-[#F8EDE8] border-[#EBDDD5] hover:border-[#D17D60]/50"
                  }`}
                >
                  <span className="text-[9.5px] opacity-60 truncate">
                    Previous variation set
                  </span>
                </button>
              </div>

              {/* 4 Top-Cropped Portrait Cards matching top row of mockup */}
              <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {batch.outputs.map((output, idx) => {
                  const isFav = !!favorites[output.id];
                  return (
                    <div
                      key={output.id}
                      onClick={() => onInspectOutput(output, batch)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onInspectOutput(output, batch);
                        }
                      }}
                      className={`${styles.outputCard} relative h-[155px] sm:h-[185px] xl:h-[205px] rounded-[14px] overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60]`}
                    >
                      <Image
                        src={output.src}
                        alt={output.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        priority={idx < 2}
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Hover Overlay */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-2.5">
                        <span className="text-[9.5px] text-white/90 font-medium px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                          #{output.seed}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(output.id);
                            }}
                            aria-label="Favorite image"
                            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                              isFav
                                ? "bg-[#D17D60] text-white"
                                : "bg-black/45 text-white hover:bg-black/70"
                            }`}
                          >
                            <HeartIcon className="w-3 h-3" filled={isFav} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDownload(e, output)}
                            aria-label="Download image"
                            className="p-1.5 rounded-full bg-black/45 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
                          >
                            <DownloadIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        }

        // Standard Full Batch Row (Prompt Card on Left + 4 Portrait Cards on Right)
        return (
          <article
            key={batch.id}
            aria-label={`Generated batch for prompt: ${batch.prompt.slice(0, 50)}`}
            className="flex flex-col md:flex-row gap-3.5 items-stretch"
          >
            {/* Left Batch Prompt Card */}
            <div
              className={`w-full md:w-[195px] xl:w-[215px] shrink-0 rounded-[18px] p-3.5 flex flex-col justify-between border transition-colors ${
                darkMode
                  ? "bg-[#1E1A18] border-[#2E2724] text-[#E5DDD8]"
                  : "bg-[#F8EDE8] border-[#EBDDD5] text-[#2B2623]"
              }`}
            >
              <p className="text-[9.5px] xl:text-[10px] leading-[1.46] tracking-[-0.005em] select-text">
                {batch.prompt}
              </p>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={() => onReusePrompt(batch)}
                  title="Click to reuse this prompt & model in the sidebar"
                  className={`px-3 py-1 rounded-[10px] text-[10px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
                    darkMode
                      ? "bg-[#12100F] text-[#F5F0ED] hover:bg-[#292320]"
                      : "bg-white text-[#1E1A18] hover:bg-[#FFFDFB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  {batch.model || "Model"}
                </button>
              </div>
            </div>

            {/* Right 4-Column Portrait Output Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              {batch.outputs.map((output) => {
                const isFav = !!favorites[output.id];
                const isVideo = batch.type === "video" || output.type === "video";

                return (
                  <div
                    key={output.id}
                    onClick={() => onInspectOutput(output, batch)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onInspectOutput(output, batch);
                      }
                    }}
                    className={`${styles.outputCard} relative aspect-[119/171] rounded-[14px] overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60]`}
                  >
                    <Image
                      src={output.src}
                      alt={output.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* Video Badge if Video Mode */}
                    {isVideo && (
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-medium flex items-center gap-1">
                        <PlayIcon className="w-2.5 h-2.5 text-[#DC9D86]" />
                        <span>{output.duration || "0:05"} • 24fps</span>
                      </div>
                    )}

                    {/* Subtle Micro-Interaction Overlay on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent flex flex-col justify-between p-2.5">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReusePrompt(batch);
                          }}
                          title="Remix prompt"
                          aria-label="Remix prompt"
                          className="p-1.5 rounded-full bg-black/45 text-white hover:bg-black/75 backdrop-blur-md transition-colors"
                        >
                          <RemixIcon className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectOutput(output, batch);
                          }}
                          title="Inspect full resolution"
                          aria-label="Inspect full resolution"
                          className="p-1.5 rounded-full bg-black/45 text-white hover:bg-black/75 backdrop-blur-md transition-colors"
                        >
                          <ExpandIcon className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] text-white/90 font-mono px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-xs">
                          {output.resolution || "1536×2048"}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(output.id);
                            }}
                            aria-label="Favorite artwork"
                            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                              isFav
                                ? "bg-[#D17D60] text-white"
                                : "bg-black/45 text-white hover:bg-black/75"
                            }`}
                          >
                            <HeartIcon className="w-3 h-3" filled={isFav} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDownload(e, output)}
                            aria-label="Download artwork"
                            className="p-1.5 rounded-full bg-black/45 text-white hover:bg-black/75 backdrop-blur-md transition-colors"
                          >
                            <DownloadIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
