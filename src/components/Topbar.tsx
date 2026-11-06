import { Menu, Search, Bell } from 'lucide-react';
import type { PageId } from '@/types';

const TITLES: Record<PageId, { title: string; subtitle: string }> = {
  home: { title: 'Welcome to SmartLearn AI', subtitle: 'Your AI-powered learning companion' },
  chat: { title: 'AI Chat Tutor', subtitle: 'Ask questions and get instant explanations' },
  resources: { title: 'Learning Resources', subtitle: 'Curated notes, tutorials, videos & references' },
  assessments: { title: 'Assessments', subtitle: 'Test your knowledge with interactive quizzes' },
  dashboard: { title: 'Student Dashboard', subtitle: 'Track progress and discover weak areas' },
};

interface TopbarProps {
  page: PageId;
  onOpenSidebar: () => void;
  onQuickSearch?: () => void;
}

export function Topbar({ page, onOpenSidebar }: TopbarProps) {
  const { title, subtitle } = TITLES[page];
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          onClick={onOpenSidebar}
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-700 text-slate-900 sm:text-xl">{title}</h1>
          <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
              S
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-semibold leading-none text-slate-800">Student</p>
              <p className="text-[11px] leading-none text-slate-400">Learner account</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
