"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FomiLogo,
  SparkleGenerateIcon,
  SplitCompareIcon,
  GitBranchIcon,
  DownloadIcon,
  HeartIcon,
} from "@/components/icons/FomiIcons";
import {
  STUDIO_PROJECT,
  EXACT_MOCKUP_PROMPT,
  HISTORY_ITEMS,
} from "@/data/mockGenerations";
import styles from "./StudioPartB.module.css";

export default function StudioPartB({
  onSwitchToPartA,
  onOpenProductDoc,
}) {
  // Active viewport mode: 'canvas' | 'compare' | 'contact'
  const [viewMode, setViewMode] = useState("canvas");

  // Active selected shot & comparison shot
  const [shots, setShots] = useState([
    {
      id: "shot-1",
      version: "v2.0 Hero",
      label: "Take 04 • Gallery Key Light",
      src: "/assets/mockup/portrait-1.webp",
      promptDelta: "+ 45° directional key light + warm cashmere micro-contrast",
      seed: 482914,
      rating: 5,
      isSelect: true,
      aspect: "3:4",
      lens: "85mm f/1.4",
    },
    {
      id: "shot-2",
      version: "v1.8 Front",
      label: "Take 03 • Neutral Eye-Level",
      src: "/assets/mockup/portrait-2.webp",
      promptDelta: "+ Direct eye contact + balanced softbox fill",
      seed: 482915,
      rating: 4,
      isSelect: true,
      aspect: "3:4",
      lens: "85mm f/1.4",
    },
    {
      id: "shot-3",
      version: "v1.4 Profile",
      label: "Take 02 • Over-Shoulder Turn",
      src: "/assets/mockup/portrait-3.webp",
      promptDelta: "+ 3/4 profile turn + gold drop earring highlight",
      seed: 482916,
      rating: 4,
      isSelect: false,
      aspect: "3:4",
      lens: "85mm f/1.4",
    },
    {
      id: "shot-4",
      version: "v2.1 Golden",
      label: "Take 05 • Warm Rim Specular",
      src: "/assets/mockup/portrait-4.webp",
      promptDelta: "+ Afternoon tungsten rim light + deeper gallery bokeh",
      seed: 482917,
      rating: 5,
      isSelect: true,
      aspect: "3:4",
      lens: "85mm f/1.4",
    },
    {
      id: "shot-5",
      version: "v2.2 Nocturne",
      label: "Take 06 • Astral Concept B",
      src: "/assets/mockup/cosmic-3.webp",
      promptDelta: "+ Surreal twilight cloud stairway exterior test",
      seed: 910283,
      rating: 4,
      isSelect: false,
      aspect: "3:4",
      lens: "35mm f/1.8",
    },
    {
      id: "shot-6",
      version: "v2.3 Mirror",
      label: "Take 07 • Gilded Reflection",
      src: "/assets/mockup/history-4.webp",
      promptDelta: "+ Baroque brass mirror framing + sage editorial blazer",
      seed: 512980,
      rating: 5,
      isSelect: true,
      aspect: "3:4",
      lens: "50mm f/1.2",
    },
  ]);

  const [activeShotId, setActiveShotId] = useState("shot-1");
  const [compareShotId, setCompareShotId] = useState("shot-2");
  const [compareSplit, setCompareSplit] = useState(52); // percentage for A/B slider

  // Visual DNA Tokens state
  const [dnaTokens, setDnaTokens] = useState(STUDIO_PROJECT.dnaTokens);

  // Interactive 2D Relighting & Camera Director Pad state
  const [lightPos, setLightPos] = useState({ x: 28, y: 26 }); // percentage in 2D pad
  const [lightTemp, setLightTemp] = useState(5200); // Kelvin: 3200K warm to 7500K cool
  const [lightIntensity, setLightIntensity] = useState(68);
  const [showGridGuides, setShowGridGuides] = useState(false);

  // Composer prompt & generation state
  const [directorPrompt, setDirectorPrompt] = useState(
    "Subtle three-quarter turn towards camera, warm afternoon directional gallery key light catching auburn hair curls, cream cashmere texture."
  );
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const padRef = useRef(null);

  const activeShot = shots.find((s) => s.id === activeShotId) || shots[0];
  const compareShot = shots.find((s) => s.id === compareShotId) || shots[1];

  const toggleDnaToken = (id) => {
    setDnaTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const toggleShotSelect = (id) => {
    setShots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isSelect: !s.isSelect } : s))
    );
  };

  const handlePadPointer = (e) => {
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 8), 92);
    const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 8), 92);
    setLightPos({ x: Math.round(x), y: Math.round(y) });
  };

  const handleDirectorGenerate = async () => {
    if (isSynthesizing) return;
    setIsSynthesizing(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${directorPrompt} (${EXACT_MOCKUP_PROMPT})`,
          type: "image",
          count: 1,
          aspectRatio: "3:4",
          model: "Soul 2.0",
        }),
      });
      const data = await res.json();
      await new Promise((r) => setTimeout(r, 950));
      if (data.success && data.batch?.outputs?.[0]) {
        const out = data.batch.outputs[0];
        const newId = `shot-${Date.now()}`;
        const newShot = {
          id: newId,
          version: `v2.${shots.length - 2} Branch`,
          label: `Take 0${shots.length + 1} • Key (${lightPos.x}%, ${lightPos.y}%)`,
          src: out.src,
          promptDelta: `+ ${directorPrompt.slice(0, 62)}...`,
          seed: out.seed,
          rating: 5,
          isSelect: true,
          aspect: "3:4",
          lens: "85mm f/1.4",
        };
        setShots((prev) => [newShot, ...prev]);
        setActiveShotId(newId);
      }
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Compute dynamic directional lighting overlay color from Kelvin temperature
  const lightOverlayColor =
    lightTemp < 4500
      ? "rgba(255, 172, 105, 0.28)"
      : lightTemp > 6000
      ? "rgba(145, 195, 255, 0.24)"
      : "rgba(255, 232, 210, 0.22)";

  const selectsCount = shots.filter((s) => s.isSelect).length;

  return (
    <div
      className={`${styles.studioContainer} min-h-screen w-full flex flex-col select-none overflow-x-hidden`}
    >
      {/* Top Studio Pro Bar: Project Context + Viewport Switcher + Actions */}
      <header className="w-full h-14 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-[#121010]/90 backdrop-blur-md z-30">
        {/* Left: Brand + Active Returning Project Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onSwitchToPartA}
            className="flex items-center gap-2 text-[#F4EFEC] hover:text-[#D17D60] transition-colors focus:outline-none"
            title="Return to Part A Mockup View"
          >
            <FomiLogo className="w-5 h-6" />
          </button>

          <span className="text-white/20">/</span>

          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded-md bg-[#D17D60]/20 text-[#E5987D] border border-[#D17D60]/30 text-[10px] font-semibold uppercase tracking-wider shrink-0">
              Part B Studio
            </span>
            <h1 className="text-xs sm:text-sm font-semibold text-[#F4EFEC] truncate">
              {STUDIO_PROJECT.name}
            </h1>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-white/45 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {STUDIO_PROJECT.activeSessionTime}
            </span>
          </div>
        </div>

        {/* Center: 3-Mode Professional Viewport Switcher */}
        <div
          role="tablist"
          aria-label="Studio viewport mode"
          className="hidden sm:flex items-center bg-[#1B1817] p-1 rounded-xl border border-white/10"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "canvas"}
            onClick={() => setViewMode("canvas")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "canvas"
                ? "bg-[#D17D60] text-white shadow-xs"
                : "text-white/65 hover:text-white"
            }`}
          >
            Director Canvas
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "compare"}
            onClick={() => setViewMode("compare")}
            className={`px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all ${
              viewMode === "compare"
                ? "bg-[#D17D60] text-white shadow-xs"
                : "text-white/65 hover:text-white"
            }`}
          >
            <SplitCompareIcon className="w-3.5 h-3.5" />
            <span>A/B Loupe Compare</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "contact"}
            onClick={() => setViewMode("contact")}
            className={`px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all ${
              viewMode === "contact"
                ? "bg-[#D17D60] text-white shadow-xs"
                : "text-white/65 hover:text-white"
            }`}
          >
            <GitBranchIcon className="w-3.5 h-3.5" />
            <span>Lineage & Contact Sheet</span>
          </button>
        </div>

        {/* Right: Product Thinking Doc + Part A Switch */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenProductDoc}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F4EFEC] border border-white/15 text-xs font-medium transition-colors"
          >
            📄 Product Thinking Doc
          </button>
          <button
            type="button"
            onClick={onSwitchToPartA}
            className="px-3 py-1.5 rounded-xl bg-[#25201E] hover:bg-[#302926] text-[#E5987D] border border-[#D17D60]/30 text-xs font-medium transition-colors"
          >
            ← Part A Mockup
          </button>
        </div>
      </header>

      {/* Mobile Viewport Mode Bar */}
      <div className="flex sm:hidden items-center justify-center gap-1 p-2 bg-[#161312] border-b border-white/10">
        {["canvas", "compare", "contact"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setViewMode(m)}
            className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
              viewMode === m ? "bg-[#D17D60] text-white" : "text-white/60"
            }`}
          >
            {m === "compare" ? "A/B Compare" : m === "contact" ? "Lineage Sheet" : "Canvas"}
          </button>
        ))}
      </div>

      {/* Main 3-Column Pro Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[270px_1fr_300px] xl:grid-cols-[290px_1fr_320px] min-h-[calc(100vh-3.5rem)]">
        {/* LEFT PANEL: Shot Lineage Tree & Campaign Selects Tray */}
        <aside
          aria-label="Campaign Lineage & Selects"
          className="border-b lg:border-b-0 lg:border-r border-white/10 bg-[#121010]/80 p-4 flex flex-col justify-between gap-4"
        >
          <div className="space-y-4">
            {/* Character Consistency Lock Card */}
            <div className="rounded-2xl bg-[#1B1817] border border-white/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5987D]">
                  Character Identity Lock
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono">
                  {STUDIO_PROJECT.lockedCharacter.consistencyScore} Lock
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={STUDIO_PROJECT.lockedCharacter.avatar}
                  alt={STUDIO_PROJECT.lockedCharacter.name}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-[#D17D60]"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{STUDIO_PROJECT.lockedCharacter.name}</span>
                    <span className="text-[10px] font-mono text-white/50">
                      #{STUDIO_PROJECT.lockedCharacter.seed}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-white/60 truncate mt-0.5">
                    Auburn curls • Cream cashmere • Gallery
                  </p>
                </div>
              </div>
            </div>

            {/* Iteration Lineage Stream (Solves "Endless Chat Scroll" Problem) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Version Lineage ({shots.length} Takes)
                </h2>
                <span className="text-[10.5px] text-[#E5987D] font-medium">
                  {selectsCount} Starred ★
                </span>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {shots.map((shot) => {
                  const isCurrent = shot.id === activeShotId;
                  const isCompare = shot.id === compareShotId;
                  return (
                    <div
                      key={shot.id}
                      onClick={() => setActiveShotId(shot.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setActiveShotId(shot.id);
                      }}
                      className={`group rounded-2xl p-2 border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isCurrent
                          ? "bg-[#D17D60]/15 border-[#D17D60]"
                          : "bg-[#191615] border-white/8 hover:border-white/25"
                      }`}
                    >
                      <div className="relative w-12 h-14 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={shot.src}
                          alt={shot.label}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-bold text-white truncate">
                            {shot.version}
                          </span>
                          <div className="flex items-center gap-1">
                            {viewMode === "compare" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCompareShotId(shot.id);
                                }}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  isCompare
                                    ? "bg-sky-500 text-white"
                                    : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                                title="Set as B comparison image"
                              >
                                B
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleShotSelect(shot.id);
                              }}
                              aria-label="Toggle client shortlist star"
                              className={`text-xs ${
                                shot.isSelect ? "text-amber-400" : "text-white/25 hover:text-white/60"
                              }`}
                            >
                              ★
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] text-emerald-300/85 truncate mt-0.5 font-mono">
                          {shot.promptDelta}
                        </p>
                        <div className="text-[9.5px] text-white/45 mt-0.5">
                          {shot.lens} • Seed #{shot.seed}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Quick Reference Strip from Session History */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-2">
              Moodboard Reference Palette
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {HISTORY_ITEMS.slice(0, 5).map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() =>
                    setDirectorPrompt(
                      `Blend mood reference "${h.title}": ${h.prompt.slice(0, 80)}`
                    )
                  }
                  title={`Inject style from: ${h.title}`}
                  className="relative aspect-square rounded-lg overflow-hidden ring-1 ring-white/15 hover:ring-[#D17D60] transition-all"
                >
                  <Image
                    src={h.thumbnail}
                    alt={h.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER STAGE: Hero Director Canvas / A-B Compare / Contact Sheet + Bottom DNA Composer */}
        <section
          aria-label="Primary Creative Stage"
          className={`${styles.canvasStage} relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden`}
        >
          {/* Top Canvas HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                {activeShot.label}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-white/75">
                {activeShot.lens} • 1536×2048 RAW
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowGridGuides((g) => !g)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  showGridGuides
                    ? "bg-[#D17D60]/25 border-[#D17D60] text-[#E5987D]"
                    : "bg-black/55 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                ⊞ Rule of Thirds
              </button>
              <a
                href={activeShot.src}
                download={`fomi-studio-${activeShot.version}.webp`}
                className="px-3 py-1 rounded-full bg-black/55 hover:bg-black/80 border border-white/10 text-xs font-medium text-white inline-flex items-center gap-1.5"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Export EXR/WebP</span>
              </a>
            </div>
          </div>

          {/* Viewport Body */}
          <div className="my-4 flex-1 flex items-center justify-center min-h-[380px]">
            {viewMode === "canvas" && (
              <div className="relative w-full max-w-[410px] aspect-[119/171] rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.75)] ring-1 ring-white/15 group">
                <Image
                  src={activeShot.src}
                  alt={activeShot.label}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  priority
                  className="object-cover"
                />

                {/* Real-time Interactive 2D Relighting Shader Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 transition-all duration-150 mix-blend-soft-light"
                  style={{
                    background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, ${lightOverlayColor} 0%, rgba(0,0,0,${
                      (100 - lightIntensity) * 0.005
                    }) 75%)`,
                  }}
                />

                {/* Optional Rule-of-Thirds Composition Grid */}
                {showGridGuides && (
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>
                )}

                {/* Active Synthesis Overlay */}
                {isSynthesizing && (
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-white">
                    <SparkleGenerateIcon className="w-8 h-8 text-[#D17D60] animate-spin" />
                    <div className="text-xs font-semibold tracking-wide">
                      Relighting & Synthesizing Take...
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === "compare" && (
              <div className="w-full max-w-[440px] flex flex-col items-center gap-3">
                <div className="relative w-full aspect-[119/171] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 select-none">
                  {/* Image B (Underneath) */}
                  <Image
                    src={compareShot.src}
                    alt={compareShot.label}
                    fill
                    sizes="440px"
                    className="object-cover"
                  />
                  {/* Image A (Clipped bycompareSplit%) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - compareSplit}% 0 0)` }}
                  >
                    <Image
                      src={activeShot.src}
                      alt={activeShot.label}
                      fill
                      sizes="440px"
                      className="object-cover"
                    />
                  </div>

                  {/* Vertical Split Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.9)] cursor-ew-resize"
                    style={{ left: `${compareSplit}%` }}
                  >
                    <div className=" -translate-x-1/2 top-1/2 -translate-y-1/2 absolute w-7 h-7 rounded-full bg-[#D17D60] text-white text-[10px] font-bold flex items-center justify-center shadow-lg border border-white">
                      ⇄
                    </div>
                  </div>

                  {/* A & B Badges */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#D17D60] text-white text-[10px] font-bold">
                    A: {activeShot.version}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-sky-600 text-white text-[10px] font-bold">
                    B: {compareShot.version}
                  </span>
                </div>

                {/* Accessible Range Control for Split Loupe */}
                <div className="w-full flex items-center gap-3 px-2">
                  <span className="text-[11px] text-white/60">A/B Wipe</span>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={compareSplit}
                    onChange={(e) => setCompareSplit(Number(e.target.value))}
                    aria-label="Comparison split percentage"
                    className="flex-1 accent-[#D17D60] cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-white/80">
                    {compareSplit}%
                  </span>
                </div>
              </div>
            )}

            {viewMode === "contact" && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
                {shots.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setActiveShotId(s.id);
                      setViewMode("canvas");
                    }}
                    role="button"
                    tabIndex={0}
                    className={`group rounded-2xl overflow-hidden border bg-[#181514] transition-all cursor-pointer hover:-translate-y-1 ${
                      s.id === activeShotId
                        ? "border-[#D17D60] ring-2 ring-[#D17D60]/40"
                        : "border-white/10"
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={s.src}
                        alt={s.label}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/65 text-white text-[10px] font-semibold">
                        {s.version}
                      </span>
                      {s.isSelect && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-bold">
                          ★ Select
                        </span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <div className="text-xs font-semibold text-white truncate">
                        {s.label}
                      </div>
                      <p className="text-[10px] text-emerald-300/80 truncate mt-0.5 font-mono">
                        {s.promptDelta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Directorial Prompt & Visual DNA Dock */}
          <div
            className={`${styles.dockGlass} w-full max-w-3xl mx-auto rounded-3xl p-3.5 border border-white/12 shadow-2xl z-20`}
          >
            {/* Visual DNA Lock Pills Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2 border-b border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/45 mr-1 shrink-0">
                Visual DNA:
              </span>
              {dnaTokens.map((dna) => (
                <button
                  key={dna.id}
                  type="button"
                  onClick={() => toggleDnaToken(dna.id)}
                  className={`px-2.5 py-1 rounded-full text-[10.5px] font-medium inline-flex items-center gap-1.5 shrink-0 border transition-all ${
                    dna.active
                      ? "bg-[#D17D60]/20 border-[#D17D60] text-[#F4EFEC]"
                      : "bg-white/5 border-white/10 text-white/40 line-through"
                  }`}
                  title={`${dna.category}: ${dna.value} (Click to toggle lock)`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dna.color }}
                  />
                  <span className="font-mono font-semibold">{dna.token}</span>
                  <span className="text-[9.5px] opacity-70 hidden sm:inline">
                    {dna.value}
                  </span>
                </button>
              ))}
            </div>

            {/* Directorial Delta Prompt Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex-1">
                <label htmlFor="director-prompt" className="sr-only">
                  Directorial scene adjustment prompt
                </label>
                <input
                  id="director-prompt"
                  type="text"
                  value={directorPrompt}
                  onChange={(e) => setDirectorPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleDirectorGenerate();
                  }}
                  placeholder="Direct the next take (e.g., 'turn 15° left, softer north window fill')..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none px-1"
                />
              </div>

              <button
                type="button"
                onClick={handleDirectorGenerate}
                disabled={isSynthesizing}
                className="px-5 py-2.5 rounded-2xl bg-[#D17D60] hover:bg-[#E08B6D] disabled:opacity-60 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
              >
                <SparkleGenerateIcon
                  className={`w-4 h-4 ${isSynthesizing ? "animate-spin" : ""}`}
                />
                <span>{isSynthesizing ? "Shooting Take..." : "Shoot New Take"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Tactile 2D Lighting & Camera Director Inspector */}
        <aside
          aria-label="Tactile Lighting and Optics Inspector"
          className="border-t lg:border-t-0 lg:border-l border-white/10 bg-[#121010]/80 p-4 flex flex-col justify-between gap-4"
        >
          <div className="space-y-5">
            {/* Interactive 2D Key Light Direction Pad */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Interactive 2D Key Light Rig
                </h2>
                <span className="text-[10.5px] font-mono text-[#E5987D]">
                  X:{lightPos.x}% Y:{lightPos.y}%
                </span>
              </div>
              <p className="text-[11px] text-white/50 mb-2.5">
                Drag the virtual key-light puck to relight the subject in real time without rewriting prompts.
              </p>

              <div
                ref={padRef}
                onClick={handlePadPointer}
                onMouseMove={(e) => {
                  if (e.buttons === 1) handlePadPointer(e);
                }}
                role="slider"
                aria-label="2D Key Light Position Pad"
                aria-valuenow={lightPos.x}
                tabIndex={0}
                className={`${styles.lightingPad} relative w-full h-44 rounded-2xl border border-white/15 cursor-crosshair overflow-hidden flex items-center justify-center`}
              >
                {/* Concentric Radar Rings */}
                <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[9px] text-white/60 font-medium">
                    Subject
                  </div>
                </div>

                {/* Draggable Key Light Orb */}
                <div
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B076] shadow-[0_0_20px_#D17D60] ring-2 ring-white flex items-center justify-center text-[9px] font-bold text-black pointer-events-none"
                  style={{ left: `${lightPos.x}%`, top: `${lightPos.y}%` }}
                >
                  ☀
                </div>
              </div>
            </div>

            {/* Color Temperature & Intensity Sliders */}
            <div className="space-y-3 rounded-2xl bg-[#191615] p-3.5 border border-white/8">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/75">Color Temp (Kelvin)</span>
                  <span className="font-mono text-[#E5987D]">{lightTemp}K</span>
                </div>
                <input
                  type="range"
                  min="3200"
                  max="7500"
                  step="100"
                  value={lightTemp}
                  onChange={(e) => setLightTemp(Number(e.target.value))}
                  aria-label="Color temperature in Kelvin"
                  className="w-full accent-[#D17D60] cursor-pointer"
                />
                <div className="flex justify-between text-[9.5px] text-white/40 mt-0.5">
                  <span>3200K Tungsten</span>
                  <span>5200K Gallery</span>
                  <span>7500K Cool Sky</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/75">Key Light Fill Ratio</span>
                  <span className="font-mono text-[#E5987D]">{lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(Number(e.target.value))}
                  aria-label="Key light fill intensity"
                  className="w-full accent-[#D17D60] cursor-pointer"
                />
              </div>
            </div>

            {/* Optical Lens & Depth of Field Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Optical Prime Lens
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { lens: "35mm", desc: "Env Wide" },
                  { lens: "50mm", desc: "Human Eye" },
                  { lens: "85mm", desc: "Portrait f/1.4" },
                ].map((item) => {
                  const active = activeShot.lens.startsWith(item.lens);
                  return (
                    <button
                      key={item.lens}
                      type="button"
                      onClick={() =>
                        setShots((prev) =>
                          prev.map((s) =>
                            s.id === activeShotId
                              ? { ...s, lens: `${item.lens} f/1.4` }
                              : s
                          )
                        )
                      }
                      className={`p-2 rounded-xl border text-left transition-all ${
                        active
                          ? "bg-[#D17D60]/20 border-[#D17D60] text-white"
                          : "bg-[#191615] border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.lens}</div>
                      <div className="text-[9.5px] opacity-65">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Why This Design Matters Callout Box */}
          <div className="rounded-2xl bg-gradient-to-br from-[#D17D60]/20 to-[#1B1817] border border-[#D17D60]/35 p-3.5">
            <div className="text-xs font-bold text-[#F4EFEC] mb-1">
              Why Fomi Director Studio?
            </div>
            <p className="text-[10.5px] text-white/75 leading-relaxed mb-2.5">
              Replaces trial-and-error &ldquo;slot machine prompting&rdquo; with locked Character DNA, tactile 2D relighting, and A/B Loupe comparison.
            </p>
            <button
              type="button"
              onClick={onOpenProductDoc}
              className="w-full py-2 rounded-xl bg-[#D17D60] hover:bg-[#E08B6D] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Read Full Product Thinking Doc →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
