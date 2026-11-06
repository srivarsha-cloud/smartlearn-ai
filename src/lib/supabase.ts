import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Create the client only when both values are present. In environments where
// the env vars are not injected into the browser bundle, we fall back to a
// no-op client so the rest of the app still renders — storage.ts then uses
// local persistence instead of the database.
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, { auth: { persistSession: false } })
    : null;
