import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, HelpCircle } from 'lucide-react';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionTable } from '../components/QuestionTable';

export const QuestionListPage: React.FC = () => {
  const { questions } = useOutletContext<QuestionsContextType>();

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
