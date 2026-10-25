import React from "react";

export function FomiLogo({ className = "w-6 h-7" }) {
  return (
    <svg
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Fomi Logo"
    >
      {/* Geometric F with notched top bar and beveled stem foot matching mockup */}
      <path
        d="M4 4.5C4 3.67157 4.67157 3 5.5 3H18.5L15.2 8.5H9.5V14H18.2L15.5 19.2H9.5V27.5L4 31.5V4.5Z"
        fill="currentColor"
      />
      <path d="M19.8 3H24.5L21.2 8.5H16.8L19.8 3Z" fill="currentColor" />
    </svg>
  );
}

export function HomeNavIcon({ className = "w-[18px] h-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.33 3.25a1 1 0 0 1 1.34 0l8 7.2A1 1 0 0 1 21 11.2v8.8a1.5 1.5 0 0 1-1.5 1.5h-5v-5.5a2.5 2.5 0 0 0-5 0V21.5h-5A1.5 1.5 0 0 1 3 20v-8.8a1 1 0 0 1 .33-.75l8-7.2Z" />
    </svg>
  );
}

export function ImageNavIcon({ className = "w-[17px] h-[17px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15Zm4.25 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM5.5 17.5l3.75-4.5 2.75 3.25 3.75-4.75 3.25 6H5.5Z" />
    </svg>
  );
}

export function VideoNavIcon({ className = "w-[19px] h-[19px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.75 5.5A1.75 1.75 0 0 0 2 7.25v9.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 16 16.75v-9.5A1.75 1.75 0 0 0 14.25 5.5H3.75Zm13.75 4.1 3.72-2.23A.75.75 0 0 1 22.35 8v8a.75.75 0 0 1-1.13.63L17.5 14.4V9.6Z" />
    </svg>
  );
}

export function MagicWandIcon({ className = "w-[17px] h-[17px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.5 2.5 8.4 4.6 10.5 5.5 8.4 6.4 7.5 8.5 6.6 6.4 4.5 5.5 6.6 4.6 7.5 2.5ZM3.5 9.5 4.1 10.9 5.5 11.5 4.1 12.1 3.5 13.5 2.9 12.1 1.5 11.5 2.9 10.9 3.5 9.5ZM13.5 3.5 14.1 4.9 15.5 5.5 14.1 6.1 13.5 7.5 12.9 6.1 11.5 5.5 12.9 4.9 13.5 3.5ZM8.2 7.8a1 1 0 0 1 1.4 0l11.6 11.6a1 1 0 0 1 0 1.4l-.8.8a1 1 0 0 1-1.4 0L7.4 10a1 1 0 0 1 0-1.4l.8-.8Z" />
    </svg>
  );
}

export function FolderNavIcon({ className = "w-[17px] h-[17px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.5 4.5A1.5 1.5 0 0 0 2 6v12a1.5 1.5 0 0 0 1.5 1.5h17A1.5 1.5 0 0 0 22 18V8.5A1.5 1.5 0 0 0 20.5 7h-8.38l-2-2.1A1.5 1.5 0 0 0 9.03 4.5H3.5Z" />
    </svg>
  );
}

export function SupportHeadsetIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function MoonIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export function SunIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function SparkleGenerateIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {/* Main 4-point star + twin mini stars from the Generate button */}
      <path d="M11.5 2.5c.3 4.2 1.8 5.7 6 6-4.2.3-5.7 1.8-6 6-.3-4.2-1.8-5.7-6-6 4.2-.3 5.7-1.8 6-6Z" />
      <path d="M18.5 13.5c.2 2.1.9 2.8 3 3-2.1.2-2.8.9-3 3-.2-2.1-.9-2.8-3-3 2.1-.2 2.8-.9 3-3Z" />
      <path d="M5.5 15c.15 1.5.65 2 2.15 2.15-1.5.15-2 .65-2.15 2.15-.15-1.5-.65-2-2.15-2.15 1.5-.15 2-.65 2.15-2.15Z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-3 h-3" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ExpandIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

export function RemixIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

export function DownloadIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function HeartIcon({ className = "w-3.5 h-3.5", filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function PlayIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

export function SplitCompareIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 3v18" />
      <path d="m8 10-2 2 2 2" />
      <path d="m16 10 2 2-2 2" />
    </svg>
  );
}

export function GitBranchIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

export function CloseIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
