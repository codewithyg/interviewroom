import React from 'react';
import { useLocation } from 'react-router-dom';
import { Database, Wifi, Cpu } from 'lucide-react';

interface HeaderProps {
  questionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ questionsCount }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/questions') return 'Question List';
    if (path === '/questions/new') return 'Create Question';
    if (path.endsWith('/edit')) return 'Edit Question';
    if (path.startsWith('/questions/')) return 'Question Detail';
    return 'InterviewRoom';
  };

  return (
    <header className="h-16 bg-zinc-900/40 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <span className="text-zinc-500 font-mono text-sm">~/</span>
        <h1 className="text-sm font-semibold tracking-tight text-zinc-100 font-mono">
          {getPageTitle().toLowerCase().replace(' ', '_')}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Mock Indicator */}
        <div className="flex items-center space-x-2 bg-zinc-950 px-3 py-1 rounded border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Wifi className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>API: ONLINE</span>
        </div>

        {/* Database Status Indicator */}
        <div className="flex items-center space-x-2 bg-zinc-950 px-3 py-1 rounded border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>DB: SERVER ({questionsCount} ROWS)</span>
        </div>

        {/* User Info (Mock) */}
        <div className="flex items-center space-x-2.5 border-l border-zinc-800 pl-6">
          <div className="p-1 bg-zinc-800 rounded-md">
            <Cpu className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="text-left leading-none">
            <div className="text-xs font-semibold text-zinc-300">Developer</div>
            <span className="text-[10px] text-zinc-500 font-mono">dev@localhost</span>
          </div>
        </div>
      </div>
    </header>
  );
};

