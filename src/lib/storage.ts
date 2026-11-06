import type { QuizAttempt } from '@/types';
import { supabase } from './supabase';

const TABLE = 'quiz_attempts';
const LOCAL_KEY = 'smartlearn.attempts';

// Local fallback cache so the dashboard works even if the DB is unreachable
// or env vars are not available in the current environment.
function readLocal(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(attempts: QuizAttempt[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(attempts));
  } catch {
    /* ignore quota errors */
  }
}

export async function loadAttempts(): Promise<QuizAttempt[]> {
  // No Supabase client available — use local storage only.
  if (!supabase) {
    return readLocal();
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('completed_at', { ascending: false });

  if (error || !data) {
    return readLocal();
  }

  const mapped: QuizAttempt[] = data.map((r) => ({
    id: r.id,
    subject: r.subject,
    score: r.score,
    total: r.total,
    topicBreakdown: r.topic_breakdown ?? [],
    completedAt: r.completed_at,
  }));

  // Keep local cache in sync with the source of truth.
  writeLocal(mapped);
  return mapped;
}

export async function saveAttempt(attempt: QuizAttempt): Promise<void> {
  // No Supabase client available — persist locally only.
  if (!supabase) {
    const all = readLocal();
    writeLocal([attempt, ...all]);
    return;
  }

  const { error } = await supabase.from(TABLE).insert(payload(attempt));
  if (error) {
    // Fall back to local-only persistence so the user never loses a result.
    const all = readLocal();
    writeLocal([attempt, ...all]);
  }
}

function payload(attempt: QuizAttempt) {
  return {
    id: attempt.id,
    subject: attempt.subject,
    score: attempt.score,
    total: attempt.total,
    topic_breakdown: attempt.topicBreakdown,
    completed_at: attempt.completedAt,
  };
}

export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
