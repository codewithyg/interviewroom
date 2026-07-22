import type { InterviewQuestionListItem } from '../types/question';
import type { QuestionSearchCondition } from '../types/questionSearch';

/**
 * 질문 목록을 지정된 조건에 따라 임시로 필터링하는 헬퍼 함수
 */
export function filterQuestions(
  questions: InterviewQuestionListItem[],
  condition: QuestionSearchCondition
): InterviewQuestionListItem[] {
  return questions.filter((q) => {
    // 키워드 필터링 (질문 내용 question 기준)
    if (condition.keyword.trim()) {
      const keyword = condition.keyword.trim().toLowerCase();
      if (!q.question.toLowerCase().includes(keyword)) {
        return false;
      }
    }
    // 카테고리 필터링
    if (condition.category && q.category !== condition.category) {
      return false;
    }
    // 난이도 필터링
    if (condition.difficulty && q.difficulty !== condition.difficulty) {
      return false;
    }
    // 질문 유형 필터링
    if (condition.questionType && q.questionType !== condition.questionType) {
      return false;
    }
    return true;
  });
}

/**
 * 검색 조건을 백엔드 API 쿼리 파라미터 규격(URLSearchParams)으로 변환하는 함수
 */
export function buildQuestionSearchParams(condition: QuestionSearchCondition): URLSearchParams {
  const params = new URLSearchParams();
  if (condition.keyword.trim()) {
    params.append('keyword', condition.keyword.trim());
  }
  if (condition.category) {
    params.append('category', condition.category);
  }
  if (condition.difficulty) {
    params.append('difficulty', condition.difficulty);
  }
  if (condition.questionType) {
    params.append('questionType', condition.questionType);
  }
  return params;
}
