import { supabase } from '../lib/supabase';
import CompanySearch from '../components/CompanySearch';

export default async function HomePage() {
  const { data, error } = await supabase
    .from('company_questions')
    .select('company')
    .order('company')
    .range(0, 10000);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load companies
      </div>
    );
  }

  const companies = Array.from(
    new Set(data.map((d) => d.company))
  );

  return (
    <main
      className="
        min-h-screen
        flex flex-col
        items-center
        justify-center
        px-6
       g-gray-50 dark:bg-zinc-900
        text-gray-800 dark:text-zinc-200
        transition-colors
      "
    >
      <h1 className="text-6xl font-medium tracking-tight mb-10">
        CompanyCodes
      </h1>

      <div className="w-full max-w-2xl">
        <CompanySearch companies={companies} />
      </div>

      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-10">
        Search interview questions by company
      </p>
    </main>
  );
}
