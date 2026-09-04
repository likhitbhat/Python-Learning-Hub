import React, { useState } from 'react';
import { Zap, Flame, Code2, FolderGit2, Search, LogIn, LogOut, Sparkles, ChevronDown } from 'lucide-react';
import type { UserProfile } from './AuthModal';

interface HeaderProps {
  streak: number;
  xp: number;
  user: UserProfile | null;
  onOpenCheatSheet: () => void;
  onOpenPlayground: () => void;
  onOpenProjects: () => void;
  onGoHome: () => void;
  onToggleSearch: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentView: 'home' | 'notes' | 'quiz' | 'quiz-results' | 'cheat-sheet' | 'projects' | 'verify-email';
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  xp,
  user,
  onOpenCheatSheet,
  onOpenPlayground,
  onOpenProjects,
  onGoHome,
  onToggleSearch,
  onOpenAuth,
  onLogout,
  currentView
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getLevelInfo = (xpPoints: number) => {
    if (xpPoints >= 1500) return { title: 'Python Master', badge: '👑', color: 'text-amber-500 bg-amber-50 border-amber-200' };
    if (xpPoints >= 800) return { title: 'Python Wizard', badge: '🐍', color: 'text-purple-600 bg-purple-50 border-purple-200' };
    if (xpPoints >= 300) return { title: 'Code Craftsman', badge: '⚡', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    return { title: 'Python Novice', badge: '🌱', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  };

  const levelInfo = getLevelInfo(xp);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="PyLearn Logo" 
            className="h-11 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
              PyLearn <span className="text-blue-600 font-normal">Notebook</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Zero to Hero Masterclass</span>
          </div>
        </div>

        {/* Search Trigger Bar */}
        <button
          onClick={onToggleSearch}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-500 text-xs font-medium transition-colors cursor-pointer w-44 lg:w-60"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search topics, code...</span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Projects Link Button */}
          <button
            onClick={onOpenProjects}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              currentView === 'projects'
                ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/80'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Labs</span>
          </button>

          {/* Live Playground Button */}
          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all border border-slate-300/80 shadow-xs cursor-pointer"
            title="Open Live Python Playground"
          >
            <Code2 className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">Playground</span>
          </button>

          {/* Cheat Sheet Link Button */}
          <button
            onClick={onOpenCheatSheet}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              currentView === 'cheat-sheet'
                ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/80'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="hidden lg:inline">Cheat Sheet</span>
          </button>

          {/* User XP Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold shadow-xs select-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-500" />
            <span>{xp} XP</span>
          </div>

          {/* Mastery Level Badge */}
          <div className={`hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-bold shadow-xs ${levelInfo.color}`}>
            <span>{levelInfo.badge}</span>
            <span>{levelInfo.title}</span>
          </div>

          {/* Streak Counter Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm font-bold shadow-xs select-none">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streak}d</span>
          </div>

          {/* Authentication Dropdown / Log In Trigger */}
          {user ? (
            <div className="relative ml-1">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-all cursor-pointer select-none"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 object-cover"
                />
                <span className="text-xs font-bold text-slate-800 hidden md:inline truncate max-w-[100px]">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="px-4 py-2 text-[11px] text-slate-500 font-semibold border-b border-slate-100">
                    Member since {user.joinDate}
                  </div>

                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer ml-1"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
