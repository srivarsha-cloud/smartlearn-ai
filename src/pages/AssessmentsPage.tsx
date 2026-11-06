import { useMemo, useState } from 'react';
import {
  ClipboardList, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  RotateCcw, Trophy, Clock, BookOpen, Sparkles,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { SUBJECTS, SUBJECT_MAP } from '@/data/subjects';
import type { QuizAttempt, QuizQuestion, SubjectId } from '@/types';
import { SubjectIcon } from '@/components/SubjectIcon';
import { uid } from '@/lib/storage';

interface AssessmentsPageProps {
  onComplete: (attempt: QuizAttempt) => void;
}

type Phase = 'select' | 'quiz' | 'result';

export function AssessmentsPage({ onComplete }: AssessmentsPageProps) {
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const subjectQuestionCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const q of QUIZ_QUESTIONS) {
      map[q.subject] = (map[q.subject] || 0) + 1;
    }
    return map;
  }, []);

  function startQuiz(subject: SubjectId) {
    const qs = QUIZ_QUESTIONS.filter((q) => q.subject === subject);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setSubmitted(false);
    setSelectedSubject(subject);
    setPhase('quiz');
  }

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((a) => {
      const next = [...a];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function finishQuiz() {
    setSubmitted(true);
    const subject = selectedSubject as SubjectId;
    const score = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0,
    );

    // Build per-topic breakdown for the recommendation engine.
    const topicMap = new Map<string, { correct: number; total: number }>();
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const t = topicMap.get(q.topic) ?? { correct: 0, total: 0 };
      t.total += 1;
      if (answers[i] === q.correctIndex) t.correct += 1;
      topicMap.set(q.topic, t);
    }

    const attempt: QuizAttempt = {
      id: uid(),
      subject,
      score,
      total: questions.length,
      topicBreakdown: Array.from(topicMap.entries()).map(([topic, v]) => ({
        topic,
        correct: v.correct,
        total: v.total,
      })),
      completedAt: new Date().toISOString(),
    };

    onComplete(attempt);
    setPhase('result');
  }

  function restart() {
    setPhase('select');
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setSubmitted(false);
    setSelectedSubject('all');
  }

  // ---------- Subject selection ----------
  if (phase === 'select') {
    return (
      <div className="space-y-6">
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-brand-600 to-accent-700 p-6 text-white">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              <h3 className="font-display text-lg font-700">Choose a subject</h3>
            </div>
            <p className="mt-1 text-sm text-brand-50/90">
              Each quiz has multiple-choice questions with automatic scoring, correct answers, and explanations.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => {
            const count = subjectQuestionCount[s.id] ?? 0;
            return (
              <button
                key={s.id}
                onClick={() => startQuiz(s.id)}
                className="group card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-sm`}>
                    <SubjectIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">{count} questions</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">{s.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                  Start quiz <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Quiz in progress ----------
  if (phase === 'quiz') {
    const q = questions[current];
    const answered = answers[current] !== null;
    const isLast = current === questions.length - 1;
    const allAnswered = answers.every((a) => a !== null);

    return (
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Progress */}
        <div className="card p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              {SUBJECT_MAP[selectedSubject as SubjectId].name}
            </span>
            <span className="text-slate-500">
              Question {current + 1} of {questions.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="chip bg-brand-50 text-brand-700">
              <BookOpen className="h-3.5 w-3.5" /> {q.topic}
            </span>
            <span
              className={[
                'chip',
                q.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-600' : '',
                q.difficulty === 'medium' ? 'bg-amber-50 text-amber-600' : '',
                q.difficulty === 'hard' ? 'bg-rose-50 text-rose-600' : '',
              ].join(' ')}
            >
              {q.difficulty}
            </span>
          </div>
          <h3 className="font-display text-base font-700 leading-snug text-slate-900 sm:text-lg">
            {q.question}
          </h3>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(current, i)}
                  className={[
                    'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                    selected
                      ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold',
                      selected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500',
                    ].join(' ')}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-ghost disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {isLast ? (
            <button
              onClick={finishQuiz}
              disabled={!allAnswered}
              className="btn-primary"
            >
              <Trophy className="h-4 w-4" /> Submit quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
              disabled={!answered}
              className="btn-primary"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
        {!allAnswered && isLast && (
          <p className="text-center text-xs text-amber-600">Answer all questions to submit.</p>
        )}
      </div>
    );
  }

  // ---------- Result ----------
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
  const pct = Math.round((score / questions.length) * 100);
  const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Fair' : 'Keep practicing';

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Score card */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-brand-600 to-accent-700 p-6 text-center text-white">
          <Trophy className="mx-auto h-10 w-10" />
          <p className="mt-2 font-display text-4xl font-800">{pct}%</p>
          <p className="mt-1 text-sm text-brand-50/90">
            {score} of {questions.length} correct · {grade}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 p-4">
          <button onClick={restart} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> Take another quiz
          </button>
        </div>
      </div>

      {/* Review */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-display text-base font-700 text-slate-900">Review answers</h3>
        <p className="mt-1 text-xs text-slate-500">See the correct answer and an explanation for each question.</p>

        <div className="mt-4 space-y-4">
          {questions.map((q, i) => {
            const userAns = answers[i];
            const correct = userAns === q.correctIndex;
            return (
              <div key={q.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {i + 1}. {q.question}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const isCorrect = oi === q.correctIndex;
                        const isUserWrong = oi === userAns && !isCorrect;
                        return (
                          <div
                            key={oi}
                            className={[
                              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs',
                              isCorrect ? 'bg-emerald-50 text-emerald-700' : '',
                              isUserWrong ? 'bg-rose-50 text-rose-700' : '',
                              !isCorrect && !isUserWrong ? 'bg-slate-50 text-slate-600' : '',
                            ].join(' ')}
                          >
                            <span className="font-bold">{String.fromCharCode(65 + oi)}.</span>
                            <span>{opt}</span>
                            {isCorrect && <CheckCircle2 className="ml-auto h-3.5 w-3.5" />}
                            {isUserWrong && <XCircle className="ml-auto h-3.5 w-3.5" />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-brand-50 p-3 text-xs text-brand-800">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <p><span className="font-semibold">Explanation: </span>{q.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={restart} className="btn-ghost">
          <ClipboardList className="h-4 w-4" /> Choose another subject
        </button>
      </div>
    </div>
  );
}
