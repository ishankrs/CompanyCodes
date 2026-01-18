'use client';

import { useState } from 'react';

export default function CompanyAutocomplete({
  value,
  onChange,
  companies,
}: {
  value: string;
  onChange: (v: string) => void;
  companies: string[];
}) {
  const [open, setOpen] = useState(false);

  const filtered =
    value.length === 0
      ? []
      : companies.filter((c) =>
          c.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="w-full rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600"
        placeholder="Company name"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-gray-200/70 dark:ring-zinc-700/60 max-h-48 overflow-auto">
          {filtered.slice(0, 6).map((c) => (
            <div
              key={c}
              onMouseDown={() => {
                onChange(c);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700/60"
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
