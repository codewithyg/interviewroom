import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, HelpCircle, AlertCircle } from 'lucide-react';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionTable } from '../components/QuestionTable';

export const QuestionListPage: React.FC = () => {
  const { questions, isLoading, error, refreshQuestions } = useOutletContext<QuestionsContextType>();

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">LOADING_QUESTIONS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950/10 border border-red-900/30 p-8 rounded-lg text-center max-w-lg mx-auto my-16 space-y-3">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        <p className="text-red-400 text-sm font-semibold">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className="text-zinc-500 text-xs font-mono whitespace-pre-wrap">{error.message}</p>
        <button
          onClick={() => refreshQuestions()}
          className="mt-2 inline-flex items-center justify-center px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded border border-zinc-700 transition-colors"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <span>Interview Questions</span>
            <span className="text-xs font-mono font-normal bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
              {questions.length} total
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            등록된 전체 면접 질문 목록을 한눈에 조회하고 관리합니다.
          </p>
        </div>
        <Link
          to="/questions/new"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded text-sm font-medium transition-colors shadow-sm self-start sm:self-auto font-mono"
        >
          <Plus className="w-4 h-4" />
          <span>NEW_QUESTION</span>
        </Link>
      </div>

      {/* Main Table Content */}
      <QuestionTable questions={questions} />

      {/* Quick Tips or Guides */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-start space-x-3 text-xs text-zinc-500">
        <HelpCircle className="w-4.5 h-4.5 text-zinc-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-zinc-400">인스펙션(Inspect) 가이드</p>
          <p>질문의 세부 내용과 모범 답안을 확인하려면 리스트 우측의 'Inspect' 버튼을 누르거나 질문 제목을 클릭하세요. 상세 페이지에서 질문을 수정하거나 삭제할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

