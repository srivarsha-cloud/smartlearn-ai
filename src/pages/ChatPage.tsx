import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Bot, User, RotateCcw, Lightbulb } from 'lucide-react';
import type { ChatMessage, SubjectId } from '@/types';
import { SUBJECTS } from '@/data/subjects';
import { getBotReply } from '@/lib/chatbot';
import { uid } from '@/lib/storage';
import { SubjectIcon } from '@/components/SubjectIcon';

const STORAGE_KEY = 'smartlearn.chat';
const SUGGESTIONS = [
  'What is the JVM?',
  'Explain the ACID properties',
  'Difference between TCP and UDP',
  'What is gradient descent?',
  'How does garbage collection work in Java?',
  'What is the GIL in Python?',
];

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(0, 50)));
  } catch {
    /* ignore */
  }
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const hist = loadHistory();
    if (hist.length > 0) return hist;
    return [
      {
        id: uid(),
        role: 'assistant',
        content:
          "Hi! I'm your SmartLearn AI tutor. Ask me about Java, Python, DBMS, Operating Systems, Networks, Mathematics, or AI. You can also tap a suggestion below.",
        ts: Date.now(),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'all'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    saveHistory(messages);
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: trimmed, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate a brief thinking delay for a natural feel.
    window.setTimeout(() => {
      const reply = getBotReply(trimmed);
      const botMsg: ChatMessage = {
        id: uid(),
        role: 'assistant',
        content: reply.content,
        subject: reply.subject,
        ts: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 550 + Math.random() * 400);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function clearChat() {
    setMessages([
      {
        id: uid(),
        role: 'assistant',
        content: 'Conversation cleared. What would you like to learn about?',
        ts: Date.now(),
      },
    ]);
  }

  const placeholder =
    activeSubject === 'all'
      ? 'Ask about any subject…'
      : `Ask about ${SUBJECTS.find((s) => s.id === activeSubject)?.name}…`;

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col gap-4 sm:h-[calc(100vh-8rem)]">
      {/* Subject filter */}
      <div className="card flex flex-wrap items-center gap-2 p-3">
        <span className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Filter:</span>
        <button
          onClick={() => setActiveSubject('all')}
          className={[
            'chip transition',
            activeSubject === 'all'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          ].join(' ')}
        >
          All subjects
        </button>
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSubject(s.id)}
            className={[
              'chip transition',
              activeSubject === s.id
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            ].join(' ')}
          >
            <SubjectIcon name={s.icon} className="h-3.5 w-3.5" />
            {s.short}
          </button>
        ))}
        <button
          onClick={clearChat}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Clear
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="card scroll-thin flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="card p-3">
          <div className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold text-slate-500">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Try asking
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="chip bg-brand-50 text-brand-700 transition hover:bg-brand-100"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="card flex items-end gap-2 p-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder={placeholder}
          className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none"
        />
        <button type="submit" disabled={!input.trim() || typing} className="btn-primary">
          <Send className="h-4 w-4" /> Send
        </button>
      </form>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
        <Sparkles className="h-3 w-3" /> SmartLearn AI uses a built-in knowledge base and is structured for AI API integration.
      </p>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={['flex animate-fade-in gap-3', isUser ? 'flex-row-reverse' : 'flex-row'].join(' ')}>
      <span
        className={[
          'mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-sm',
          isUser
            ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
            : 'bg-gradient-to-br from-accent-500 to-accent-700 text-white',
        ].join(' ')}
      >
        {isUser ? <User className="h-[18px] w-[18px]" /> : <Bot className="h-[18px] w-[18px]" />}
      </span>
      <div className={['max-w-[80%] sm:max-w-[75%]', isUser ? 'items-end' : 'items-start'].join(' ')}>
        <div
          className={[
            'rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
            isUser
              ? 'bg-brand-600 text-white rounded-tr-md'
              : 'bg-slate-50 text-slate-800 ring-1 ring-slate-200/70 rounded-tl-md',
          ].join(' ')}
        >
          {message.content}
        </div>
        {message.subject && !isUser && (
          <span className="mt-1.5 inline-block chip bg-accent-50 text-accent-700">
            <SubjectIcon name={SUBJECTS.find((s) => s.id === message.subject)?.icon ?? 'Code2'} className="h-3.5 w-3.5" />
            {SUBJECTS.find((s) => s.id === message.subject)?.name}
          </span>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex animate-fade-in gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-sm">
        <Bot className="h-[18px] w-[18px]" />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-slate-50 px-4 py-3.5 ring-1 ring-slate-200/70">
        <Dot delay="0s" />
        <Dot delay="0.15s" />
        <Dot delay="0.3s" />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 rounded-full bg-accent-500 animate-bounce-dot"
      style={{ animationDelay: delay }}
    />
  );
}
