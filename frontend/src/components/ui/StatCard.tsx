import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'text-zinc-400'
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex items-start justify-between shadow-sm transition-all duration-200 hover:border-zinc-700">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold font-mono tracking-tight text-zinc-100">{value}</span>
        </div>
        {description && (
          <p className="text-xs text-zinc-500 font-medium">{description}</p>
        )}
      </div>
      <div className={`p-3 bg-zinc-950/80 border border-zinc-800 rounded-md ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
