export type SubjectId =
  | 'java'
  | 'python'
  | 'dbms'
  | 'os'
  | 'networks'
  | 'math'
  | 'ai';

export interface Subject {
  id: SubjectId;
  name: string;
  short: string;
  description: string;
  icon: string; // lucide icon name
  accent: string; // tailwind gradient classes
  tag: string;
}

export interface KnowledgeEntry {
  id: string;
  subject: SubjectId;
  question: string;
  keywords: string[];
  answer: string;
  references?: string[];
}

export interface QuizQuestion {
  id: string;
  subject: SubjectId;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface ResourceItem {
  id: string;
  subject: SubjectId;
  title: string;
  type: 'notes' | 'tutorial' | 'video' | 'reference';
  description: string;
  url: string;
  tags: string[];
}

export interface QuizAttempt {
  id: string;
  subject: SubjectId;
  score: number;
  total: number;
  topicBreakdown: { topic: string; correct: number; total: number }[];
  completedAt: string; // ISO
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  subject?: SubjectId;
  ts: number;
}

export type PageId = 'home' | 'chat' | 'resources' | 'assessments' | 'dashboard';
