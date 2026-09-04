import React from 'react';
import { BookOpen, ArrowRight, Zap, FolderGit2, Sparkles, Users, Award, ShieldCheck, LogIn } from 'lucide-react';
import type { DifficultyLevel } from '../types';
import type { UserProfile } from './AuthModal';

interface HeroProps {
  onStartNotes: () => void;
  onStartQuiz: () => void;
  onOpenCheatSheet: () => void;
  onOpenProjects: () => void;
  onOpenAuth: () => void;
  user: UserProfile | null;
  selectedLevel: DifficultyLevel | 'all';
  onSelectLevel: (level: DifficultyLevel | 'all') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartNotes,
  onStartQuiz,
  onOpenCheatSheet,
  onOpenProjects,
  onOpenAuth,
  user,
  selectedLevel,
  onSelectLevel
}) => {
  return (
    <div className="space-y-10 mb-10">
      
      {/* Hero Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Welcome Hero Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-slate-200/60 border border-slate-300/80 p-8 sm:p-10 shadow-xs flex flex-col justify-between transition-all">
          
          {/* Handwritten Watermark Text Accent */}
          <div className="absolute right-6 top-2 text-7xl font-caveat text-blue-900/10 pointer-events-none select-none rotate-[-6deg]">
            while True:
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-xs font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Zero to Python Masterclass
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Master Python with <span className="text-blue-600 wavy-underline">Interactive Stories & Code</span>
            </h1>

            <p className="text-slate-600 italic text-base sm:text-lg max-w-2xl leading-relaxed font-serif pt-1">
              "Designed for absolute beginners with zero coding experience. Learn with Py-Bot through story narratives, visual diagrams, in-browser execution, and real-world labs."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 sm:gap-3.5 pt-6 sm:pt-8">
            <button
              onClick={onStartNotes}
              className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 border border-slate-300 font-extrabold text-sm sm:text-base shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Start Reading Notes</span>
            </button>

            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto justify-center flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md shadow-blue-600/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Take First Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenProjects}
              className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 font-extrabold text-sm sm:text-base transition-all cursor-pointer"
            >
              <FolderGit2 className="w-5 h-5 text-purple-700" />
              <span>Mini-Project Labs</span>
            </button>

            {!user && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
                <span>Create Free Account</span>
              </button>
            )}
          </div>
        </div>

        {/* Side Interview Cheat Sheet Card */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-9 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-inner">
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>

            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
              Interview Cheat Sheet
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Quick reference for syntax, complexity, patterns & OOP — ready for technical interview prep.
            </p>
          </div>

          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm sm:text-base transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
          >
            <span>Open Cheat Sheet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Platform Highlight Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-slate-900">50,000+</div>
            <div className="text-xs text-slate-500 font-medium">Active Learners</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-slate-900">16 Modules</div>
            <div className="text-xs text-slate-500 font-medium">Zero-to-Hero Topics</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-slate-900">100% WASM</div>
            <div className="text-xs text-slate-500 font-medium">In-Browser Python</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-slate-900">XP Badges</div>
            <div className="text-xs text-slate-500 font-medium">Gamified Progress</div>
          </div>
        </div>
      </div>

      {/* Guided Learning Track Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Roadmap Track:</span>
          <span className="text-sm font-bold text-slate-800">
            {selectedLevel === 'all' ? 'All 16 Masterclass Topics' : `${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Track`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'beginner', 'intermediate', 'advanced', 'mastery'] as const).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => onSelectLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
