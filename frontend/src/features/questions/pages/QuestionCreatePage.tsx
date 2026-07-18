import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionForm } from '../components/QuestionForm';
import { createQuestion } from '../api/questionApi';

export const QuestionCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { refreshQuestions } = useOutletContext<QuestionsContextType>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    question: string;
    answer: string;
    category: QuestionsContextType['questions'][0]['category'];
    difficulty: QuestionsContextType['questions'][0]['difficulty'];
    questionType: QuestionsContextType['questions'][0]['questionType'];
  }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const newQuestion = await createQuestion(data);
      await refreshQuestions(); // Update the global count in sidebar/header
      if (newQuestion && newQuestion.id) {
        navigate(`/questions/${newQuestion.id}`);
      } else {
        navigate('/questions');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '질문을 등록하는 도중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/questions');
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono text-zinc-550">
        <Link to="/questions" className="hover:text-zinc-300 transition-colors">QUESTIONS</Link>
        <span>/</span>
        <span className="text-zinc-400">NEW_QUESTION</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100">
          Create New Interview Question
        </h2>
        <p className="text-xs text-zinc-450">
          새로운 면접 질문과 해설을 등록하여 카테고리별 아카이브를 구축합니다.
        </p>
      </div>

      {/* Reusable QuestionForm */}
      <QuestionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
};

