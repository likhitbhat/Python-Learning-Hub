import React from 'react';
import type { Topic } from '../types';
import * as Icons from 'lucide-react';
import { Lock } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  completed?: boolean;
  score?: number;
  isLocked?: boolean;
  onReadNotes: (topicId: string) => void;
  onTakeQuiz: (topicId: string) => void;
}

const THEME_STYLES: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
  blue: { bg: 'bg-blue-50/60', border: 'border-blue-200/80', iconBg: 'bg-blue-100 text-blue-600', text: 'text-blue-700' },
  emerald: { bg: 'bg-emerald-50/60', border: 'border-emerald-200/80', iconBg: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-700' },
  purple: { bg: 'bg-purple-50/60', border: 'border-purple-200/80', iconBg: 'bg-purple-100 text-purple-600', text: 'text-purple-700' },
  amber: { bg: 'bg-amber-50/60', border: 'border-amber-200/80', iconBg: 'bg-amber-100 text-amber-600', text: 'text-amber-700' },
  cyan: { bg: 'bg-cyan-50/60', border: 'border-cyan-200/80', iconBg: 'bg-cyan-100 text-cyan-600', text: 'text-cyan-700' },
  rose: { bg: 'bg-rose-50/60', border: 'border-rose-200/80', iconBg: 'bg-rose-100 text-rose-600', text: 'text-rose-700' },
  indigo: { bg: 'bg-indigo-50/60', border: 'border-indigo-200/80', iconBg: 'bg-indigo-100 text-indigo-600', text: 'text-indigo-700' },
  teal: { bg: 'bg-teal-50/60', border: 'border-teal-200/80', iconBg: 'bg-teal-100 text-teal-600', text: 'text-teal-700' },
  orange: { bg: 'bg-orange-50/60', border: 'border-orange-200/80', iconBg: 'bg-orange-100 text-orange-600', text: 'text-orange-700' },
  violet: { bg: 'bg-violet-50/60', border: 'border-violet-200/80', iconBg: 'bg-violet-100 text-violet-600', text: 'text-violet-700' },
  sky: { bg: 'bg-sky-50/60', border: 'border-sky-200/80', iconBg: 'bg-sky-100 text-sky-600', text: 'text-sky-700' },
  lime: { bg: 'bg-lime-50/60', border: 'border-lime-200/80', iconBg: 'bg-lime-100 text-lime-600', text: 'text-lime-700' },
  pink: { bg: 'bg-pink-50/60', border: 'border-pink-200/80', iconBg: 'bg-pink-100 text-pink-600', text: 'text-pink-700' },
  fuchsia: { bg: 'bg-fuchsia-50/60', border: 'border-fuchsia-200/80', iconBg: 'bg-fuchsia-100 text-fuchsia-600', text: 'text-fuchsia-700' }
};

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  completed,
  score,
  isLocked = false,
  onReadNotes,
  onTakeQuiz
}) => {
  const theme = THEME_STYLES[topic.theme] || THEME_STYLES.blue;
  const IconComponent = (Icons as any)[topic.iconName] || Icons.BookOpen;

  return (
    <div className={`rounded-3xl ${theme.bg} border ${theme.border} p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group overflow-hidden`}>
      
      {/* Top Binder Holes & Question Count Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 opacity-40">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
        </div>

        <div className="flex items-center gap-2">
          {completed ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs">
              Score: {score}/10
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 font-extrabold text-[11px] capitalize">
              {topic.level}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-600 text-xs font-semibold shadow-xs">
            {topic.questionCount} Qs
          </span>
        </div>
      </div>

      {/* Main Topic Info */}
      <div className="mb-6">
        <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">
          {topic.title}
        </h3>

        <p className="text-slate-600 text-sm italic font-serif leading-relaxed line-clamp-2">
          {topic.description}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => onReadNotes(topic.id)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Icons.BookOpen className="w-4 h-4 text-slate-500" />}
          <span>{isLocked ? 'Notes 🔒' : 'Read Notes'}</span>
        </button>

        <button
          onClick={() => onTakeQuiz(topic.id)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-blue-500/20 cursor-pointer"
        >
          <span>{isLocked ? 'Quiz 🔒' : 'Take Quiz'}</span>
          {isLocked ? <Lock className="w-3.5 h-3.5 text-white" /> : <Icons.Play className="w-3.5 h-3.5 fill-white" />}
        </button>
      </div>

    </div>
  );
};
