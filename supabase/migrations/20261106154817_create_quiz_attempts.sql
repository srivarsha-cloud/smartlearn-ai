/*
# Create quiz_attempts table (single-tenant, no auth)

## Purpose
SmartLearn AI is an educational chatbot site without a sign-in screen. Students
take quizzes in the Assessments page; each completed attempt is stored so the
Student Dashboard can show scores, per-topic mastery, and AI-driven study
recommendations across page reloads and sessions.

## New Tables
- `quiz_attempts`
  - `id` (uuid, primary key) — unique attempt id generated client-side
  - `subject` (text, not null) — one of: java, python, dbms, os, networks, math, ai
  - `score` (int, not null) — number of correct answers
  - `total` (int, not null) — total questions in the quiz
  - `topic_breakdown` (jsonb, not null default '[]') — array of {topic, correct, total}
    used by the recommendation engine to estimate per-topic mastery
  - `completed_at` (timestamptz, not null default now()) — when the attempt finished

## Security
- RLS enabled on `quiz_attempts`.
- CRUD granted to `anon` + `authenticated` so the anon-key frontend (no login)
  can read and write its own shared quiz history through the Data API.
- Policies allow all four CRUD verbs for `anon, authenticated` with `USING (true)`
  / `WITH CHECK (true)` because the quiz history is intentionally public/shared
  across this single-tenant demo (there is no per-user isolation and no sign-in).

## Notes
1. `topic_breakdown` is JSONB so the recommendation engine can aggregate
   per-topic accuracy without a separate topics table.
2. No `user_id` column or `auth.users` reference — this app has no sign-in.
3. Ordered reads use `completed_at desc` via the Supabase client query.
*/

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY,
  subject text NOT NULL,
  score int NOT NULL,
  total int NOT NULL,
  topic_breakdown jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON quiz_attempts TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_attempts" ON quiz_attempts;
CREATE POLICY "anon_select_attempts"
ON quiz_attempts FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_attempts" ON quiz_attempts;
CREATE POLICY "anon_insert_attempts"
ON quiz_attempts FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_attempts" ON quiz_attempts;
CREATE POLICY "anon_update_attempts"
ON quiz_attempts FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_attempts" ON quiz_attempts;
CREATE POLICY "anon_delete_attempts"
ON quiz_attempts FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS quiz_attempts_completed_at_idx
ON quiz_attempts (completed_at DESC);
CREATE INDEX IF NOT EXISTS quiz_attempts_subject_idx
ON quiz_attempts (subject);
