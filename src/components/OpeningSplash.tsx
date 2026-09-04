import React, { useState, useEffect } from 'react';
import { Sparkles, Code2, CheckCircle2 } from 'lucide-react';

interface OpeningSplashProps {
  onFinish: () => void;
}

export const OpeningSplash: React.FC<OpeningSplashProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    // Smooth progress fill counter from 0 to 100% over 2.0s
    const startTime = Date.now();
    const duration = 2000; // 2 seconds fill

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgressPercent(progress);

      if (progress >= 100) {
        clearInterval(timer);
        // Fade out after reaching 100%
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onFinish();
          }, 600);
        }, 400);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onFinish]);

  // Click or keypress instant skip
  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 300);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 bg-[#f5f4f0] text-slate-800 flex flex-col items-center justify-center p-4 transition-all duration-700 select-none cursor-pointer overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Paper dot grid texture overlay matching website theme */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#94a3b8 1.2px, transparent 1.2px), radial-gradient(#94a3b8 1.2px, #f5f4f0 1.2px)', 
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Soft ambient theme glow gradients */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-400/15 blur-3xl animate-floatGlow pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-amber-400/15 blur-3xl animate-floatGlow pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Paper Card Intro Container */}
      <div className="relative z-10 bg-white/95 rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 flex flex-col items-center text-center max-w-sm sm:max-w-md w-full space-y-6 backdrop-blur-md">
        
        {/* Paper texture overlay inside card */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl"
          style={{ backgroundImage: 'radial-gradient(#94a3b8 0.75px, transparent 0.75px)', backgroundSize: '16px 16px' }}
        />

        {/* Brand Logo Badge */}
        <div className="relative group relative z-10">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
          <div className="relative bg-white rounded-3xl p-3 border border-slate-200 shadow-lg animate-logoPop">
            <img 
              src="/logo.png" 
              alt="PyLearn Notebook Logo" 
              className="h-28 sm:h-32 w-auto object-contain transform hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1.5 animate-textReveal relative z-10" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-2">
            <span>PyLearn</span>
            <span className="text-blue-600 font-normal">Notebook</span>
          </h1>
          <p className="text-amber-700 font-serif italic text-base sm:text-lg">
            Zero to Hero Python Masterclass
          </p>
        </div>

        {/* Theme-Matched Paper Progress Bar */}
        <div className="w-full space-y-2.5 animate-textReveal relative z-10" style={{ animationDelay: '0.2s' }}>
          
          {/* Outer Track Bar */}
          <div className="w-full h-4 sm:h-5 bg-slate-100 rounded-full p-1 border border-slate-300 shadow-inner overflow-hidden relative">
            
            {/* Inner Filling Bar */}
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-75 ease-out relative shadow-md shadow-blue-500/30 flex items-center justify-end pr-1"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            >
              {/* Glowing Head Pointer Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-amber-400 animate-ping" />
            </div>

          </div>

          {/* Label & Dynamic Percentage Readout */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 px-1 font-semibold">
            <span className="flex items-center gap-1.5">
              {progressPercent >= 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Code2 className="w-4 h-4 text-blue-600 animate-spin" />
              )}
              <span>
                {progressPercent >= 100 
                  ? 'Masterclass Engine Ready!' 
                  : 'Loading Py-Bot Engine...'}
              </span>
            </span>
            <span className="font-extrabold text-blue-700 font-sans text-sm">{progressPercent}%</span>
          </div>

        </div>

        {/* Subtitle & Tap to Skip */}
        <div className="pt-1 text-slate-500 text-xs font-serif italic flex items-center gap-1.5 animate-textReveal relative z-10" style={{ animationDelay: '0.4s' }}>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Crafting your interactive Python quest... (Click to enter)</span>
        </div>

      </div>
    </div>
  );
};
