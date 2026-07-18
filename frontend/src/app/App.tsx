import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { InterviewQuestionListItem } from '../features/questions/types/question';
import { getQuestions } from '../features/questions/api/questionApi';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../features/questions/pages/DashboardPage';
import { QuestionListPage } from '../features/questions/pages/QuestionListPage';
import { QuestionDetailPage } from '../features/questions/pages/QuestionDetailPage';
import { QuestionCreatePage } from '../features/questions/pages/QuestionCreatePage';
import { QuestionEditPage } from '../features/questions/pages/QuestionEditPage';

export interface QuestionsContextType {
  questions: InterviewQuestionListItem[];
  isLoading: boolean;
  error: Error | null;
  refreshQuestions: () => Promise<void>;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestionListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch questions'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wrapper */}
        <Route
          element={
            <AppLayout
              questionsCount={questions.length}
              questions={questions}
              isLoading={isLoading}
              error={error}
              refreshQuestions={refreshQuestions}
            />
          }
        >
          {/* Dashboard route */}
          <Route
            path="/"
            element={<DashboardPage />}
          />
          {/* Question List route */}
          <Route
            path="/questions"
            element={<QuestionListPage />}
          />
          {/* Question Create route */}
          <Route
            path="/questions/new"
            element={<QuestionCreatePage />}
          />
          {/* Question Detail route */}
          <Route
            path="/questions/:id"
            element={<QuestionDetailPage />}
          />
          {/* Question Edit route */}
          <Route
            path="/questions/:id/edit"
            element={<QuestionEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

