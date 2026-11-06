import type { QuizAttempt, SubjectId } from '@/types';
import { SUBJECT_MAP } from '@/data/subjects';
import { RESOURCES } from '@/data/resources';
import { KNOWLEDGE_BY_SUBJECT } from '@/data/knowledge';

export interface TopicStat {
  subject: SubjectId;
  topic: string;
  attempts: number;
  correct: number;
  total: number;
  mastery: number; // 0..1 weighted accuracy with a small prior
}

export interface SubjectStat {
  subject: SubjectId;
  attempts: number;
  avgScore: number; // percentage
  mastery: number; // 0..1
}

export interface Recommendation {
  subject: SubjectId;
  topic: string;
  reason: string;
  resources: { title: string; url: string; type: string }[];
}

/**
 * Aggregate per-topic accuracy across all attempts.
 * Uses a Beta(1,1) prior (Laplace smoothing) so a single miss on a new
 * topic does not immediately flag it as critical — this is the simple
 * "Bayesian" estimate of true mastery from limited observations.
 */
export function getTopicStats(attempts: QuizAttempt[]): TopicStat[] {
  const map = new Map<string, TopicStat>();

  for (const attempt of attempts) {
    for (const tb of attempt.topicBreakdown) {
      const key = `${attempt.subject}|${tb.topic}`;
      const existing = map.get(key);
      if (existing) {
        existing.attempts += 1;
        existing.correct += tb.correct;
        existing.total += tb.total;
      } else {
        map.set(key, {
          subject: attempt.subject,
          topic: tb.topic,
          attempts: 1,
          correct: tb.correct,
          total: tb.total,
          mastery: 0,
        });
      }
    }
  }

  const stats = Array.from(map.values());
  for (const s of stats) {
    // Beta(1,1) posterior mean: (correct + 1) / (total + 2)
    s.mastery = (s.correct + 1) / (s.total + 2);
  }
  return stats.sort((a, b) => a.mastery - b.mastery);
}

export function getSubjectStats(attempts: QuizAttempt[]): SubjectStat[] {
  const map = new Map<SubjectId, SubjectStat>();

  for (const a of attempts) {
    const existing = map.get(a.subject);
    const pct = a.total > 0 ? (a.score / a.total) * 100 : 0;
    if (existing) {
      existing.attempts += 1;
      existing.avgScore = (existing.avgScore * (existing.attempts - 1) + pct) / existing.attempts;
      existing.mastery = (existing.mastery * (existing.attempts - 1) + pct / 100) / existing.attempts;
    } else {
      map.set(a.subject, {
        subject: a.subject,
        attempts: 1,
        avgScore: pct,
        mastery: pct / 100,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.mastery - a.mastery);
}

/**
 * Recommendation module: surfaces weak topics (mastery < 0.6) and suggests
 * relevant resources and a study question for each. This is a simple,
 * transparent "ML-style" recommender: mastery is a smoothed accuracy
 * estimate and the threshold is tuned so only genuinely weak areas surface.
 */
export function getRecommendations(attempts: QuizAttempt[]): Recommendation[] {
  const topicStats = getTopicStats(attempts);
  const weak = topicStats.filter((t) => t.mastery < 0.6).slice(0, 6);

  return weak.map((t) => {
    const resources = RESOURCES.filter(
      (r) => r.subject === t.subject && (r.tags.some((tag) => t.topic.toLowerCase().includes(tag.toLowerCase())) || r.type === 'notes'),
    ).slice(0, 3);

    const kbEntry = KNOWLEDGE_BY_SUBJECT[t.subject]?.find((e) =>
      e.keywords.some((k) => k.toLowerCase().includes(t.topic.toLowerCase())),
    );

    const masteryPct = Math.round(t.mastery * 100);
    return {
      subject: t.subject,
      topic: t.topic,
      reason: `Your mastery in ${t.topic} is ${masteryPct}% across ${t.attempts} attempt(s). Focus here to improve your ${SUBJECT_MAP[t.subject].name} score.`,
      resources: resources.map((r) => ({ title: r.title, url: r.url, type: r.type })),
      ...(kbEntry ? { question: kbEntry.question } : {}),
    } as Recommendation & { question?: string };
  });
}

export function overallProgress(attempts: QuizAttempt[]): {
  totalQuizzes: number;
  avgScore: number;
  bestSubject?: SubjectId;
  weakestSubject?: SubjectId;
} {
  if (attempts.length === 0) {
    return { totalQuizzes: 0, avgScore: 0 };
  }
  const subjectStats = getSubjectStats(attempts);
  const avg = subjectStats.reduce((s, x) => s + x.avgScore, 0) / subjectStats.length;
  const best = subjectStats[0]?.subject;
  const weakest = subjectStats[subjectStats.length - 1]?.subject;
  return { totalQuizzes: attempts.length, avgScore: avg, bestSubject: best, weakestSubject: weakest };
}
