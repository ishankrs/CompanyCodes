'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // On mount: restore saved theme OR fall back to system
  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldBeDark =
      saved === 'dark' || (saved === null && systemDark);

    document.documentElement.classList.toggle('dark', shouldBeDark);
    setIsDark(shouldBeDark);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-6 right-6 z-50
        rounded-full
        px-4 py-2
        text-sm
        bg-white dark:bg-zinc-900
        text-gray-700 dark:text-zinc-200
        ring-1 ring-gray-200 dark:ring-zinc-700
        hover:bg-gray-50 dark:hover:bg-zinc-800
        transition
      "
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
