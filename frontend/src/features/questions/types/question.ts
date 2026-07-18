export type Category = 'JAVA' | 'SPRING' | 'JPA' | 'DATABASE' | 'NETWORK' | 'OS' | 'PROJECT';
export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';
export type QuestionType = 'EXPECTED' | 'ACTUAL';

export interface InterviewQuestion {
  id: number;
  question: string;
  answer: string;
  category: Category;
  difficulty: Difficulty;
  questionType: QuestionType;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestionListItem {
  id: number;
  question: string;
  category: Category;
  difficulty: Difficulty;
  questionType: QuestionType;
  createdAt: string;
}

export interface InterviewQuestionDetail {
  id: number;
  question: string;
  answer: string;
  category: Category;
  difficulty: Difficulty;
  questionType: QuestionType;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionCreateRequest {
  question: string;
  answer: string;
  category: Category;
  difficulty: Difficulty;
  questionType: QuestionType;
}

export interface QuestionUpdateRequest {
  question?: string;
  answer?: string;
  category?: Category;
  difficulty?: Difficulty;
  questionType?: QuestionType;
}

export const CATEGORIES = ['JAVA', 'SPRING', 'JPA', 'DATABASE', 'NETWORK', 'OS', 'PROJECT'] as const;
export const DIFFICULTIES = ['EASY', 'NORMAL', 'HARD'] as const;
export const QUESTION_TYPES = ['EXPECTED', 'ACTUAL'] as const;

