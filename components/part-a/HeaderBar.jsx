"use client";

import React from "react";
import Image from "next/image";
import {
  FomiLogo,
  HomeNavIcon,
  ImageNavIcon,
  VideoNavIcon,
  MagicWandIcon,
  FolderNavIcon,
  SupportHeadsetIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons/FomiIcons";

export default function HeaderBar({
  activeNav,
  onSelectNav,
  quotaUsed = 160,
  quotaLimit = 1000,
  isGenerating = false,
  darkMode = false,
  onToggleDarkMode,
  onOpenGallery,
  onOpenSupport,
}) {
  const progressPercent = Math.min(
    Math.max(Math.round((quotaUsed / quotaLimit) * 100), 14),
    100
  );

  const navItems = [
    { id: "home", label: "Home Workspace", Icon: HomeNavIcon },
    { id: "image", label: "Image Generation", Icon: ImageNavIcon },
    { id: "video", label: "Video Generation", Icon: VideoNavIcon },
    { id: "magic", label: "Smart Enhance & Part B Studio", Icon: MagicWandIcon },
    { id: "folder", label: "Saved Projects & History", Icon: FolderNavIcon },
  ];

  return (
    <header
      className="w-full px-4 sm:px-7 pt-3 pb-2 flex items-center justify-between select-none z-30"
      role="banner"
    >
      {/* Left: Fomi Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onSelectNav("home")}
          className={`group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] rounded-lg p-1 transition-transform active:scale-95 ${
            darkMode ? "text-[#F5F0ED]" : "text-[#141211]"
          }`}
          aria-label="Fomi Home"
          title="Fomi Creative Workspace"
        >
          <FomiLogo className="w-[22px] h-[27px] transition-transform duration-200 group-hover:scale-105" />
        </button>
      </div>

      {/* Center: Quota Progress Bar + 5 Workspace Navigation Icons */}
      <div className="flex flex-col items-center">
        {/* Progress Bar */}
        <div
          className={`w-[210px] sm:w-[260px] md:w-[276px] h-[9px] rounded-full p-[1px] transition-colors relative group cursor-pointer ${
            darkMode
              ? "bg-[#26211F] border border-[#362E2B]"
              : "bg-[#F7EFEA] border border-[#EFE2DC]"
          }`}
          role="progressbar"
          aria-valuenow={quotaUsed}
          aria-valuemin={0}
          aria-valuemax={quotaLimit}
          aria-label="Generation compute quota"
          title={`${quotaUsed} / ${quotaLimit} Fast GPU Credits used`}
        >
          <div
            className={`h-full rounded-full bg-[#D17D60] transition-all duration-500 ${
              isGenerating ? "animate-pulse" : ""
            }`}
            style={{ width: `${progressPercent}%` }}
          />
          {/* Subtle hover tooltip */}
          <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1E1B19] text-white text-[10px] whitespace-nowrap shadow-md z-50">
            {quotaUsed} / {quotaLimit} credits • Fast GPU ready
          </span>
        </div>

        {/* 5 Centered Icons */}
        <nav
          aria-label="Primary workspace modes"
          className="w-[210px] sm:w-[260px] md:w-[276px] flex items-center justify-between px-1.5 pt-2"
        >
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeNav === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectNav(id)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                title={label}
                className={`relative p-1.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
                  isActive
                    ? darkMode
                      ? "text-[#E08B6D] scale-105"
                      : "text-[#141211] scale-105"
                    : darkMode
                    ? "text-[#8C827D] hover:text-[#F5F0ED]"
                    : "text-[#191615]/85 hover:text-[#D17D60]"
                }`}
              >
                <Icon />
                {isActive && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D17D60]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Gallery, Support, Theme Toggle, Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={onOpenGallery}
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
            darkMode
              ? "bg-[#221E1C] hover:bg-[#2C2624] text-[#EDE5E0] border border-[#332C29]"
              : "bg-[#F7F3F0] hover:bg-[#EFE7E2] text-[#2B2623] border border-[#EFE6E0]"
          }`}
        >
          <ImageNavIcon className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </button>

        <button
          type="button"
          onClick={onOpenSupport}
          className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
            darkMode
              ? "bg-[#221E1C] hover:bg-[#2C2624] text-[#EDE5E0] border border-[#332C29]"
              : "bg-[#F7F3F0] hover:bg-[#EFE7E2] text-[#2B2623] border border-[#EFE6E0]"
          }`}
        >
          <SupportHeadsetIcon className="w-3.5 h-3.5" />
          <span>Support</span>
        </button>

        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          title={darkMode ? "Switch to warm light theme" : "Switch to dark studio theme"}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60] ${
            darkMode
              ? "bg-[#221E1C] text-[#E08B6D] hover:bg-[#2E2825]"
              : "bg-[#F7F3F0] text-[#CDC8C7] hover:text-[#6E6560] hover:bg-[#EFE7E2]"
          }`}
        >
          {darkMode ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onOpenGallery}
          aria-label="User profile and saved creations"
          title="Clara V. • Pro Creator"
          className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#E2D5CE] hover:ring-[#D17D60] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D17D60]"
        >
          <Image
            src="/assets/mockup/avatar.webp"
            alt="Creator profile avatar"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
