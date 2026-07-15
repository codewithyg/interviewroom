export type InterviewQuestion = {
  id: number;
  question: string;
  answer: string;
  category: 'JAVA' | 'SPRING' | 'JPA' | 'DATABASE' | 'NETWORK' | 'OS' | 'PROJECT';
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  questionType: 'EXPECTED' | 'ACTUAL';
  createdAt: string;
  updatedAt: string;
};

export const CATEGORIES = ['JAVA', 'SPRING', 'JPA', 'DATABASE', 'NETWORK', 'OS', 'PROJECT'] as const;
export const DIFFICULTIES = ['EASY', 'NORMAL', 'HARD'] as const;
export const QUESTION_TYPES = ['EXPECTED', 'ACTUAL'] as const;
