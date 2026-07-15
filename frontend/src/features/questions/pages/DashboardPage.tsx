import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, ArrowRight, HelpCircle, AlertCircle, FileText, Calendar } from 'lucide-react';
import type { QuestionsContextType } from '../../../app/App';
import { StatCard } from '../../../components/ui/StatCard';
import { QuestionSummaryCards } from '../components/QuestionSummaryCards';
import { Badge } from '../../../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  const { questions } = useOutletContext<QuestionsContextType>();

  // Sort and slice for recent questions (up to 4)
  const recentQuestions = [...questions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  // Stats calculation
  const totalCount = questions.length;
  const expectedCount = questions.filter(q => q.questionType === 'EXPECTED').length;
  const actualCount = questions.filter(q => q.questionType === 'ACTUAL').length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner/Welcome */}
      <div className="bg-gradient-to-r from-indigo-950/20 via-zinc-900 to-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">Welcome back, developer.</h2>
          <p className="text-xs text-zinc-400 mt-1">
            면접 질문을 기록하고 난이도와 유형별로 정렬하여 완벽하게 면접에 대비하세요.
          </p>
        </div>
        <Link
          to="/questions/new"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded text-sm font-medium transition-colors shadow-sm self-start md:self-auto font-mono"
        >
          <Plus className="w-4 h-4" />
          <span>NEW_QUESTION</span>
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Questions"
          value={totalCount}
          description="전체 등록된 질문 건수"
          icon={FileText}
          iconColor="text-indigo-400"
        />
        <StatCard
          title="Expected Questions"
          value={expectedCount}
          description="출제 예상 질문"
          icon={HelpCircle}
          iconColor="text-sky-400"
        />
        <StatCard
          title="Actual Questions"
          value={actualCount}
          description="실제 면접 기출 질문"
          icon={AlertCircle}
          iconColor="text-violet-400"
        />
      </div>

      {/* Summary Charts Component */}
      <QuestionSummaryCards questions={questions} />

      {/* Recent Questions Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">
            Recent Questions
          </h3>
          <Link
            to="/questions"
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition-colors"
          >
            <span>VIEW_ALL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentQuestions.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-zinc-800 rounded">
            <span className="text-zinc-500 text-xs">최근 등록된 질문이 없습니다.</span>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {recentQuestions.map((q) => (
              <div
                key={q.id}
                className="py-3.5 flex items-center justify-between hover:bg-zinc-850/20 px-2 rounded-md transition-colors group"
              >
                <div className="flex items-center space-x-4 min-w-0 pr-4">
                  <span className="font-mono text-xs text-zinc-650 shrink-0">
                    #{String(q.id).padStart(3, '0')}
                  </span>
                  <div className="min-w-0">
                    <Link
                      to={`/questions/${q.id}`}
                      className="text-sm font-medium text-zinc-200 hover:text-indigo-400 transition-colors block truncate"
                    >
                      {q.question}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge type="category" value={q.category} />
                      <Badge type="difficulty" value={q.difficulty} />
                      <Badge type="type" value={q.questionType} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-600" />
                    {formatDate(q.createdAt)}
                  </span>
                  <Link
                    to={`/questions/${q.id}`}
                    className="text-xs text-zinc-400 hover:text-indigo-400 font-mono"
                  >
                    Inspect &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
