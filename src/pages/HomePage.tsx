import {
  ArrowRight, MessageSquare, ClipboardList, BookOpen, LayoutDashboard,
  TrendingUp, Sparkles, Zap, Target,
} from 'lucide-react';
import type { PageId, QuizAttempt } from '@/types';
import { SUBJECTS } from '@/data/subjects';
import { SubjectIcon } from '@/components/SubjectIcon';
import { overallProgress } from '@/lib/recommendations';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  attempts: QuizAttempt[];
}

export function HomePage({ onNavigate, attempts }: HomePageProps) {
  const progress = overallProgress(attempts);
  const stats = [
    { label: 'Subjects covered', value: '7', icon: BookOpen },
    { label: 'Quizzes taken', value: String(progress.totalQuizzes), icon: ClipboardList },
    { label: 'Avg. score', value: `${Math.round(progress.avgScore)}%`, icon: TrendingUp },
    { label: 'AI topics ready', value: '28+', icon: Sparkles },
  ];

  const quickActions = [
    {
      page: 'chat' as PageId,
      title: 'Ask the AI Tutor',
      desc: 'Get instant explanations on any topic.',
      icon: MessageSquare,
      gradient: 'from-brand-500 to-brand-700',
    },
    {
      page: 'assessments' as PageId,
      title: 'Take a Quiz',
      desc: 'Practice with auto-scored MCQs.',
      icon: ClipboardList,
      gradient: 'from-accent-500 to-accent-700',
    },
    {
      page: 'resources' as PageId,
      title: 'Browse Resources',
      desc: 'Notes, videos & references per subject.',
      icon: BookOpen,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      page: 'dashboard' as PageId,
      title: 'View Dashboard',
      desc: 'See progress and weak-topic analysis.',
      icon: LayoutDashboard,
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-700 p-6 text-white shadow-glow sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="chip bg-white/15 text-white ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered learning platform
          </span>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight sm:text-4xl">
            Master computer science with your personal AI tutor
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-50/90 sm:text-base">
            SmartLearn AI brings together an interactive chatbot, curated learning resources,
            auto-graded quizzes, and a smart progress dashboard that pinpoints the topics you should study next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('chat')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50 active:scale-[0.98]"
            >
              <MessageSquare className="h-4 w-4" /> Start chatting
            </button>
            <button
              onClick={() => onNavigate('assessments')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20 active:scale-[0.98]"
            >
              <ClipboardList className="h-4 w-4" /> Take a quiz
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 font-display text-2xl font-700 text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-700 text-slate-900">Quick actions</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.page}
                onClick={() => onNavigate(a.page)}
                className="group card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${a.gradient} text-white shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{a.title}</p>
                <p className="mt-1 text-xs text-slate-500">{a.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                  Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Subjects */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-700 text-slate-900">Explore subjects</h3>
          <button onClick={() => onNavigate('resources')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            View all resources →
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate('chat')}
              className="group card flex flex-col p-5 text-left transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-sm`}>
                  <SubjectIcon name={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.tag}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{s.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                Ask the tutor <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Feature highlight */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Zap className="h-5 w-5" /></span>
          <p className="mt-3 text-sm font-semibold text-slate-900">Instant AI explanations</p>
          <p className="mt-1 text-xs text-slate-500">Ask about Java, Python, DBMS and more — get structured answers from a built-in knowledge base, ready for AI API integration.</p>
        </div>
        <div className="card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent-600"><Target className="h-5 w-5" /></span>
          <p className="mt-3 text-sm font-semibold text-slate-900">Auto-graded quizzes</p>
          <p className="mt-1 text-xs text-slate-500">Multiple-choice questions with instant scoring, correct answers, and explanations for every question.</p>
        </div>
        <div className="card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></span>
          <p className="mt-3 text-sm font-semibold text-slate-900">Smart recommendations</p>
          <p className="mt-1 text-xs text-slate-500">A simple ML model estimates your mastery per topic and recommends what to study next.</p>
        </div>
      </section>
    </div>
  );
}
