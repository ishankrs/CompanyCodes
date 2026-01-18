import { redirect } from 'next/navigation';
import { supabaseAdmin } from '../../../lib/supabase-admin';
import {
  approveLinkSubmission,
  rejectLinkSubmission,
  approveTextSubmission,
  rejectTextSubmission,
} from './actions';

export default async function AdminModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  /* ---------- UNWRAP searchParams (IMPORTANT) ---------- */
  const { key } = await searchParams;

  /* ---------- ADMIN GATE ---------- */
  if (key !== process.env.ADMIN_SECRET) {
    redirect('/');
  }

  /* ---------- FETCH SUBMISSIONS ---------- */
  const { data: linkSubs } = await supabaseAdmin
    .from('question_link_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  const { data: textSubs } = await supabaseAdmin
    .from('question_text_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium mb-10">
          Admin Moderation
        </h1>

        {/* ---------- LINK SUBMISSIONS ---------- */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-4">
            Link submissions
          </h2>

          <div className="space-y-4">
            {linkSubs?.map((s) => (
              <div
                key={s.id}
                className="rounded-lg bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 p-4"
              >
                <div className="text-sm text-gray-500 dark:text-zinc-400">
                  {s.company_name}
                </div>

                <a
                  href={s.question_url}
                  target="_blank"
                  className="block mt-1 text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {s.question_url}
                </a>

                <div className="mt-4 flex gap-3">
                  <form>
                    <button
                      formAction={approveLinkSubmission.bind(null, s.id)}
                      className="rounded-full px-4 py-1.5 text-sm bg-green-600 text-white hover:opacity-90"
                    >
                      Approve
                    </button>
                  </form>

                  <form>
                    <button
                      formAction={rejectLinkSubmission.bind(null, s.id)}
                      className="rounded-full px-4 py-1.5 text-sm bg-red-600 text-white hover:opacity-90"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}

            {linkSubs?.length === 0 && (
              <p className="text-gray-500">
                No pending link submissions
              </p>
            )}
          </div>
        </section>

        {/* ---------- TEXT SUBMISSIONS ---------- */}
        <section>
          <h2 className="text-xl font-medium mb-4">
            Text submissions
          </h2>

          <div className="space-y-4">
            {textSubs?.map((s) => (
              <div
                key={s.id}
                className="rounded-lg bg-white dark:bg-zinc-800 ring-1 ring-gray-200/70 dark:ring-zinc-700/60 p-4"
              >
                <div className="text-sm text-gray-500 dark:text-zinc-400">
                  {s.company_name}
                </div>

                <div className="font-medium mt-1">
                  {s.question_title}
                </div>

                {s.question_details && (
                  <div className="text-sm text-gray-600 dark:text-zinc-400 mt-2 whitespace-pre-wrap">
                    {s.question_details}
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <form>
                    <button
                      formAction={approveTextSubmission.bind(null, s.id)}
                      className="rounded-full px-4 py-1.5 text-sm bg-green-600 text-white hover:opacity-90"
                    >
                      Approve
                    </button>
                  </form>

                  <form>
                    <button
                      formAction={rejectTextSubmission.bind(null, s.id)}
                      className="rounded-full px-4 py-1.5 text-sm bg-red-600 text-white hover:opacity-90"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}

            {textSubs?.length === 0 && (
              <p className="text-gray-500">
                No pending text submissions
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
