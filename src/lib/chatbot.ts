import type { ChatMessage, KnowledgeEntry, SubjectId } from '@/types';
import { KNOWLEDGE_BASE, KNOWLEDGE_BY_SUBJECT } from '@/data/knowledge';
import { SUBJECT_MAP } from '@/data/subjects';

interface MatchResult {
  entry: KnowledgeEntry;
  score: number;
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'what', 'whats', 'what is', 'what are',
  'how', 'why', 'when', 'where', 'of', 'in', 'on', 'and', 'or', 'to', 'for',
  'do', 'does', 'did', 'can', 'could', 'would', 'should', 'i', 'you', 'we',
  'me', 'my', 'please', 'tell', 'explain', 'difference', 'between', 'with',
  'about', 'define', 'definition', '?', '.', ',', '!',
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreEntry(query: string, entry: KnowledgeEntry): number {
  const qTokens = tokenize(query);
  const qLower = normalize(query);
  let score = 0;

  // Exact question-substring match is a strong signal.
  if (entry.question.toLowerCase().includes(qLower) && qLower.length > 4) {
    score += 6;
  }

  for (const kw of entry.keywords) {
    const kwLower = kw.toLowerCase();
    if (qLower.includes(kwLower)) {
      score += kwLower.length > 6 ? 3 : 2;
    }
  }

  // Token overlap with question and keywords.
  const entryTokens = new Set([
    ...tokenize(entry.question),
    ...entry.keywords.flatMap((k) => tokenize(k)),
  ]);
  for (const t of qTokens) {
    if (entryTokens.has(t)) score += 1;
  }

  return score;
}

export function detectSubject(query: string): SubjectId | undefined {
  const q = normalize(query);
  for (const s of Object.values(SUBJECT_MAP)) {
    const name = s.name.toLowerCase();
    const short = s.short.toLowerCase();
    if (q.includes(short) || q.includes(name)) return s.id;
  }
  return undefined;
}

export interface BotReply {
  content: string;
  subject?: SubjectId;
  matched: boolean;
}

const FALLBACK_INTRO =
  "I'm not 100% sure I caught that, but here's what I can tell you. " +
  'Try asking a more specific question (e.g. "What is the GIL in Python?") or pick a subject from the list.';

export function getBotReply(userText: string): BotReply {
  const trimmed = userText.trim();
  if (!trimmed) {
    return { content: 'Please type a question and I will do my best to help!', matched: false };
  }

  // Greeting / small talk handled quickly.
  const greeting = normalize(trimmed);
  if (['hi', 'hello', 'hey', 'yo', 'hii', 'help', 'start'].includes(greeting)) {
    return {
      content:
        "Hi! I'm your SmartLearn AI tutor. Ask me about Java, Python, DBMS, Operating Systems, Networks, Mathematics, or AI. For example: \"What is the JVM?\" or \"Explain the ACID properties.\"",
      matched: false,
    };
  }

  // Score every entry; keep the best.
  const scored: MatchResult[] = KNOWLEDGE_BASE.map((entry) => ({
    entry,
    score: scoreEntry(trimmed, entry),
  }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0 && scored[0].score >= 3) {
    const top = scored[0].entry;
    let content = top.answer;
    if (top.references && top.references.length > 0) {
      content += '\n\nReferences: ' + top.references.join(', ');
    }
    return { content, subject: top.subject, matched: true };
  }

  // Subject-aware fallback: detect subject and offer related topics.
  const subject = detectSubject(trimmed);
  if (subject && KNOWLEDGE_BY_SUBJECT[subject]) {
    const suggestions = KNOWLEDGE_BY_SUBJECT[subject]
      .slice(0, 3)
      .map((e) => `• ${e.question}`)
      .join('\n');
    return {
      content: `${FALLBACK_INTRO}\n\nHere are some ${SUBJECT_MAP[subject].name} topics I know about:\n${suggestions}`,
      subject,
      matched: false,
    };
  }

  return {
    content:
      `${FALLBACK_INTRO}\n\nI cover Java, Python, DBMS, Operating Systems, Computer Networks, Mathematics, and Artificial Intelligence. Ask me something like "What is gradient descent?" or "Difference between TCP and UDP?"`,
    matched: false,
  };
}

// Prepare messages in the format an OpenAI-style chat API would expect,
// so swapping in a real AI backend later is a one-line change.
export function toApiMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({ role: m.role, content: m.content }));
}
