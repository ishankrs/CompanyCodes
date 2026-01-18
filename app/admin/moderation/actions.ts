'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';

/* ---------- LINK SUBMISSIONS ---------- */

export async function approveLinkSubmission(id: number) {
  const { data, error } = await supabaseAdmin
    .from('question_link_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error('Submission not found');
  }

  await supabaseAdmin.from('approved_link_questions').insert([
    {
      company_name: data.company_name,
      question_url: data.question_url,
    },
  ]);

  await supabaseAdmin
    .from('question_link_submissions')
    .delete()
    .eq('id', id);
}

export async function rejectLinkSubmission(id: number) {
  await supabaseAdmin
    .from('question_link_submissions')
    .delete()
    .eq('id', id);
}

/* ---------- TEXT SUBMISSIONS ---------- */

export async function approveTextSubmission(id: number) {
  const { data, error } = await supabaseAdmin
    .from('question_text_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error('Submission not found');
  }

  await supabaseAdmin.from('approved_text_questions').insert([
    {
      company_name: data.company_name,
      question_title: data.question_title,
      question_details: data.question_details,
    },
  ]);

  await supabaseAdmin
    .from('question_text_submissions')
    .delete()
    .eq('id', id);
}

export async function rejectTextSubmission(id: number) {
  await supabaseAdmin
    .from('question_text_submissions')
    .delete()
    .eq('id', id);
}
