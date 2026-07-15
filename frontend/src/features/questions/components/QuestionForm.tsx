import React, { useState, useEffect } from 'react';
import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES } from '../types/question';
import type { InterviewQuestion } from '../types/question';

interface QuestionFormProps {
  initialData?: Partial<InterviewQuestion>;
  onSubmit: (data: {
    question: string;
    answer: string;
    category: InterviewQuestion['category'];
    difficulty: InterviewQuestion['difficulty'];
    questionType: InterviewQuestion['questionType'];
  }) => void;
  onCancel: () => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [category, setCategory] = useState<InterviewQuestion['category']>(initialData?.category || 'JAVA');
  const [difficulty, setDifficulty] = useState<InterviewQuestion['difficulty']>(initialData?.difficulty || 'NORMAL');
  const [questionType, setQuestionType] = useState<InterviewQuestion['questionType']>(initialData?.questionType || 'EXPECTED');

  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || '');
      setAnswer(initialData.answer || '');
      setCategory(initialData.category || 'JAVA');
      setDifficulty(initialData.difficulty || 'NORMAL');
      setQuestionType(initialData.questionType || 'EXPECTED');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { question?: string; answer?: string } = {};
    if (!question.trim()) newErrors.question = '질문 내용을 입력해 주세요.';
    if (!answer.trim()) newErrors.answer = '답변 내용을 입력해 주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      question,
      answer,
      category,
      difficulty,
      questionType
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-8">
      {/* Question Textarea */}
      <div className="space-y-2">
        <label htmlFor="question" className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
          Question <span className="text-red-500">*</span>
        </label>
        <textarea
          id="question"
          rows={3}
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (errors.question) setErrors(prev => ({ ...prev, question: undefined }));
          }}
          placeholder="면접 질문 내용을 상세히 입력하세요..."
          className={`w-full bg-zinc-950 border rounded-md p-3.5 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-sans resize-y transition-all ${
            errors.question ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-zinc-800'
          }`}
        />
        {errors.question && (
          <p className="text-xs text-red-400 font-mono">{errors.question}</p>
        )}
      </div>

      {/* Answer Textarea */}
      <div className="space-y-2">
        <label htmlFor="answer" className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
          Answer / Reference <span className="text-red-500">*</span>
        </label>
        <textarea
          id="answer"
          rows={10}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (errors.answer) setErrors(prev => ({ ...prev, answer: undefined }));
          }}
          placeholder="모범 답변이나 학습을 위한 참고 내용을 정리해 주세요. 줄 바꿈 및 마크다운처럼 구조화하여 작성할 수 있습니다."
          className={`w-full bg-zinc-950 border rounded-md p-3.5 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-mono resize-y transition-all ${
            errors.answer ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-zinc-800'
          }`}
        />
        {errors.answer && (
          <p className="text-xs text-red-400 font-mono">{errors.answer}</p>
        )}
      </div>

      {/* Dropdown Selects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Select */}
        <div className="space-y-2">
          <label htmlFor="category" className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as InterviewQuestion['category'])}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Select */}
        <div className="space-y-2">
          <label htmlFor="difficulty" className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as InterviewQuestion['difficulty'])}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Question Type Select */}
        <div className="space-y-2">
          <label htmlFor="questionType" className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Question Type
          </label>
          <select
            id="questionType"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as InterviewQuestion['questionType'])}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {QUESTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800/60">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 rounded text-sm font-medium text-zinc-400 transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded text-sm font-medium shadow transition-colors duration-150"
        >
          Save Question
        </button>
      </div>
    </form>
  );
};
