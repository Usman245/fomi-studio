"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  SparkleGenerateIcon,
  ChevronDownIcon,
} from "@/components/icons/FomiIcons";
import { AI_MODELS, STYLE_PRESETS, EXACT_MOCKUP_PROMPT } from "@/data/mockGenerations";

export default function ControlSidebar({
  mode = "image",
  onModeChange,
  prompt,
  onPromptChange,
  imageCount,
  onImageCountChange,
  aspectRatio,
  onAspectRatioChange,
  selectedModel,
  onModelChange,
  selectedStyle,
  onStyleChange,
  cfgScale,
  onCfgScaleChange,
  negativePrompt,
  onNegativePromptChange,
  onGenerate,
  isGenerating = false,
  darkMode = false,
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'count' | 'ratio' | 'model' | null
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onGenerate();
    }
  };

  const ratioOptions = ["1:1", "3:4", "4:3", "16:9", "9:16"];
  const countOptions = [1, 2, 4];

  return (
    <aside
      aria-label="Generation Parameters"
      className={`w-full lg:w-[238px] xl:w-[256px] shrink-0 rounded-[22px] p-3.5 flex flex-col justify-between transition-colors select-none ${
        darkMode
          ? "bg-[#1B1817] border border-[#2C2624]"
          : "bg-[#F6EEEA] border border-[#EFE3DC]/70"
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Top Segmented Toggle: Image / Video */}
        <div
          role="tablist"
          aria-label="Content generation type"
          className={`w-full rounded-full p-1 grid grid-cols-2 items-center ${
            darkMode ? "bg-[#12100F]" : "bg-white"
          }`}
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "image"}
            onClick={() => onModeChange("image")}
            className={`py-1.5 rounded-full text-[11px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
              mode === "image"
                ? darkMode
                  ? "bg-[#2E2421] text-[#F5F0ED] shadow-2xs"
                  : "bg-[#F4E6E4] text-[#221D1B]"
                : darkMode
                ? "text-[#8C827D] hover:text-[#E5DDD8]"
                : "text-[#4A4340] hover:text-[#191615]"
            }`}
          >
            Image
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "video"}
            onClick={() => onModeChange("video")}
            className={`py-1.5 rounded-full text-[11px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
              mode === "video"
                ? darkMode
                  ? "bg-[#2E2421] text-[#F5F0ED] shadow-2xs"
                  : "bg-[#F4E6E4] text-[#221D1B]"
                : darkMode
                ? "text-[#8C827D] hover:text-[#E5DDD8]"
                : "text-[#4A4340] hover:text-[#191615]"
            }`}
          >
            Video
          </button>
        </div>

        {/* Prompt Box with Dark Crisp Border & Bottom-Right Generate Button */}
        <div
          className={`rounded-[18px] p-3.5 flex flex-col justify-between min-h-[168px] sm:min-h-[176px] border transition-shadow ${
            darkMode
              ? "bg-[#12100F] border-[#524844] focus-within:border-[#E08B6D]"
              : "bg-white border-[#2E2927] focus-within:ring-2 focus-within:ring-[#D17D60]/25"
          }`}
        >
          <label htmlFor="fomi-prompt-input" className="sr-only">
            Describe your imagination to convert into art
          </label>
          <textarea
            id="fomi-prompt-input"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Describe you imaginations to be converted to piece of art ...."
            className={`w-full resize-none bg-transparent text-[11px] leading-[1.48] focus:outline-none placeholder:text-[11px] ${
              darkMode
                ? "text-[#F5F0ED] placeholder:text-[#7D736E]"
                : "text-[#2B2623] placeholder:text-[#4F4845]"
            }`}
          />

          <div className="flex items-center justify-between pt-2">
            {/* Subtle quick-fill button if empty */}
            {!prompt ? (
              <button
                type="button"
                onClick={() => onPromptChange(EXACT_MOCKUP_PROMPT)}
                className={`text-[9.5px] underline decoration-dotted underline-offset-2 transition-opacity opacity-65 hover:opacity-100 ${
                  darkMode ? "text-[#B8ADA8]" : "text-[#7A6F6A]"
                }`}
                title="Fill with sample portrait prompt"
              >
                + Sample prompt
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onPromptChange("")}
                className={`text-[9.5px] transition-opacity opacity-60 hover:opacity-100 ${
                  darkMode ? "text-[#B8ADA8]" : "text-[#7A6F6A]"
                }`}
                title="Clear prompt"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating}
              aria-busy={isGenerating}
              className="bg-[#DC9D86] hover:bg-[#CF8A70] active:scale-[0.98] disabled:opacity-65 text-white font-medium text-[12px] px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#D17D60]"
            >
              <SparkleGenerateIcon
                className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              <span>{isGenerating ? "Creating..." : "Generate"}</span>
            </button>
          </div>
        </div>

        {/* 3 Parameter Dropdown Pills Row (# Images | 1:1 | Model: Name) */}
        <div className="grid grid-cols-[1.05fr_0.72fr_1.35fr] gap-1.5 relative pt-0.5">
          {/* 1. # Images Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("count")}
              aria-expanded={openDropdown === "count"}
              aria-haspopup="listbox"
              className={`w-full rounded-full px-2.5 py-1.5 text-[9.5px] font-medium flex items-center justify-between gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
                darkMode
                  ? "bg-[#12100F] text-[#E5DDD8] hover:bg-[#24201E]"
                  : "bg-white text-[#221E1C] hover:bg-[#FFFDFB]"
              }`}
            >
              <span className="truncate">
                {imageCount === 4 ? "# Images" : `${imageCount} Image${imageCount > 1 ? "s" : ""}`}
              </span>
              <ChevronDownIcon className="w-2.5 h-2.5 shrink-0 opacity-75" />
            </button>

            {openDropdown === "count" && (
              <ul
                role="listbox"
                className={`absolute left-0 top-full mt-1 w-28 rounded-xl p-1 shadow-lg border z-40 text-[10.5px] ${
                  darkMode
                    ? "bg-[#1E1A18] border-[#332C29] text-[#F5F0ED]"
                    : "bg-white border-[#EBE0DA] text-[#221E1C]"
                }`}
              >
                {countOptions.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => {
                        onImageCountChange(c);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        imageCount === c
                          ? "bg-[#D17D60]/15 text-[#D17D60] font-semibold"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <span>{c} {c === 1 ? "Image" : "Images"}</span>
                      {imageCount === c && <span>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2. Aspect Ratio Pill (1:1) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("ratio")}
              aria-expanded={openDropdown === "ratio"}
              aria-haspopup="listbox"
              className={`w-full rounded-full px-2.5 py-1.5 text-[9.5px] font-medium flex items-center justify-between gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
                darkMode
                  ? "bg-[#12100F] text-[#E5DDD8] hover:bg-[#24201E]"
                  : "bg-white text-[#221E1C] hover:bg-[#FFFDFB]"
              }`}
            >
              <span>{aspectRatio}</span>
              <ChevronDownIcon className="w-2.5 h-2.5 shrink-0 opacity-75" />
            </button>

            {openDropdown === "ratio" && (
              <ul
                role="listbox"
                className={`absolute left-0 top-full mt-1 w-28 rounded-xl p-1 shadow-lg border z-40 text-[10.5px] ${
                  darkMode
                    ? "bg-[#1E1A18] border-[#332C29] text-[#F5F0ED]"
                    : "bg-white border-[#EBE0DA] text-[#221E1C]"
                }`}
              >
                {ratioOptions.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      onClick={() => {
                        onAspectRatioChange(r);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        aspectRatio === r
                          ? "bg-[#D17D60]/15 text-[#D17D60] font-semibold"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <span>Ratio {r}</span>
                      {aspectRatio === r && <span>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. Model: Name Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("model")}
              aria-expanded={openDropdown === "model"}
              aria-haspopup="listbox"
              className={`w-full rounded-full px-2.5 py-1.5 text-[9.5px] flex items-center justify-between gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
                darkMode
                  ? "bg-[#12100F] text-[#E5DDD8] hover:bg-[#24201E]"
                  : "bg-white text-[#221E1C] hover:bg-[#FFFDFB]"
              }`}
            >
              <span className="truncate">
                Model: <strong className="font-bold">{selectedModel}</strong>
              </span>
              <ChevronDownIcon className="w-2.5 h-2.5 shrink-0 opacity-75" />
            </button>

            {openDropdown === "model" && (
              <ul
                role="listbox"
                className={`absolute right-0 top-full mt-1 w-44 rounded-xl p-1 shadow-lg border z-40 text-[10.5px] ${
                  darkMode
                    ? "bg-[#1E1A18] border-[#332C29] text-[#F5F0ED]"
                    : "bg-white border-[#EBE0DA] text-[#221E1C]"
                }`}
              >
                {AI_MODELS.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onModelChange(m.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        selectedModel === m.id
                          ? "bg-[#D17D60]/15 text-[#D17D60] font-semibold"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <div>
                        <div className="font-medium">{m.fullName}</div>
                        <div className="text-[9px] opacity-65">Avg speed {m.speed}</div>
                      </div>
                      <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-black/5">
                        {m.badge}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Advance Pill Accordion */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setAdvanceOpen((prev) => !prev)}
            aria-expanded={advanceOpen}
            className={`w-full rounded-full py-2.5 px-4 relative flex items-center justify-center text-[12px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
              darkMode
                ? "bg-[#12100F] text-[#F5F0ED] hover:bg-[#221E1C]"
                : "bg-white text-[#1E1B19] hover:bg-[#FFFDFB] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            }`}
          >
            <span>Advance</span>
            <ChevronDownIcon
              className={`w-3 h-3 absolute right-5 transition-transform duration-200 ${
                advanceOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {advanceOpen && (
            <div
              className={`mt-2 rounded-2xl p-3 text-[10.5px] space-y-2.5 border transition-all ${
                darkMode
                  ? "bg-[#12100F] border-[#2C2624] text-[#D8CEC9]"
                  : "bg-white/90 border-[#EBE0DA] text-[#3B3431]"
              }`}
            >
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="cfg-slider" className="font-medium">
                    Prompt Guidance (CFG)
                  </label>
                  <span className="font-mono text-[#D17D60]">{cfgScale.toFixed(1)}</span>
                </div>
                <input
                  id="cfg-slider"
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={cfgScale}
                  onChange={(e) => onCfgScaleChange( parseFloat(e.target.value) )}
                  className="w-full accent-[#D17D60] h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="neg-prompt" className="block font-medium mb-1">
                  Negative Prompt
                </label>
                <input
                  id="neg-prompt"
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => onNegativePromptChange(e.target.value)}
                  placeholder="blurry, low contrast, watermark..."
                  className={`w-full rounded-lg px-2.5 py-1.5 text-[10px] border focus:outline-none focus:border-[#D17D60] ${
                    darkMode
                      ? "bg-[#1B1817] border-[#332C29] text-[#F5F0ED]"
                      : "bg-[#FAF6F4] border-[#E6D9D2] text-[#221E1C]"
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Styles Pill Accordion */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setStylesOpen((prev) => !prev)}
            aria-expanded={stylesOpen}
            className={`w-full rounded-full py-2.5 px-4 relative flex items-center justify-center text-[12px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
              darkMode
                ? "bg-[#12100F] text-[#F5F0ED] hover:bg-[#221E1C]"
                : "bg-white text-[#1E1B19] hover:bg-[#FFFDFB] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            }`}
          >
            <span>
              Styles{selectedStyle ? ` • ${selectedStyle}` : ""}
            </span>
            <ChevronDownIcon
              className={`w-3 h-3 absolute right-5 transition-transform duration-200 ${
                stylesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {stylesOpen && (
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {STYLE_PRESETS.map((preset) => {
                const active = selectedStyle === preset.name;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      onStyleChange(active ? "" : preset.name, preset.promptSuffix)
                    }
                    className={`group rounded-xl p-1.5 text-left border transition-all flex items-center gap-2 ${
                      active
                        ? "border-[#D17D60] bg-[#D17D60]/10"
                        : darkMode
                        ? "border-[#2C2624] bg-[#12100F] hover:border-[#453B37]"
                        : "border-[#EBE0DA] bg-white hover:border-[#D17D60]/50"
                    }`}
                  >
                    <Image
                      src={preset.thumb}
                      alt={preset.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold truncate">
                        {preset.name}
                      </div>
                      <div className="text-[8.5px] opacity-65 truncate">
                        {preset.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Spacer matching the generous peach padding at bottom of sidebar in mockup */}
      <div className="h-8 lg:h-12" aria-hidden="true" />
    </aside>
  );
}
