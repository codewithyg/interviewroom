import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { InterviewQuestionListItem } from '../../features/questions/types/question';

interface AppLayoutProps {
  questionsCount: number;
  questions: InterviewQuestionListItem[];
  isLoading: boolean;
  error: Error | null;
  refreshQuestions: () => Promise<void>;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  questionsCount,
  questions,
  isLoading,
  error,
  refreshQuestions
}) => {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      {/* Sidebar - fixed left */}
      <Sidebar />

      {/* Main Container - right of sidebar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header */}
        <Header questionsCount={questionsCount} />

        {/* Content Outlet */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet context={{ questions, isLoading, error, refreshQuestions }} />
        </main>
      </div>
    </div>
  );
};


