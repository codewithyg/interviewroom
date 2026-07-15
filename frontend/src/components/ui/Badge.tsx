import React from 'react';

type BadgeType = 'category' | 'difficulty' | 'type';

interface BadgeProps {
  type: BadgeType;
  value: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  const getStyles = () => {
    switch (type) {
      case 'category':
        switch (value) {
          case 'JAVA':
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
          case 'SPRING':
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
          case 'JPA':
            return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
          case 'DATABASE':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
          case 'NETWORK':
            return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
          case 'OS':
            return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
          case 'PROJECT':
            return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
          default:
            return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
      case 'difficulty':
        switch (value) {
          case 'EASY':
            return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
          case 'NORMAL':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
          case 'HARD':
            return 'bg-red-500/10 text-red-400 border-red-500/20';
          default:
            return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
      case 'type':
        switch (value) {
          case 'EXPECTED':
            return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
          case 'ACTUAL':
            return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
          default:
            return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border uppercase tracking-wider ${getStyles()}`}>
      {value}
    </span>
  );
};
