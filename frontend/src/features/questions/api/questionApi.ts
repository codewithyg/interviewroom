import type {
  InterviewQuestionListItem,
  InterviewQuestionDetail,
  QuestionCreateRequest,
  QuestionUpdateRequest,
} from '../types/question';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/**
 * API 에러 처리를 위한 헬퍼 함수
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `API Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // JSON 파싱 실패 시 기본 상태 코드 메시지 사용
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return null as unknown as T;
  }
  
  return response.json() as Promise<T>;
}

/**
 * 1. 질문 목록 조회 (GET /questions)
 */
export async function getQuestions(): Promise<InterviewQuestionListItem[]> {
  const response = await fetch(`${BASE_URL}/questions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<InterviewQuestionListItem[]>(response);
}

/**
 * 2. 질문 상세 조회 (GET /questions/{questionId})
 */
export async function getQuestion(questionId: number): Promise<InterviewQuestionDetail> {
  const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<InterviewQuestionDetail>(response);
}

/**
 * 3. 질문 등록 (POST /questions)
 */
export async function createQuestion(request: QuestionCreateRequest): Promise<InterviewQuestionDetail> {
  const response = await fetch(`${BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return handleResponse<InterviewQuestionDetail>(response);
}

/**
 * 4. 질문 수정 (PATCH /questions/{questionId})
 */
export async function updateQuestion(
  questionId: number,
  request: QuestionUpdateRequest
): Promise<InterviewQuestionDetail> {
  const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return handleResponse<InterviewQuestionDetail>(response);
}

/**
 * 5. 질문 삭제 (DELETE /questions/{questionId})
 */
export async function deleteQuestion(questionId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await handleResponse<void>(response);
}
