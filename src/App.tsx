import { useCallback, useEffect, useState } from 'react';
import type { PageId, QuizAttempt } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { HomePage } from '@/pages/HomePage';
import { ChatPage } from '@/pages/ChatPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { AssessmentsPage } from '@/pages/AssessmentsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { loadAttempts, saveAttempt } from '@/lib/storage';

function App() {
  const [page, setPage] = useState<PageId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    loadAttempts().then(setAttempts);
  }, []);

  const navigate = useCallback((p: PageId) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const handleQuizComplete = useCallback(async (attempt: QuizAttempt) => {
    setAttempts((a) => [attempt, ...a]);
    await saveAttempt(attempt);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        current={page}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">
        <Topbar page={page} onOpenSidebar={() => setMobileOpen(true)} />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {page === 'home' && <HomePage onNavigate={navigate} attempts={attempts} />}
          {page === 'chat' && <ChatPage />}
          {page === 'resources' && <ResourcesPage />}
          {page === 'assessments' && <AssessmentsPage onComplete={handleQuizComplete} />}
          {page === 'dashboard' && <DashboardPage attempts={attempts} onNavigate={navigate} />}
        </main>
      </div>
    </div>
  );
}

export default App;
