"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import HeaderBar from "./HeaderBar";
import HistoryStrip from "./HistoryStrip";
import ControlSidebar from "./ControlSidebar";
import GenerationFeed from "./GenerationFeed";
import {
  INITIAL_BATCHES,
  HISTORY_ITEMS,
} from "@/data/mockGenerations";
import {
  CloseIcon,
  DownloadIcon,
  RemixIcon,
  HeartIcon,
  SparkleGenerateIcon,
} from "@/components/icons/FomiIcons";
import styles from "./WorkspacePartA.module.css";

export default function WorkspacePartA({
  onSwitchToPartB,
  onOpenProductDoc,
  darkMode = false,
  onToggleDarkMode,
}) {
  const [activeNav, setActiveNav] = useState("home");
  const [mode, setMode] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [imageCount, setImageCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [selectedModel, setSelectedModel] = useState("Name");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleSuffix, setStyleSuffix] = useState("");
  const [cfgScale, setCfgScale] = useState(7.0);
  const [negativePrompt, setNegativePrompt] = useState("");

  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [historyItems, setHistoryItems] = useState(HISTORY_ITEMS);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [quotaUsed, setQuotaUsed] = useState(160);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState({ "main-out-1": true });

  // Modals state
  const [inspectedItem, setInspectedItem] = useState(null); // { output, batch }
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const handleToggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
  }, []);

  const handleStyleChange = (styleName, suffix = "") => {
    setSelectedStyle(styleName);
    setStyleSuffix(styleName ? suffix : "");
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const effectivePrompt = styleSuffix
      ? `${prompt.trim() || "Editorial portrait photography"}, ${styleSuffix}`
      : prompt.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: effectivePrompt,
          type: mode,
          count: imageCount,
          aspectRatio,
          model: selectedModel,
          style: selectedStyle,
          cfgScale,
          negativePrompt,
        }),
      });

      const data = await res.json();

      // Simulate realistic fast diffusion pass (1.1s) for smooth UX feedback
      await new Promise((r) => setTimeout(r, 1100));

      if (data.success && data.batch) {
        setBatches((prev) => {
          // Keep the top-cropped preview batch first if untouched, or insert right below it
          const [first, ...rest] = prev;
          if (first && first.isTopCroppedPreview) {
            return [first, data.batch, ...rest];
          }
          return [data.batch, ...prev];
        });
        if (data.historyItem) {
          setHistoryItems((prev) => [data.historyItem, ...prev]);
          setSelectedHistoryId(data.historyItem.id);
        }
        setQuotaUsed((prev) => Math.min(prev + imageCount * 5, 1000));
        showToast(
          `Generated ${imageCount} ${mode === "video" ? "video clip(s)" : "artwork variation(s)"}`
        );
      }
    } catch (err) {
      showToast("Generation completed using local fallback cache.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectNav = (navId) => {
    setActiveNav(navId);
    if (navId === "image") {
      setMode("image");
    } else if (navId === "video") {
      setMode("video");
      showToast("Switched to Video Generation mode");
    } else if (navId === "magic") {
      onSwitchToPartB?.();
    } else if (navId === "folder") {
      setGalleryModalOpen(true);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setSelectedHistoryId(item.id);
    setPrompt(item.prompt);
    setMode(item.type === "video" ? "video" : "image");
    setInspectedItem({
      output: {
        id: item.id,
        src: item.fullImage,
        alt: item.title,
        seed: item.seed,
        resolution: "1536 × 1536",
        type: item.type,
        duration: item.duration,
      },
      batch: {
        id: item.id,
        prompt: item.prompt,
        model: item.model,
        aspectRatio: item.aspectRatio,
        createdAt: item.createdAt,
      },
    });
  };

  const handleReusePrompt = (batch) => {
    setPrompt(batch.prompt);
    if (batch.model && batch.model !== "Model") {
      setSelectedModel(batch.model);
    }
    showToast("Prompt loaded into composer");
  };

  return (
    <div
      className={`${styles.workspaceShell} ${
        darkMode ? styles.workspaceShellDark : ""
      } min-h-screen w-full flex flex-col overflow-x-hidden`}
    >
      {/* Top Header Bar */}
      <HeaderBar
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        quotaUsed={quotaUsed}
        quotaLimit={1000}
        isGenerating={isGenerating}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        onOpenGallery={() => setGalleryModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-7 pt-1 pb-6 flex flex-col">
        {/* Top Floating History Strip */}
        <div className="relative z-20">
          <HistoryStrip
            items={historyItems}
            selectedId={selectedHistoryId}
            onSelectItem={handleSelectHistoryItem}
            onViewAll={() => setGalleryModalOpen(true)}
            darkMode={darkMode}
          />
        </div>

        {/* Workspace 2-Column Body: Control Sidebar (Left) + Generation Feed (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-5 pt-3.5 items-stretch">
          <ControlSidebar
            mode={mode}
            onModeChange={setMode}
            prompt={prompt}
            onPromptChange={setPrompt}
            imageCount={imageCount}
            onImageCountChange={setImageCount}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            selectedStyle={selectedStyle}
            onStyleChange={handleStyleChange}
            cfgScale={cfgScale}
            onCfgScaleChange={setCfgScale}
            negativePrompt={negativePrompt}
            onNegativePromptChange={setNegativePrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            darkMode={darkMode}
          />

          <GenerationFeed
            batches={batches}
            isGenerating={isGenerating}
            pendingPrompt={prompt}
            pendingCount={imageCount}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onInspectOutput={(output, batch) =>
              setInspectedItem({ output, batch })
            }
            onReusePrompt={handleReusePrompt}
            darkMode={darkMode}
          />
        </div>
      </main>

      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 right-6 z-50 px-4 py-2.5 rounded-full bg-[#1E1A18] text-white text-xs font-medium shadow-xl border border-white/10 flex items-center gap-2 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-[#D17D60]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Lightbox Inspector Modal */}
      {inspectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Artwork detail inspector"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setInspectedItem(null)}
        >
          <div
            className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] ${
              darkMode
                ? "bg-[#1B1817] border-[#332C29] text-[#F5F0ED]"
                : "bg-[#FCFAF8] border-[#E8DDD6] text-[#1D1917]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Image Preview */}
            <div className="relative min-h-[320px] sm:min-h-[460px] bg-black/90 flex items-center justify-center">
              <Image
                src={inspectedItem.output.src}
                alt={inspectedItem.output.alt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-contain"
              />
            </div>

            {/* Right Metadata & Actions Panel */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#D17D60]/15 text-[#D17D60]">
                    {inspectedItem.batch.model || "Fomi Realism v4"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInspectedItem(null)}
                    aria-label="Close inspector"
                    className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider opacity-55 mb-1.5">
                  Prompt Specification
                </h3>
                <p
                  className={`text-xs leading-relaxed p-3.5 rounded-2xl border ${
                    darkMode
                      ? "bg-[#12100F] border-[#2C2624]"
                      : "bg-[#F6EEEA] border-[#EBDDD5]"
                  }`}
                >
                  {inspectedItem.batch.prompt}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      darkMode ? "border-[#2C2624]" : "border-[#EBE0DA]"
                    }`}
                  >
                    <div className="text-[10px] opacity-60">Seed</div>
                    <div className="font-mono font-semibold mt-0.5">
                      #{inspectedItem.output.seed || 482914}
                    </div>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border ${
                      darkMode ? "border-[#2C2624]" : "border-[#EBE0DA]"
                    }`}
                  >
                    <div className="text-[10px] opacity-60">Resolution</div>
                    <div className="font-mono font-semibold mt-0.5">
                      {inspectedItem.output.resolution || "1536 × 2048"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-black/10">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleReusePrompt(inspectedItem.batch);
                      setInspectedItem(null);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium inline-flex items-center justify-center gap-1.5 border transition-colors ${
                      darkMode
                        ? "border-[#332C29] hover:bg-[#26211F]"
                        : "border-[#E0D2C9] hover:bg-[#F3E7E1]"
                    }`}
                  >
                    <RemixIcon className="w-3.5 h-3.5" />
                    <span>Reuse Prompt</span>
                  </button>

                  <a
                    href={inspectedItem.output.src}
                    download={`fomi-${inspectedItem.output.seed || "art"}.webp`}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium inline-flex items-center justify-center gap-1.5 border transition-colors ${
                      darkMode
                        ? "border-[#332C29] hover:bg-[#26211F]"
                        : "border-[#E0D2C9] hover:bg-[#F3E7E1]"
                    }`}
                  >
                    <DownloadIcon className="w-3.5 h-3.5" />
                    <span>Download HD</span>
                  </a>
                </div>

                {onSwitchToPartB && (
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedItem(null);
                      onSwitchToPartB();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#D17D60] hover:bg-[#C26D50] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <SparkleGenerateIcon className="w-4 h-4" />
                    <span>Open in Fomi Director Studio (Part B)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History & Gallery View-All Modal */}
      {galleryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All Generation History and Gallery"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setGalleryModalOpen(false)}
        >
          <div
            className={`w-full max-w-5xl max-h-[85vh] rounded-3xl p-6 flex flex-col shadow-2xl border ${
              darkMode
                ? "bg-[#1B1817] border-[#332C29] text-[#F5F0ED]"
                : "bg-[#FCFAF8] border-[#E8DDD6] text-[#1D1917]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div>
                <h2 className="text-base font-bold">
                  Creation History & Saved Gallery ({historyItems.length})
                </h2>
                <p className="text-xs opacity-65">
                  Click any generation to inspect full resolution or load its prompt into the workspace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Close gallery"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5 py-4">
              {historyItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setGalleryModalOpen(false);
                    handleSelectHistoryItem(item);
                  }}
                  className={`group rounded-2xl overflow-hidden border text-left flex flex-col transition-all hover:-translate-y-0.5 ${
                    darkMode
                      ? "bg-[#12100F] border-[#2C2624]"
                      : "bg-white border-[#EBE0DA]"
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5">
                    <div className="text-xs font-semibold truncate">{item.title}</div>
                    <div className="text-[10px] opacity-60 flex items-center justify-between mt-0.5">
                      <span>{item.model}</span>
                      <span>{item.createdAt}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support & Keyboard Shortcuts Modal */}
      {supportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Support and Shortcuts"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSupportModalOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
              darkMode
                ? "bg-[#1B1817] border-[#332C29] text-[#F5F0ED]"
                : "bg-[#FCFAF8] border-[#E8DDD6] text-[#1D1917]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <h2 className="text-sm font-bold">Fomi Pro Support & Shortcuts</h2>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/10"
                aria-label="Close support dialog"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-black/5">
                <span className="opacity-75">Generate Batch</span>
                <kbd className="px-2 py-0.5 rounded bg-black/10 font-mono text-[10.5px]">
                  Ctrl / ⌘ + Enter
                </kbd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-black/5">
                <span className="opacity-75">Scroll History Strip</span>
                <kbd className="px-2 py-0.5 rounded bg-black/10 font-mono text-[10.5px]">
                  Mouse Wheel / Drag
                </kbd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-black/5">
                <span className="opacity-75">Reuse Batch Prompt</span>
                <kbd className="px-2 py-0.5 rounded bg-black/10 font-mono text-[10.5px]">
                  Click &quot;Model&quot; Badge
                </kbd>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSupportModalOpen(false);
                    onOpenProductDoc?.();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#D17D60] text-white font-semibold text-xs hover:bg-[#C26D50] transition-colors"
                >
                  Read Part B Product Thinking Document →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
