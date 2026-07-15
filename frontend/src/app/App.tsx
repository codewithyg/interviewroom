import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { mockQuestions } from '../features/questions/data/mockQuestions';
import type { InterviewQuestion } from '../features/questions/types/question';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../features/questions/pages/DashboardPage';
import { QuestionListPage } from '../features/questions/pages/QuestionListPage';
import { QuestionDetailPage } from '../features/questions/pages/QuestionDetailPage';
import { QuestionCreatePage } from '../features/questions/pages/QuestionCreatePage';
import { QuestionEditPage } from '../features/questions/pages/QuestionEditPage';

export interface QuestionsContextType {
  questions: InterviewQuestion[];
  addQuestion: (data: Omit<InterviewQuestion, 'id' | 'createdAt' | 'updatedAt'>) => number;
  updateQuestion: (id: number, data: Partial<InterviewQuestion>) => void;
  deleteQuestion: (id: number) => void;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(mockQuestions);

  // Add Question - returns the newly created question's ID
  const addQuestion = (data: Omit<InterviewQuestion, 'id' | 'createdAt' | 'updatedAt'>) => {
    const nextId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const nowStr = new Date().toISOString();

    const newQuestion: InterviewQuestion = {
      ...data,
      id: nextId,
      createdAt: nowStr,
      updatedAt: nowStr,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    return nextId;
  };

  // Update Question
  const updateQuestion = (id: number, data: Partial<InterviewQuestion>) => {
    const nowStr = new Date().toISOString();

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              ...data,
              updatedAt: nowStr,
            }
          : q
      )
    );
  };

  // Delete Question
  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wrapper */}
        <Route
          element={
            <AppLayout
              questionsCount={questions.length}
              questions={questions}
              addQuestion={addQuestion}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
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
