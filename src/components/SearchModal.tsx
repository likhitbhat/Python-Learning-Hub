import React, { useState } from 'react';
import { Search, X, BookOpen, Play } from 'lucide-react';
import { TOPICS, NOTES_DATA } from '../data/topicsData';

interface SearchModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSelectTopicNotes: (topicId: string) => void;
  onSelectTopicQuiz: (topicId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen = true,
  onClose,
  onSelectTopicNotes,
  onSelectTopicQuiz
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredTopics = TOPICS.filter((t) => {
    const q = query.toLowerCase();
    if (!q) return true;
    if (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) return true;
    const notes = NOTES_DATA[t.id];
    if (notes) {
      if (notes.quickTopics.some((qt) => qt.toLowerCase().includes(q))) return true;
      if (notes.sections.some((s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))) return true;
    }
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Search Modal Card */}
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search topics, concepts, code examples, quizzes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 no-scrollbar">
          {filteredTopics.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-serif italic text-sm">
              No matching topics found for "{query}".
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-all flex items-center justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{topic.level || 'Beginner'}</span>
                    <span className="text-slate-300">•</span>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 font-serif line-clamp-1">{topic.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onSelectTopicNotes(topic.id);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Notes</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectTopicQuiz(topic.id);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Quiz</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
