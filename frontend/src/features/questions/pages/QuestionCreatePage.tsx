import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import type { QuestionsContextType } from '../../../app/App';
import { QuestionForm } from '../components/QuestionForm';

export const QuestionCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { addQuestion } = useOutletContext<QuestionsContextType>();

  const handleSubmit = (data: {
    question: string;
    answer: string;
    category: QuestionsContextType['questions'][0]['category'];
    difficulty: QuestionsContextType['questions'][0]['difficulty'];
    questionType: QuestionsContextType['questions'][0]['questionType'];
  }) => {
    // add question to mock array and get the new ID
    const newId = addQuestion(data);
    // Navigate to the detail page of the newly created question
    navigate(`/questions/${newId}`);
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
      <QuestionForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};
