import React from 'react';
import { CATEGORIES, DIFFICULTIES } from '../types/question';
import type { InterviewQuestionListItem } from '../types/question';
import { Badge } from '../../../components/ui/Badge';

interface QuestionSummaryCardsProps {
  questions: InterviewQuestionListItem[];
}


export const QuestionSummaryCards: React.FC<QuestionSummaryCardsProps> = ({ questions }) => {
  // Calculate category stats
  const categoryStats = CATEGORIES.map(category => {
    const count = questions.filter(q => q.category === category).length;
    return { category, count };
  }).sort((a, b) => b.count - a.count); // sort by count descending

  // Calculate difficulty stats
  const difficultyStats = DIFFICULTIES.map(difficulty => {
    const count = questions.filter(q => q.difficulty === difficulty).length;
    return { difficulty, count };
  });

  const maxCategoryCount = Math.max(...categoryStats.map(s => s.count), 1);
  const totalQuestions = questions.length || 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Category Stats */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 mb-4">
          Questions by Category
        </h3>
        <div className="space-y-3.5">
          {categoryStats.map(({ category, count }) => {
            const percentage = (count / maxCategoryCount) * 100;
            const overallPercentage = Math.round((count / totalQuestions) * 100);

            return (
              <div key={category} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <Badge type="category" value={category} />
                  </div>
                  <span className="font-mono text-zinc-400">
                    {count} <span className="text-[10px] text-zinc-600">({overallPercentage}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty Stats */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 mb-4">
            Questions by Difficulty
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {difficultyStats.map(({ difficulty, count }) => {
              const percentage = Math.round((count / totalQuestions) * 100);
              let barColor = 'bg-teal-500';
              if (difficulty === 'NORMAL') barColor = 'bg-amber-500';
              if (difficulty === 'HARD') barColor = 'bg-red-500';

              return (
                <div
                  key={difficulty}
                  className="bg-zinc-950 border border-zinc-850 p-4 rounded-lg flex flex-col items-center justify-between text-center min-h-[120px]"
                >
                  <Badge type="difficulty" value={difficulty} />
                  <div className="my-2">
                    <span className="text-2xl font-bold font-mono text-zinc-100">{count}</span>
                    <span className="text-xs text-zinc-500 block">{percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Small System Note */}
        <div className="mt-6 border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
          <span>System Matrix Status</span>
          <span className="text-indigo-400">READY</span>
        </div>
      </div>
    </div>
  );
};
