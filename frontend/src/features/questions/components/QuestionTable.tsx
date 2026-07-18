import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar } from 'lucide-react';
import type { InterviewQuestionListItem } from '../types/question';
import { Badge } from '../../../components/ui/Badge';

interface QuestionTableProps {
  questions: InterviewQuestionListItem[];
}


export const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-lg">
        <p className="text-zinc-500 text-sm">등록된 질문이 없습니다.</p>
        <Link
          to="/questions/new"
          className="mt-3 inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 font-medium"
        >
          첫 번째 질문 등록하기 &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/80 border-b border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <th className="py-3.5 px-6 font-semibold">ID</th>
              <th className="py-3.5 px-6 font-semibold">Question</th>
              <th className="py-3.5 px-4 font-semibold text-center">Category</th>
              <th className="py-3.5 px-4 font-semibold text-center">Difficulty</th>
              <th className="py-3.5 px-4 font-semibold text-center">Type</th>
              <th className="py-3.5 px-6 font-semibold">Created At</th>
              <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-sm">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-zinc-850/40 transition-colors duration-150 group">
                <td className="py-4 px-6 font-mono text-xs text-zinc-500">
                  #{String(q.id).padStart(3, '0')}
                </td>
                <td className="py-4 px-6">
                  <div className="max-w-md lg:max-w-lg xl:max-w-xl">
                    <Link
                      to={`/questions/${q.id}`}
                      className="text-zinc-200 font-medium hover:text-indigo-400 transition-colors duration-150 block truncate"
                      title={q.question}
                    >
                      {q.question}
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge type="category" value={q.category} />
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge type="difficulty" value={q.difficulty} />
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge type="type" value={q.questionType} />
                </td>
                <td className="py-4 px-6 text-zinc-400 font-mono text-xs whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    {formatDate(q.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <Link
                    to={`/questions/${q.id}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 font-medium bg-indigo-500/10 group-hover:bg-indigo-500/15 border border-indigo-500/20 px-2.5 py-1 rounded transition-colors duration-150"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
