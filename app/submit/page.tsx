'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import CompanyAutocomplete from '../../components/CompanyAutocomplete';

/* ---------- helpers ---------- */
async function getIpHash(): Promise<string> {
  const res = await fetch('https://api.ipify.org?format=json');
  const { ip } = await res.json();

  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(ip)
  );

  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function SubmitPage() {
  /* ---------- state ---------- */
  const [companies, setCompanies] = useState<string[]>([]);
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  /* ---------- load companies for autocomplete ---------- */
  useEffect(() => {
    const loadCompanies = async () => {
      const { data } = await supabase
        .from('company_questions')
        .select('company')
        .range(0, 10000);

      if (data) {
        setCompanies(
          Array.from(new Set(data.map((d) => d.company)))
        );
      }
    };

    loadCompanies();
  }, []);

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!company.trim()) {
      setError('Company name is required.');
      return;
    }

    if (!link.trim() && !title.trim()) {
      setError(
        'Please provide either a question link or a question title.'
      );
      return;
    }

    setLoading(true);

    try {
      const ip_hash = await getIpHash();

      // CASE 1: link-based submission
      if (link.trim()) {
        const { error } = await supabase
          .from('question_link_submissions')
          .insert([
            {
              company_name: company.trim(),
              question_url: link.trim(),
              ip_hash,
            },
          ]);

        if (error) throw error;
      }
      // CASE 2: text-based submission
      else {
        const { error } = await supabase
          .from('question_text_submissions')
          .insert([
            {
              company_name: company.trim(),
              question_title: title.trim(),
              question_details: details.trim() || null,
              ip_hash,
            },
          ]);

        if (error) throw error;
      }

      setSuccess(true);
      setCompany('');
      setLink('');
      setTitle('');
      setDetails('');
    } catch {
      setError(
        'Submission failed or rate limit reached. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 transition-colors">
      <div className="max-w-xl mx-auto px-6 py-16">
        <a
          href="/"
          className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
        >
          ← Back to search
        </a>

        <h1 className="text-3xl font-medium tracking-tight mt-6 mb-2">
          Submit a question
        </h1>

        <p className="text-gray-500 dark:text-zinc-500 mb-8">
          Help improve the dataset by sharing interview questions
          you’ve encountered.
        </p>

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-green-700 dark:text-green-300">
            Thanks! Your submission has been received.
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company */}
          <div>
            <label className="block text-sm mb-1">
              Company *
            </label>
            <CompanyAutocomplete
              value={company}
              onChange={setCompany}
              companies={companies}
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm mb-1">
              Question link (preferred)
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600"
              placeholder="https://leetcode.com/..."
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
            <span className="text-xs text-gray-400">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">
              Question title (if no link)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600"
              placeholder="e.g. Binary Tree Level Order Traversal"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm mb-1">
              Question details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600"
              placeholder="Any extra context you remember…"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition"
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  );
}
