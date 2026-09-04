import React, { useState } from 'react';
import type { TopicNotes } from '../types';
import { ArrowLeft, Play, Lightbulb, ChevronDown, ChevronUp, Code2, Check, Copy, AlertTriangle, Compass, BookOpenCheck } from 'lucide-react';

interface NotesViewProps {
  notes: TopicNotes;
  onBack: () => void;
  onTakeQuiz: (topicId: string) => void;
  onOpenPlaygroundWithCode: (code: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onBack,
  onTakeQuiz,
  onOpenPlaygroundWithCode
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    notes.sections.forEach((sec) => {
      initial[sec.id] = true;
    });
    return initial;
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Illustrated Story Notes</span>
            <span className="text-base text-slate-900 font-bold">{notes.title}</span>
          </div>
        </button>

        <button
          onClick={() => onTakeQuiz(notes.topicId)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Take Quiz</span>
        </button>
      </div>

      {/* Main Topic H1 Header */}
      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
        {notes.title}
      </h1>
      <p className="text-slate-600 font-serif italic text-base sm:text-lg mb-6 leading-relaxed">
        {notes.subtitle || notes.summary}
      </p>

      {/* Quick Jump Subtopic Pills */}
      {notes.quickTopics && notes.quickTopics.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {notes.quickTopics.map((topicName, idx) => (
            <a
              key={idx}
              href={`#section-${idx}`}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium whitespace-nowrap shadow-2xs transition-colors"
            >
              {topicName}
            </a>
          ))}
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-8">
        {notes.sections.map((section, index) => {
          const isOpen = openSections[section.id] !== false;
          return (
            <div
              id={`section-${index}`}
              key={section.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all"
            >
              {/* Section Header Accordion Trigger */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors cursor-pointer border-l-4 border-l-purple-600"
              >
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                  {section.title}
                </h2>
                <div className="text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-6 pb-8 sm:px-8 space-y-6">
                  
                  {/* Storytelling Narrative Box */}
                  {section.storyNarrative && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
                      <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-2">
                        <BookOpenCheck className="w-4 h-4" />
                        <span>Story Time: Let's Imagine! 📖</span>
                      </div>
                      <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-serif italic">
                        "{section.storyNarrative}"
                      </p>
                    </div>
                  )}

                  {/* Textbook Style Seamless Illustration Figure */}
                  {section.imageUrl && (
                    <figure className="my-6 text-center">
                      <img
                        src={section.imageUrl}
                        alt={`${notes.title} - ${section.title} visual block diagram`}
                        loading="lazy"
                        decoding="async"
                        className="w-full max-w-2xl mx-auto h-auto max-h-[420px] object-contain rounded-2xl border border-slate-200/80 shadow-md bg-white p-2 hover:shadow-lg transition-shadow"
                      />
                      <figcaption className="mt-3 text-xs sm:text-sm font-serif italic text-slate-500">
                        Figure {index + 1}.1: {section.title} Architecture Visual Block Diagram
                      </figcaption>
                    </figure>
                  )}

                  {/* Real World Analogy Callout */}
                  {section.analogy && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 flex items-start gap-3">
                      <Compass className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm sm:text-base leading-relaxed">
                        <strong className="block text-blue-950 font-bold mb-0.5">Real World Analogy:</strong>
                        <span className="font-serif italic text-blue-900">{section.analogy}</span>
                      </div>
                    </div>
                  )}

                  {/* Detailed Explanation Paragraph */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Explanation</h4>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif">
                      {section.content}
                    </p>
                  </div>

                  {/* Code Example Block */}
                  {section.codeExample && (
                    <div className="rounded-2xl bg-slate-900 text-slate-100 p-5 font-mono text-sm shadow-inner relative group border border-slate-800 overflow-x-auto">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Python Code Example</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyCode(section.codeExample!, section.id)}
                            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded bg-slate-800"
                          >
                            {copiedId === section.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === section.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => onOpenPlaygroundWithCode(section.codeExample!)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Try in Playground</span>
                          </button>
                        </div>
                      </div>

                      <pre className="text-emerald-300 leading-relaxed font-mono whitespace-pre">
                        {section.codeExample}
                      </pre>
                    </div>
                  )}

                  {/* Common Mistakes to Avoid (Red Callout) */}
                  {section.commonMistakes && section.commonMistakes.length > 0 && (
                    <div className="rounded-2xl bg-rose-50/90 border border-rose-200 p-5 text-rose-950 space-y-2.5">
                      <div className="flex items-center gap-2 font-bold text-xs tracking-wider uppercase text-rose-800">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>COMMON MISTAKES TO AVOID</span>
                      </div>
                      <ul className="space-y-1.5 text-sm sm:text-base">
                        {section.commonMistakes.map((mistake, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-2">
                            <span className="text-rose-600 font-bold">⚠️</span>
                            <span className="leading-snug">{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pro Tips Lightbulb Callout Box */}
                  {section.proTips && section.proTips.length > 0 && (
                    <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 text-amber-900 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-xs tracking-wider uppercase text-amber-800">
                        <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500" />
                        <span>EXPERT PRO TIPS & GOTCHAS</span>
                      </div>
                      <ul className="space-y-2 text-sm sm:text-base">
                        {section.proTips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">→</span>
                            <span className="leading-snug">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
