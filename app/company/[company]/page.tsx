import { supabase } from '../../../lib/supabase';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const decodedCompany = decodeURIComponent(company);

  const { data, error } = await supabase
    .from('company_questions')
    .select(`
      frequency,
      questions (
        question_id,
        title,
        difficulty,
        acceptance_rate,
        link
      )
    `)
    .eq('company', decodedCompany)
    .order('frequency', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load questions
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-gray-50 dark:bg-zinc-900
        text-gray-800 dark:text-zinc-200
        transition-colors
      "
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <a
          href="/"
          className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
        >
          ← Back to search
        </a>

        <h1 className="text-4xl font-medium tracking-tight mt-6 mb-2">
          {decodedCompany}
        </h1>

        <p className="text-gray-500 dark:text-zinc-500 mb-12">
          Interview questions reported for {decodedCompany}
        </p>

        <ul className="divide-y divide-gray-200/70 dark:divide-zinc-700/60">
          {data.map((row) => (
            <li
              key={row.questions.question_id}
              className="py-6 flex items-start justify-between gap-6"
            >
              <div>
                <a
                  href={row.questions.link}
                  target="_blank"
                  className="text-lg font-medium hover:underline"
                >
                  {row.questions.title}
                </a>

                <div className="text-sm text-gray-500 dark:text-zinc-500 mt-2">
                  {row.questions.difficulty}
                </div>
              </div>

              <div className="text-sm font-semibold text-gray-700 dark:text-zinc-300 shrink-0">
                {row.frequency}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
