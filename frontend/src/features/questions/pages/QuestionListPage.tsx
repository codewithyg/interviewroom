import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Plus, HelpCircle, AlertCircle, SearchX } from 'lucide-react';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionTable } from '../components/QuestionTable';
import { QuestionSearchFilter } from '../components/QuestionSearchFilter';
import type { InterviewQuestionListItem } from '../types/question';
import type { QuestionSearchCondition } from '../types/questionSearch';
import { getQuestions } from '../api/questionApi';

export const QuestionListPage: React.FC = () => {
  const { questions, isLoading, error, refreshQuestions } = useOutletContext<QuestionsContextType>();

  // 검색 조건 상태
  const [searchCondition, setSearchCondition] = useState<QuestionSearchCondition>({
    keyword: '',
    category: '',
    difficulty: '',
    questionType: '',
  });

  // 검색 버튼 클릭 여부 (필터 활성화 여부)
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  // 로컬 검색 결과 상태 및 로딩/에러 관리
  const [filteredQuestions, setFilteredQuestions] = useState<InterviewQuestionListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  const handleSearch = async (condition: QuestionSearchCondition) => {
    setSearchCondition(condition);
    setIsFiltered(true);
    setSearchLoading(true);
    setSearchError(null);
    try {
      const data = await getQuestions(condition);
      setFilteredQuestions(data);
    } catch (err) {
      setSearchError(err instanceof Error ? err : new Error('검색 중 오류가 발생했습니다.'));
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = () => {
    setSearchCondition({
      keyword: '',
      category: '',
      difficulty: '',
      questionType: '',
    });
    setIsFiltered(false);
    setFilteredQuestions([]);
    setSearchError(null);
  };

  const isAnyLoading = isLoading || searchLoading;
  const currentError = error || searchError;
  const displayedQuestions = isFiltered ? filteredQuestions : questions;

  if (isAnyLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">LOADING_QUESTIONS...</p>
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="bg-red-950/10 border border-red-900/30 p-8 rounded-lg text-center max-w-lg mx-auto my-16 space-y-3">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        <p className="text-red-400 text-sm font-semibold">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className="text-zinc-500 text-xs font-mono whitespace-pre-wrap">{currentError.message}</p>
        <button
          onClick={() => {
            if (isFiltered) {
              handleSearch(searchCondition);
            } else {
              refreshQuestions();
            }
          }}
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
              {isFiltered ? `검색 결과 ${displayedQuestions.length}개 표시` : `총 ${questions.length}개 표시`}
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

      {/* Search and Filter Panel */}
      <QuestionSearchFilter onSearch={handleSearch} onReset={handleReset} />

      {/* Main Table Content */}
      {isFiltered && displayedQuestions.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-lg flex flex-col items-center justify-center space-y-3">
          <SearchX className="w-8 h-8 text-zinc-500" />
          <div className="space-y-1">
            <p className="text-zinc-400 text-sm font-medium">검색 결과가 없습니다.</p>
            <p className="text-zinc-500 text-xs">검색 조건을 다르게 설정하여 다시 검색해 보세요.</p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded border border-zinc-700 transition-colors cursor-pointer"
          >
            검색 조건 초기화
          </button>
        </div>
      ) : (
        <QuestionTable questions={displayedQuestions} />
      )}

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

