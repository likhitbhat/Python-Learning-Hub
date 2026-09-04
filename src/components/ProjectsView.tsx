import React, { useState } from 'react';
import { MINI_PROJECTS } from '../data/projectsData';
import type { DifficultyLevel } from '../types';
import { ArrowLeft, CheckCircle2, Sparkles, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ProjectsViewProps {
  onBackToHome: () => void;
  onOpenPlaygroundWithCode: (code: string) => void;
  completedProjects: Record<string, boolean>;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onBackToHome,
  onOpenPlaygroundWithCode,
  completedProjects = {}
}) => {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [expandedSolutionId, setExpandedSolutionId] = useState<string | null>(null);

  const filteredProjects = MINI_PROJECTS.filter(
    (p) => selectedLevel === 'all' || p.level === selectedLevel
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">REAL-WORLD LABS</span>
            <h1 className="text-xl text-slate-900 font-extrabold">Hands-On Python Mini-Project Labs</h1>
          </div>
        </button>

        <span className="px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs sm:text-sm font-extrabold shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600 fill-purple-400" />
          <span>Hands-On Mastery</span>
        </span>
      </div>

      {/* Level Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-slate-200">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => {
          const isActive = selectedLevel === level;
          const label = level === 'all' ? 'All Projects' : level.charAt(0).toUpperCase() + level.slice(1);
          return (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const IconComp = (Icons as any)[project.iconName] || Icons.Code2;
          const isDone = completedProjects[project.id];
          const isSolutionOpen = expandedSolutionId === project.id;

          return (
            <div
              key={project.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${
                    project.level === 'beginner' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    project.level === 'intermediate' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    'bg-purple-100 text-purple-800 border border-purple-300'
                  }`}>
                    {project.level}
                  </span>

                  <div className="flex items-center gap-2">
                    {isDone && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-extrabold text-xs">
                      +{project.xp} XP
                    </span>
                  </div>
                </div>

                {/* Project Title & Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm italic font-serif mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Learning Outcome Callout */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 mb-6">
                  <span className="font-bold text-slate-900">💡 Outcome: </span>
                  {project.learningOutcome}
                </div>
              </div>

              {/* Action Controls */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOpenPlaygroundWithCode(project.starterCode)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Build & Run in Playground</span>
                </button>

                <button
                  onClick={() => setExpandedSolutionId(isSolutionOpen ? null : project.id)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 py-1 transition-colors cursor-pointer"
                >
                  <span>{isSolutionOpen ? 'Hide Solution Reference' : 'View Verified Solution Code'}</span>
                  {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Expandable Solution Block */}
                {isSolutionOpen && (
                  <div className="rounded-2xl bg-slate-900 text-emerald-300 p-4 font-mono text-xs overflow-x-auto border border-slate-800 animate-fadeIn">
                    <div className="text-slate-400 font-bold mb-2 pb-1 border-b border-slate-800">
                      Solution Code Reference:
                    </div>
                    <pre className="whitespace-pre">{project.solutionCode}</pre>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
