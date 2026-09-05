import React, { useState } from 'react';
import { CHEAT_SHEET_DATA } from '../data/cheatSheetData';
import { ArrowLeft, Zap, Star, Home } from 'lucide-react';
import * as Icons from 'lucide-react';
import { InArticleAd } from './InArticleAd';

interface CheatSheetViewProps {
  onBackToHome: () => void;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ onBackToHome }) => {
  const [activeTabId, setActiveTabId] = useState<string>('python-basics');

  const currentTopicData = CHEAT_SHEET_DATA.find((t) => t.id === activeTabId) || CHEAT_SHEET_DATA[0];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">INTERVIEW PREP</span>
            <h1 className="text-xl text-slate-900 font-extrabold">Python Technical Interview Cheat Sheet</h1>
          </div>
        </button>

        <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>{CHEAT_SHEET_DATA.length} Topics</span>
        </span>
      </div>

      {/* Horizontal Scrollable Topic Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-slate-200/80">
        {CHEAT_SHEET_DATA.map((topic) => {
          const isActive = topic.id === activeTabId;
          const IconComp = (Icons as any)[topic.iconName] || Zap;
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTabId(topic.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span>{topic.title}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Grid of Cheat Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentTopicData.tables.map((table, tIdx) => (
          <div key={tIdx} className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase mb-4">
              {table.categoryTitle}
            </h3>

            <div className="space-y-4">
              {table.items.map((item, itemIdx) => (
                <div key={itemIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 font-mono text-xs sm:text-sm">
                  <div className="font-bold text-blue-700 mb-1">{item.operatorOrConcept}</div>
                  <div className="text-slate-600 font-sans mb-1">{item.description}</div>
                  <div className="text-slate-800 font-mono bg-white p-2 rounded-xl border border-slate-200/80 text-xs">
                    {item.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interview Tips Callout Box */}
      <div className="rounded-3xl bg-amber-50/90 border border-amber-200 p-6 sm:p-8 text-amber-900 mb-10 shadow-xs">
        <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg mb-4 text-amber-950">
          <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
          <span>Interview Tips — {currentTopicData.title}</span>
        </div>

        <ul className="space-y-2.5 text-sm sm:text-base font-serif">
          {currentTopicData.interviewTips.map((tip, tipIdx) => (
            <li key={tipIdx} className="flex items-start gap-2.5">
              <span className="text-amber-600 font-bold">→</span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* In-Article Advertisement */}
      <InArticleAd />

      {/* Footer Quote & Back to Quizzes Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-slate-200 text-center sm:text-left">
        <p className="text-slate-500 italic font-serif text-sm max-w-lg">
          "The best programmers are not those who memorize the most code, but those who practice solving problems every day."
        </p>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Quizzes</span>
        </button>
      </div>

    </div>
  );
};
