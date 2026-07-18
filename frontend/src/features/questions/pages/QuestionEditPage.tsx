import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionForm } from '../components/QuestionForm';
import { getQuestion, updateQuestion as updateQuestionApi } from '../api/questionApi';
import type { InterviewQuestionDetail } from '../types/question';

export const QuestionEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refreshQuestions } = useOutletContext<QuestionsContextType>();

  const questionId = Number(id);
  const [question, setQuestion] = useState<InterviewQuestionDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getQuestion(questionId);
        setQuestion(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load question'));
      } finally {
        setIsLoading(false);
      }
    };

    if (!isNaN(questionId)) {
      fetchQuestion();
    } else {
      setIsLoading(false);
      setError(new Error('Invalid question ID'));
    }
  }, [questionId]);

  const handleSubmit = async (data: {
    question: string;
    answer: string;
    category: InterviewQuestionDetail['category'];
    difficulty: InterviewQuestionDetail['difficulty'];
    questionType: InterviewQuestionDetail['questionType'];
  }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await updateQuestionApi(questionId, data);
      await refreshQuestions(); // Update global count/list
      navigate(`/questions/${questionId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '질문을 수정하는 도중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/questions/${questionId}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">LOADING_QUESTION_DETAILS...</p>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="text-center py-16 space-y-4 max-w-md mx-auto">
        <AlertCircle className="w-8 h-8 text-zinc-550 mx-auto" />
        <p className="text-zinc-400 text-sm font-semibold">
          {error ? error.message : '수정할 질문을 찾을 수 없습니다.'}
        </p>
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
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
};

