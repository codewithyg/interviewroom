import { filterQuestions, buildQuestionSearchParams } from './questionSearch';
import type { InterviewQuestionListItem } from '../types/question';
import type { QuestionSearchCondition } from '../types/questionSearch';

const mockQuestions: InterviewQuestionListItem[] = [
  {
    id: 1,
    question: 'DI란 무엇인가요?',
    category: 'SPRING',
    difficulty: 'NORMAL',
    questionType: 'EXPECTED',
    createdAt: '2026-07-12T10:30:00',
  },
  {
    id: 2,
    question: 'Java의 GC 동작 방식에 대해 설명해주세요.',
    category: 'JAVA',
    difficulty: 'HARD',
    questionType: 'ACTUAL',
    createdAt: '2026-07-13T11:00:00',
  },
  {
    id: 3,
    question: 'Index가 무엇이고 왜 사용하나요?',
    category: 'DATABASE',
    difficulty: 'EASY',
    questionType: 'EXPECTED',
    createdAt: '2026-07-14T09:00:00',
  },
];

// 검증 헬퍼
function assertEquals<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`FAIL: ${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
  console.log(`PASS: ${message}`);
}

export function runTests() {
  console.log('--- Starting questionSearch Utility Tests ---');

  // Test 1: Keyword Filtering
  const cond1: QuestionSearchCondition = { keyword: 'Java', category: '', difficulty: '', questionType: '' };
  const res1 = filterQuestions(mockQuestions, cond1);
  assertEquals(res1.length, 1, 'Keyword Filtering count');
  assertEquals(res1[0].id, 2, 'Keyword Filtering matched ID');

  // Test 2: Category Filtering
  const cond2: QuestionSearchCondition = { keyword: '', category: 'SPRING', difficulty: '', questionType: '' };
  const res2 = filterQuestions(mockQuestions, cond2);
  assertEquals(res2.length, 1, 'Category Filtering count');
  assertEquals(res2[0].id, 1, 'Category Filtering matched ID');

  // Test 3: Combined Filtering
  const cond3: QuestionSearchCondition = { keyword: 'DI', category: 'SPRING', difficulty: 'NORMAL', questionType: 'EXPECTED' };
  const res3 = filterQuestions(mockQuestions, cond3);
  assertEquals(res3.length, 1, 'Combined Filtering count');
  assertEquals(res3[0].id, 1, 'Combined Filtering matched ID');

  // Test 4: Empty Condition Filtering
  const cond4: QuestionSearchCondition = { keyword: '', category: '', difficulty: '', questionType: '' };
  const res4 = filterQuestions(mockQuestions, cond4);
  assertEquals(res4.length, 3, 'Empty Condition Filtering count');

  // Test 5: Build Search Params
  const cond5: QuestionSearchCondition = { keyword: 'JPA', category: 'SPRING', difficulty: 'HARD', questionType: 'ACTUAL' };
  const params = buildQuestionSearchParams(cond5);
  assertEquals(params.get('keyword'), 'JPA', 'Param keyword check');
  assertEquals(params.get('category'), 'SPRING', 'Param category check');
  assertEquals(params.get('difficulty'), 'HARD', 'Param difficulty check');
  assertEquals(params.get('questionType'), 'ACTUAL', 'Param questionType check');

  console.log('--- All tests passed successfully! ---');
}
