import React from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, Terminal } from 'lucide-react';
import type { QuestionsContextType } from '../../../app/App';
import { Badge } from '../../../components/ui/Badge';

export const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { questions, deleteQuestion } = useOutletContext<QuestionsContextType>();

  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-zinc-400 text-sm">해당 질문을 찾을 수 없거나 이미 삭제되었습니다.</p>
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

  const handleDelete = () => {
    if (window.confirm('정말로 이 질문을 삭제하시겠습니까?')) {
      deleteQuestion(questionId);
      navigate('/questions');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back navigation */}
      <Link
        to="/questions"
        className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-550 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK_TO_LIST</span>
      </Link>

      {/* Main Detail Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-8 space-y-6 shadow-sm">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800 pb-5">
          <Badge type="category" value={question.category} />
          <Badge type="difficulty" value={question.difficulty} />
          <Badge type="type" value={question.questionType} />

          <div className="ml-auto flex items-center space-x-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Created: {formatDate(question.createdAt)}
            </span>
            {question.updatedAt !== question.createdAt && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Updated: {formatDate(question.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-indigo-400">
            QUESTION
          </span>
          <h2 className="text-lg md:text-xl font-bold text-zinc-100 tracking-tight leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Answer Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400">
              ANSWER / EXPLANATION
            </span>
            <div className="flex items-center space-x-1.5 text-zinc-600 font-mono text-[10px]">
              <Terminal className="w-3.5 h-3.5" />
              <span>MARKDOWN_PLAINTEXT</span>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-md font-mono text-sm leading-relaxed text-zinc-300 overflow-x-auto whitespace-pre-wrap">
            {question.answer}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-zinc-800/60">
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-900/30 hover:border-red-500/50 hover:bg-red-950/20 active:bg-red-950/40 text-red-400 hover:text-red-300 rounded text-xs font-mono font-medium transition-all duration-150"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>DELETE</span>
          </button>
          <Link
            to={`/questions/${question.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 border border-zinc-700 hover:border-zinc-650 text-zinc-200 hover:text-zinc-100 rounded text-xs font-mono font-medium transition-all duration-150"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>EDIT_SOURCE</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
