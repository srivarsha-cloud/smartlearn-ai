import {
  Home, MessageSquare, BookOpen, ClipboardList, LayoutDashboard,
  GraduationCap, X, Sparkles,
} from 'lucide-react';
import type { PageId } from '@/types';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof Home;
  description: string;
}

const NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, description: 'Overview & quick links' },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, description: 'Ask the AI tutor' },
  { id: 'resources', label: 'Learning Resources', icon: BookOpen, description: 'Notes, videos & references' },
  { id: 'assessments', label: 'Assessments', icon: ClipboardList, description: 'Practice quizzes' },
  { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard, description: 'Progress & recommendations' },
];

interface SidebarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-glow">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-700 leading-none text-slate-900">SmartLearn</p>
              <p className="text-xs font-medium text-brand-600">AI Tutor</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {NAV.map((item) => {
            const active = current === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={[
                  'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                  active
                    ? 'bg-gradient-to-r from-brand-50 to-accent-50 text-brand-700 shadow-sm ring-1 ring-brand-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                ].join(' ')}
              >
                <span
                  className={[
                    'grid h-9 w-9 place-items-center rounded-lg transition',
                    active
                      ? 'bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200',
                  ].join(' ')}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold leading-tight">{item.label}</span>
                  <span className={['text-xs leading-tight', active ? 'text-brand-500' : 'text-slate-400'].join(' ')}>
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Promo card */}
        <div className="m-3 rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 p-4 text-white shadow-glow">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm font-semibold">AI-powered learning</p>
          </div>
          <p className="text-xs leading-relaxed text-brand-50/90">
            Ask the AI tutor anything about your subjects and get instant, structured explanations.
          </p>
        </div>
      </aside>
    </>
  );
}
