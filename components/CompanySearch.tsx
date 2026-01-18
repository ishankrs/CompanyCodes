'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CompanySearch({
  companies,
}: {
  companies: string[];
}) {
  const [query, setQuery] = useState('');

  const filtered =
    query.length === 0
      ? []
      : companies.filter((company) =>
          company.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative">
      {/* Search input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies"
        className="
          w-full
          rounded-full
          px-6 py-4
          text-lg

          bg-white
          dark:bg-zinc-800

          text-gray-800
          dark:text-zinc-200

          placeholder:text-gray-400
          dark:placeholder:text-zinc-500

          shadow-sm
          ring-1 ring-gray-200/70
          dark:ring-zinc-700/60

          focus:outline-none
          focus:ring-2 focus:ring-gray-300
          dark:focus:ring-zinc-600

          transition
        "
      />

      {/* Dropdown results */}
      {query && (
        <div
          className="
            absolute
            left-0 right-0
            mt-3
            rounded-2xl

            bg-white
            dark:bg-zinc-800

            shadow-xl
            ring-1 ring-gray-200/70
            dark:ring-zinc-700/60

            overflow-hidden
            z-10
          "
        >
          {filtered.slice(0, 8).map((company) => (
            <Link
              key={company}
              href={`/company/${encodeURIComponent(company)}`}
              className="
                block
                px-6 py-4

                text-gray-700
                dark:text-zinc-200

                hover:bg-gray-50
                dark:hover:bg-zinc-700/60

                transition-colors
              "
            >
              {company}
            </Link>
          ))}

          {filtered.length === 0 && (
            <div
              className="
                px-6 py-4
                text-sm
                text-gray-500
                dark:text-zinc-500
              "
            >
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
