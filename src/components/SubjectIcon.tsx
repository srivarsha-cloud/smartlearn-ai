import {
  Coffee, Code2, Database, Cpu, Network, Sigma, BrainCircuit,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Coffee,
  Code2,
  Database,
  Cpu,
  Network,
  Sigma,
  BrainCircuit,
};

export function SubjectIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Code2;
  return <Icon className={className} />;
}
