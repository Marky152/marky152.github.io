"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const modes = ["light", "dark", "system"] as const;

const icons: Record<(typeof modes)[number], React.ReactNode> = {
  light: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
  system: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border hairline bg-panel/60 p-0.5"
      role="radiogroup"
      aria-label="Color theme"
    >
      {modes.map((mode) => {
        const active = mounted && theme === mode;
        return (
          <button
            key={mode}
            role="radio"
            aria-checked={active}
            aria-label={`${mode} theme`}
            onClick={() => setTheme(mode)}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 ${
              active ? "bg-gold text-[#0E0D0C]" : "text-faint hover:text-ink"
            }`}
          >
            {icons[mode]}
          </button>
        );
      })}
    </div>
  );
}
