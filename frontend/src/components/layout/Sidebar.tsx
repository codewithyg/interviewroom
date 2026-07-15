import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, Terminal, HelpCircle } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/questions', name: 'Questions', icon: FileText },
    { path: '/questions/new', name: 'New Question', icon: PlusCircle },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      {/* Brand Logo / Title */}
      <div className="h-16 border-b border-zinc-800 flex items-center px-6 space-x-3">
        <Terminal className="w-5 h-5 text-indigo-400" />
        <span className="font-bold text-lg tracking-tight text-zinc-100 font-mono">
          INTERVIEW<span className="text-indigo-400">ROOM</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
          Management
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 border ${
                  isActive
                    ? 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30'
                    : 'text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-200'
                }`
              }
              end={item.path === '/'}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-zinc-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>MOCK SERVER ACTIVE</span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-zinc-600 font-mono">
          <span>v1.0.0 (client)</span>
          <span className="hover:text-zinc-500 cursor-help flex items-center gap-0.5">
            <HelpCircle className="w-3 h-3" /> Docs
          </span>
        </div>
      </div>
    </aside>
  );
};
