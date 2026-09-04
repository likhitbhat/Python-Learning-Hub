import React, { useState, useEffect } from 'react';
import { X, Play, Loader2, Code2, Terminal, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { runPythonCode } from '../services/pyodideRunner';
import type { RunPythonResult } from '../services/pyodideRunner';

interface PlaygroundModalProps {
  isOpen?: boolean;
  initialCode?: string;
  onClose: () => void;
}

const SAMPLE_SCRIPTS = [
  {
    name: 'Python Basics',
    code: `# Basic Python Variables & Output
name = "PyLearn"
version = 3.11

print(f"Welcome to {name} Python Playground!")
print("Version:", version)

# List Comprehension
squares = [x**2 for x in range(1, 10)]
print("Squares:", squares)`
  },
  {
    name: 'Fibonacci Generator',
    code: `# Generator Function for Fibonacci numbers
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("First 10 Fibonacci Numbers:")
print(list(fibonacci(10)))`
  },
  {
    name: 'Class & OOP',
    code: `# Object Oriented Python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    
    def get_grade(self):
        if self.score >= 90:
            return 'A'
        return 'C'

s = Student("Alice", 94)
print(f"Student: {s.name} | Grade: {s.get_grade()}")`
  }
];

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen = true,
  initialCode,
  onClose
}) => {
  const [code, setCode] = useState<string>(
    initialCode || SAMPLE_SCRIPTS[0].code
  );
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunPythonResult | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  if (!isOpen) return null;

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    const res = await runPythonCode(code);
    setResult(res);
    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Container Card */}
      <div 
        className={`w-full bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullScreen 
            ? 'w-screen h-screen rounded-none max-w-none' 
            : 'max-w-7xl h-[92vh]'
        }`}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Interactive WASM Python Playground</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-700 text-blue-300">Pyodide v0.25</span>
              </h3>
              <p className="text-xs text-slate-400 font-serif">Run Python code instantly in your browser with zero server latency.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sample Scripts Selector Toolbar */}
        <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Presets:</span>
            {SAMPLE_SCRIPTS.map((script, idx) => (
              <button
                key={idx}
                onClick={() => setCode(script.code)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {script.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isRunning ? 'Executing...' : 'Run Code (Ctrl+Enter)'}</span>
          </button>
        </div>

        {/* Main Split Body (Editor Left, Terminal Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
          
          {/* Code Editor */}
          <div className="p-4 flex flex-col bg-slate-950">
            <div className="flex items-center justify-between pb-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-blue-400" /> main.py</span>
              <span>Python 3.11</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full h-full bg-slate-950 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-2 outline-none resize-none no-scrollbar"
              placeholder="# Type Python code here..."
              spellCheck={false}
            />
          </div>

          {/* Terminal Output Buffer */}
          <div className="p-4 flex flex-col bg-slate-900/90 overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-amber-400" /> Execution Terminal Output</span>
              {result && (
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${result.success ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                  Execution Time: {result.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-xs sm:text-sm p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 whitespace-pre-wrap">
              {isRunning && (
                <div className="flex items-center gap-2 text-blue-400 py-4 justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading Pyodide WASM Runtime & Executing Script...</span>
                </div>
              )}

              {!isRunning && !result && (
                <div className="text-slate-500 italic py-8 text-center font-serif">
                  Press "Run Code" above to execute your Python script in WebAssembly.
                </div>
              )}

              {!isRunning && result && (
                <div>
                  {result.output && (
                    <div className="text-emerald-400 mb-2">
                      {result.output}
                    </div>
                  )}

                  {result.error && (
                    <div className="text-rose-400 mt-2 p-2 rounded bg-rose-950/40 border border-rose-900/50">
                      {result.error}
                    </div>
                  )}

                  {result.result !== undefined && result.result !== null && String(result.result) !== '' && (
                    <div className="text-amber-300 mt-2 pt-2 border-t border-slate-800">
                      <span className="text-slate-500">Returned Value: </span>
                      {String(result.result)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
