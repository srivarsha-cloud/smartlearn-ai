import type { Subject, SubjectId } from '@/types';

export const SUBJECTS: Subject[] = [
  {
    id: 'java',
    name: 'Java',
    short: 'Java',
    description: 'Object-oriented programming, JVM, Spring & more.',
    icon: 'Coffee',
    accent: 'from-orange-500 to-amber-600',
    tag: 'Programming',
  },
  {
    id: 'python',
    name: 'Python',
    short: 'Python',
    description: 'Versatile language for data, web, and AI.',
    icon: 'Code2',
    accent: 'from-sky-500 to-blue-600',
    tag: 'Programming',
  },
  {
    id: 'dbms',
    name: 'DBMS',
    short: 'DBMS',
    description: 'Relational databases, SQL, normalization, transactions.',
    icon: 'Database',
    accent: 'from-emerald-500 to-teal-600',
    tag: 'Systems',
  },
  {
    id: 'os',
    name: 'Operating Systems',
    short: 'OS',
    description: 'Processes, memory, scheduling & file systems.',
    icon: 'Cpu',
    accent: 'from-slate-600 to-slate-800',
    tag: 'Systems',
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    short: 'Networks',
    description: 'TCP/IP, protocols, routing & the OSI model.',
    icon: 'Network',
    accent: 'from-indigo-500 to-violet-600',
    tag: 'Systems',
  },
  {
    id: 'math',
    name: 'Mathematics',
    short: 'Math',
    description: 'Discrete math, linear algebra, probability & statistics.',
    icon: 'Sigma',
    accent: 'from-rose-500 to-pink-600',
    tag: 'Foundations',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    short: 'AI',
    description: 'Machine learning, neural networks, search & reasoning.',
    icon: 'BrainCircuit',
    accent: 'from-accent-500 to-accent-700',
    tag: 'Intelligence',
  },
];

export const SUBJECT_MAP: Record<SubjectId, Subject> = SUBJECTS.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<SubjectId, Subject>,
);
