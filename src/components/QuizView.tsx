import React, { useState } from 'react';
import type { Question, TopicQuiz } from '../types';
import { X, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  quiz: TopicQuiz;
  onClose: () => void;
  onComplete: (score: number, total: number, userAnswers: number[]) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quiz,
  onClose,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion: Question = quiz.questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      let score = 0;
      selectedAnswers.forEach((ans, idx) => {
        if (ans === quiz.questions[idx].correctAnswer) {
          score += 1;
        }
      });
      onComplete(score, quiz.questions.length, selectedAnswers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[85vh] flex flex-col justify-between">
      
      {/* Quiz Top Navigation Bar */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              title="Exit Quiz"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900">{quiz.title} Knowledge Test</h1>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold text-sm">
            🐍
          </div>
        </div>

        {/* Question Counter & Progress Segment Pills */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-semibold text-slate-700">
            Question {currentIndex + 1} of {quiz.questions.length}
          </span>

          <div className="flex items-center gap-1.5">
            {quiz.questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-blue-600'
                    : idx < selectedAnswers.length
                    ? 'w-3 bg-blue-400'
                    : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Notebook Lined Card Container */}
        <div className="rounded-3xl paper-lined border border-slate-300 shadow-md p-6 sm:p-10 relative overflow-hidden mb-6">
          
          {/* Question Text */}
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
            {currentQuestion.text}
          </h3>

          {/* Optional Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-2xl bg-slate-900 text-emerald-400 p-4 font-mono text-sm mb-6 shadow-inner">
              <pre>{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* 4 Options Grid */}
          <div className="space-y-3.5">
            {currentQuestion.options.map((optionText, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = currentQuestion.correctAnswer === optIdx;

              let buttonStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";
              let letterStyle = "bg-slate-100 text-slate-600";

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-2 ring-emerald-400/50";
                  letterStyle = "bg-emerald-600 text-white";
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-rose-50 border-rose-400 text-rose-900 font-semibold ring-2 ring-rose-400/50";
                  letterStyle = "bg-rose-600 text-white";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${buttonStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${letterStyle}`}>
                      {letter}
                    </span>
                    <span className="text-base sm:text-lg">{optionText}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />}
                      {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-600 fill-rose-100" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Pop-up Box */}
          {showExplanation && (
            <div className={`mt-6 p-5 rounded-2xl border ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            } animate-fadeIn`}>
              <div className="flex items-center gap-2 font-bold mb-2">
                <HelpCircle className="w-5 h-5" />
                <span>Explanation</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-serif">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex justify-end pt-4">
        {isAnswered && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:scale-105 transition-all cursor-pointer"
          >
            <span>{currentIndex + 1 === quiz.questions.length ? 'See Results' : 'Next Question'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
};
