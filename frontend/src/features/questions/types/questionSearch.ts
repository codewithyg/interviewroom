import type { Category, Difficulty, QuestionType } from './question';

export type QuestionSearchCondition = {
  keyword: string;
  category: Category | '';
  difficulty: Difficulty | '';
  questionType: QuestionType | '';
};
