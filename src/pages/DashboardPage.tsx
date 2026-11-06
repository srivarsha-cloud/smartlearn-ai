import { useEffect, useState } from 'react';
import {
  TrendingUp, Target, Award, AlertTriangle, BookOpen, ExternalLink,
  Lightbulb, BarChart3, Loader2, Inbox,
} from 'lucide-react';
import type { PageId, QuizAttempt } from '@/types';
import { SUBJECTS, SUBJECT_MAP } from '@/data/subjects';
import { SubjectIcon } from '@/components/SubjectIcon';
import {
  getTopicStats, getSubjectStats, getRecommendations, overallProgress,
} from '@/lib/recommendations';
import { loadAttempts } from '@/lib/storage';

interface DashboardPageProps {
  attempts: QuizAttempt[];
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ attempts: cached, onNavigate }: DashboardPageProps) {
  const [attempts, setAttempts] = useState<QuizAttempt[]>(cached);
  const [loading, setLoading] = useState(cached.length === 0);

  useEffect(() => {
    let active = true;
    loadAttempts().then((data) => {
      if (!active) return;
      if (data.length > 0) setAttempts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const progress = overallProgress(attempts);
  const subjectStats = getSubjectStats(attempts);
  const topicStats = getTopicStats(attempts);
  const recommendations = getRecommendations(attempts);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-500">
          <Inbox className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-700 text-slate-900">No quiz data yet</h3>
        <p className="mt-1 text-sm text-slate-500">
          Take your first quiz to unlock personalized progress tracking and study recommendations.
        </p>
        <button onClick={() => onNavigate('assessments')} className="btn-primary mt-5">
          <Target className="h-4 w-4" /> Take a quiz
        </button>
      </div>
    );
  }

  const summary = [
    { label: 'Quizzes taken', value: String(progress.totalQuizzes), icon: Award, color: 'from-brand-500 to-brand-700' },
    { label: 'Avg. score', value: `${Math.round(progress.avgScore)}%`, icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
    { label: 'Best subject', value: progress.bestSubject ? SUBJECT_MAP[progress.bestSubject].short : '—', icon: Trophy, color: 'from-accent-500 to-accent-700' },
    { label: 'Weakest subject', value: progress.weakestSubject ? SUBJECT_MAP[progress.weakestSubject].short : '—', icon: AlertTriangle, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-display text-2xl font-700 text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Subject mastery + recent attempts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subject mastery */}
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-600" />
            <h3 className="font-display text-base font-700 text-slate-900">Subject mastery</h3>
          </div>
          <div className="space-y-4">
            {SUBJECTS.map((s) => {
              const stat = subjectStats.find((x) => x.subject === s.id);
              const mastery = stat ? Math.round(stat.mastery * 100) : 0;
              const hasData = !!stat;
              return (
                <div key={s.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className={`grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br ${s.accent} text-white`}>
                        <SubjectIcon name={s.icon} className="h-3.5 w-3.5" />
                      </span>
                      {s.name}
                    </span>
                    <span className={hasData ? 'font-semibold text-slate-700' : 'text-slate-400'}>
                      {hasData ? `${mastery}%` : 'No data'}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${s.accent} transition-all`}
                      style={{ width: `${hasData ? mastery : 4}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent attempts */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-accent-600" />
            <h3 className="font-display text-base font-700 text-slate-900">Recent quizzes</h3>
          </div>
          <div className="space-y-2.5">
            {attempts.slice(0, 6).map((a) => {
              const pct = Math.round((a.score / a.total) * 100);
              const s = SUBJECT_MAP[a.subject];
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${s.accent} text-white`}>
                    <SubjectIcon name={s.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-800">{s.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(a.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={[
                    'rounded-lg px-2 py-1 text-xs font-bold',
                    pct >= 80 ? 'bg-emerald-50 text-emerald-700' : '',
                    pct >= 60 && pct < 80 ? 'bg-amber-50 text-amber-700' : '',
                    pct < 60 ? 'bg-rose-50 text-rose-700' : '',
                  ].join(' ')}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weak topic analysis + recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Topic mastery */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-rose-500" />
            <h3 className="font-display text-base font-700 text-slate-900">Topic mastery analysis</h3>
          </div>
          {topicStats.length === 0 ? (
            <p className="text-sm text-slate-500">Take more quizzes to see per-topic analysis.</p>
          ) : (
            <div className="space-y-3">
              {topicStats.slice(0, 8).map((t) => {
                const pct = Math.round(t.mastery * 100);
                const color =
                  pct >= 70 ? 'from-emerald-400 to-teal-500'
                  : pct >= 50 ? 'from-amber-400 to-orange-500'
                  : 'from-rose-400 to-rose-600';
                return (
                  <div key={`${t.subject}-${t.topic}`}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">
                        {t.topic} <span className="text-slate-400">· {SUBJECT_MAP[t.subject].short}</span>
                      </span>
                      <span className={[
                        'font-semibold',
                        pct >= 70 ? 'text-emerald-600' : '',
                        pct >= 50 && pct < 70 ? 'text-amber-600' : '',
                        pct < 50 ? 'text-rose-600' : '',
                      ].join(' ')}>{pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${Math.max(pct, 4)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-display text-base font-700 text-slate-900">Recommended next steps</h3>
          </div>
          {recommendations.length === 0 ? (
            <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-semibold">You are doing great!</p>
              <p className="mt-1 text-xs">No weak topics detected. Try harder quizzes to keep improving.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br ${SUBJECT_MAP[r.subject].accent} text-white`}>
                      <SubjectIcon name={SUBJECT_MAP[r.subject].icon} className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm font-semibold text-slate-900">{r.topic}</p>
                    <span className="ml-auto chip bg-slate-100 text-slate-500">{SUBJECT_MAP[r.subject].short}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{r.reason}</p>
                  {r.resources.length > 0 && (
                    <div className="mt-2.5 space-y-1">
                      {r.resources.map((res) => (
                        <a
                          key={res.url}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                        >
                          <BookOpen className="h-3.5 w-3.5" /> {res.title}
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onNavigate('assessments')} className="btn-primary mt-4 w-full">
            <Target className="h-4 w-4" /> Practice weak topics
          </button>
        </div>
      </div>
    </div>
  );
}

function Trophy({ className }: { className?: string }) {
  return <Award className={className} />;
}
