import { useMemo, useState } from 'react';
import { Search, ExternalLink, BookOpen, Video, FileText, GraduationCap, Filter } from 'lucide-react';
import { RESOURCES } from '@/data/resources';
import { SUBJECTS, SUBJECT_MAP } from '@/data/subjects';
import type { ResourceItem, SubjectId } from '@/types';
import { SubjectIcon } from '@/components/SubjectIcon';

const TYPE_META: Record<ResourceItem['type'], { label: string; icon: typeof BookOpen; color: string }> = {
  notes: { label: 'Notes', icon: FileText, color: 'bg-blue-50 text-blue-600' },
  tutorial: { label: 'Tutorial', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600' },
  video: { label: 'Video', icon: Video, color: 'bg-rose-50 text-rose-600' },
  reference: { label: 'Reference', icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
};

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState<SubjectId | 'all'>('all');
  const [type, setType] = useState<ResourceItem['type'] | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (subject !== 'all' && r.subject !== subject) return false;
      if (type !== 'all' && r.type !== type) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        SUBJECT_MAP[r.subject].name.toLowerCase().includes(q)
      );
    });
  }, [query, subject, type]);

  const grouped = useMemo(() => {
    const map = new Map<SubjectId, ResourceItem[]>();
    for (const r of filtered) {
      const list = map.get(r.subject);
      if (list) list.push(r);
      else map.set(r.subject, [r]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Search & filters */}
      <div className="card p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources, topics, or tags (e.g. 'tcp', 'neural', 'normalization')…"
            className="input pl-11"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Filter className="h-3.5 w-3.5" /> Subject:
          </span>
          <FilterChip active={subject === 'all'} onClick={() => setSubject('all')}>All</FilterChip>
          {SUBJECTS.map((s) => (
            <FilterChip key={s.id} active={subject === s.id} onClick={() => setSubject(s.id)}>
              <SubjectIcon name={s.icon} className="h-3.5 w-3.5" /> {s.short}
            </FilterChip>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Type:</span>
          <FilterChip active={type === 'all'} onClick={() => setType('all')}>All</FilterChip>
          {(Object.keys(TYPE_META) as ResourceItem['type'][]).map((t) => {
            const Icon = TYPE_META[t].icon;
            return (
              <FilterChip key={t} active={type === t} onClick={() => setType(t)}>
                <Icon className="h-3.5 w-3.5" /> {TYPE_META[t].label}
              </FilterChip>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Search className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">No resources found</p>
          <p className="mt-1 text-xs text-slate-500">Try a different search term or clear the filters.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> resource{filtered.length !== 1 ? 's' : ''}
          </p>
          {grouped.map(([subj, items]) => {
            const s = SUBJECT_MAP[subj];
            return (
              <section key={subj}>
                <div className="mb-3 flex items-center gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-sm`}>
                    <SubjectIcon name={s.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-700 text-slate-900">{s.name}</h3>
                    <p className="text-xs text-slate-500">{items.length} resource{items.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'chip transition',
        active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const meta = TYPE_META[resource.type];
  const Icon = meta.icon;
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <span className={`chip ${meta.color}`}>
          <Icon className="h-3.5 w-3.5" /> {meta.label}
        </span>
        <ExternalLink className="h-4 w-4 text-slate-300 transition group-hover:text-brand-500" />
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-900 leading-snug">{resource.title}</p>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500">{resource.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {resource.tags.map((t) => (
          <span key={t} className="chip bg-slate-100 text-slate-500">#{t}</span>
        ))}
      </div>
    </a>
  );
}
