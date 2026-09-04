import React, { useEffect, useState } from 'react';
import { Home, RotateCcw, Star, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TopicQuiz } from '../types';

interface QuizResultsProps {
  quiz: TopicQuiz;
  score: number;
  total: number;
  userAnswers: number[];
  onBackToHome: () => void;
  onRetake: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  score,
  total,
  userAnswers,
  onBackToHome,
  onRetake
}) => {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const starsCount = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;

  let feedbackMessage = "Great job! Keep practicing to master all topics.";
  if (percentage >= 90) {
    feedbackMessage = "Excellent work! You really know this topic.";
  } else if (percentage < 60) {
    feedbackMessage = "Nice attempt! Review the study notes and try again to improve your score.";
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-8">
        
        {/* Top Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-3xl shadow-xs">
          🐍
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-1">
            Quiz Completed!
          </h2>
          <p className="text-slate-500 italic font-serif text-lg">
            {quiz.title}
          </p>
        </div>

        {/* Star Ratings */}
        <div className="flex items-center justify-center gap-2 text-amber-400">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-8 h-8 ${
                starIdx <= starsCount ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-100'
              } transition-transform hover:scale-110`}
            />
          ))}
        </div>

        {/* Score Ring Gauge */}
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-slate-100 stroke-current"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-emerald-500 stroke-current transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * percentage) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-900 leading-none">
              {score}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase mt-1">
              out of {total}
            </span>
          </div>
        </div>

        {/* Feedback Message */}
        <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-700 text-base font-medium">
          {feedbackMessage}
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-base shadow-xs transition-all cursor-pointer"
          >
            <Home className="w-5 h-5 text-slate-500" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quiz</span>
          </button>
        </div>

        {/* Review Incorrect / All Answers Toggle */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowReview(!showReview)}
            className="flex items-center justify-center gap-2 mx-auto text-sm font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <span>{showReview ? 'Hide Answer Breakdown' : 'Review Questions & Explanations'}</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Detailed Question Review List */}
        {showReview && (
          <div className="text-left space-y-4 pt-4 border-t border-slate-100">
            {quiz.questions.map((q, qIdx) => {
              const uAns = userAnswers[qIdx];
              const isCorrect = uAns === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border ${
                    isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-bold text-slate-900 text-base">
                      {qIdx + 1}. {q.text}
                    </span>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-1">
                    Your answer: <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>{q.options[uAns] || 'Not answered'}</span>
                  </p>

                  {!isCorrect && (
                    <p className="text-xs text-emerald-800 font-bold mb-2">
                      Correct answer: {q.options[q.correctAnswer]}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 italic font-serif border-t border-slate-200/60 pt-2">
                    💡 {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
