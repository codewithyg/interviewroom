import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES } from '../types/question';
import type { QuestionSearchCondition } from '../types/questionSearch';

interface QuestionSearchFilterProps {
  onSearch: (condition: QuestionSearchCondition) => void;
  onReset: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  JAVA: 'JAVA',
  SPRING: 'SPRING',
  JPA: 'JPA',
  DATABASE: 'DATABASE',
  NETWORK: 'NETWORK',
  OS: 'OS',
  PROJECT: 'PROJECT',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: '쉬움',
  NORMAL: '보통',
  HARD: '어려움',
};

const TYPE_LABELS: Record<string, string> = {
  EXPECTED: '예상 질문',
  ACTUAL: '실제 질문',
};

export const QuestionSearchFilter: React.FC<QuestionSearchFilterProps> = ({
  onSearch,
  onReset,
}) => {
  const [condition, setCondition] = useState<QuestionSearchCondition>({
    keyword: '',
    category: '',
    difficulty: '',
    questionType: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCondition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(condition);
  };

  const handleResetClick = () => {
    const initialCondition: QuestionSearchCondition = {
      keyword: '',
      category: '',
      difficulty: '',
      questionType: '',
    };
    setCondition(initialCondition);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-4 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* 키워드 검색 */}
        <div className="space-y-1.5">
          <label htmlFor="keyword" className="block text-xs font-semibold text-zinc-400">
            키워드
          </label>
          <div className="relative">
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={condition.keyword}
              onChange={handleChange}
              placeholder="질문 키워드 검색"
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded px-3 py-2 pl-9 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* 카테고리 */}
        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-xs font-semibold text-zinc-400">
            카테고리
          </label>
          <select
            id="category"
            name="category"
            value={condition.category}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">전체</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {/* 난이도 */}
        <div className="space-y-1.5">
          <label htmlFor="difficulty" className="block text-xs font-semibold text-zinc-400">
            난이도
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={condition.difficulty}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">전체</option>
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {DIFFICULTY_LABELS[diff] || diff}
              </option>
            ))}
          </select>
        </div>

        {/* 질문 유형 */}
        <div className="space-y-1.5">
          <label htmlFor="questionType" className="block text-xs font-semibold text-zinc-400">
            질문 유형
          </label>
          <select
            id="questionType"
            name="questionType"
            value={condition.questionType}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">전체</option>
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABELS[t] || t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-800/60">
        <button
          type="button"
          onClick={handleResetClick}
          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-850 text-zinc-350 rounded text-sm font-medium transition-colors border border-zinc-700/60 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>초기화</span>
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-750 text-white rounded text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>검색</span>
        </button>
      </div>
    </form>
  );
};
