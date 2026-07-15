import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionForm } from '../components/QuestionForm';

export const QuestionEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { questions, updateQuestion } = useOutletContext<QuestionsContextType>();

  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-zinc-400 text-sm">수정할 질문을 찾을 수 없습니다.</p>
        <Link
          to="/questions"
          className="inline-flex items-center space-x-2 text-xs font-mono text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK_TO_QUESTIONS</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = (data: {
    question: string;
    answer: string;
    category: typeof question.category;
    difficulty: typeof question.difficulty;
    questionType: typeof question.questionType;
  }) => {
    updateQuestion(questionId, data);
    navigate(`/questions/${questionId}`);
  };

  const handleCancel = () => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono text-zinc-550">
        <Link to="/questions" className="hover:text-zinc-300 transition-colors">QUESTIONS</Link>
        <span>/</span>
        <Link to={`/questions/${questionId}`} className="hover:text-zinc-300 transition-colors">
          #{String(questionId).padStart(3, '0')}
        </Link>
        <span>/</span>
        <span className="text-zinc-400">EDIT</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100">
          Edit Question #{String(questionId).padStart(3, '0')}
        </h2>
        <p className="text-xs text-zinc-450">
          질문 메타데이터와 참고 해설의 오타를 바로잡고 수정합니다.
        </p>
      </div>

      {/* Reusable QuestionForm with initial data */}
      <QuestionForm
        initialData={question}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
