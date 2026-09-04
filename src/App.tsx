import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TopicCard } from './components/TopicCard';
import { NotesView } from './components/NotesView';
import { QuizView } from './components/QuizView';
import { QuizResults } from './components/QuizResults';
import { CheatSheetView } from './components/CheatSheetView';
import { ProjectsView } from './components/ProjectsView';
import { EmailVerificationView } from './components/EmailVerificationView';
import { OpeningSplash } from './components/OpeningSplash';
import { SEOHead } from './components/SEOHead';
import { PlaygroundModal } from './components/PlaygroundModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal, type UserProfile } from './components/AuthModal';
import { subscribeToAuthChanges, logoutFirebase } from './services/firebaseAuth';
import { TOPICS, NOTES_DATA, QUIZZES_DATA } from './data/topicsData';
import type { ProgressState, DifficultyLevel } from './types';
import { CheckCircle2, Lock, ShieldAlert, Loader2 } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'notes' | 'quiz' | 'quiz-results' | 'cheat-sheet' | 'projects' | 'verify-email'>('home');
  const [activeTopicId, setActiveTopicId] = useState<string>('python-basics');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [showSplash, setShowSplash] = useState(true);
  
  // Auth state
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string>('');

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('pylearn_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Quiz results state
  const [lastQuizScore, setLastQuizScore] = useState<{ score: number; total: number; userAnswers: number[] }>({
    score: 0,
    total: 10,
    userAnswers: []
  });

  // Playground modal state
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<string | undefined>(undefined);

  // User Progress persisted in localStorage
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('pylearn_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          streak: parsed.streak || 1,
          xp: parsed.xp || 120,
          lastActive: parsed.lastActive || new Date().toISOString(),
          completedTopics: parsed.completedTopics || {},
          completedProjects: parsed.completedProjects || {}
        };
      } catch (e) {
        // Fallback
      }
    }
    return {
      streak: 1,
      xp: 120,
      lastActive: new Date().toISOString(),
      completedTopics: {},
      completedProjects: {}
    };
  });

  // Real-time Firebase Auth State Listener (With Email Verification Check)
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((payload) => {
      setUser(payload.user);
      setIsEmailVerified(payload.isVerified);
      if (payload.email) {
        setPendingVerificationEmail(payload.email);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync progress to localStorage
  useEffect(() => {
    localStorage.setItem('pylearn_progress', JSON.stringify(progress));
  }, [progress]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('pylearn_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pylearn_user');
      if (currentView !== 'home' && currentView !== 'verify-email') {
        setCurrentView('home');
      }
    }
  }, [user, currentView]);

  // Protected action wrapper: requires user to be logged in AND email verified!
  const requireAuth = (action: () => void) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    if (!isEmailVerified) {
      setPendingVerificationEmail(user.email);
      setCurrentView('verify-email');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    action();
  };

  // Navigation handlers protected by requireAuth & email verification
  const handleOpenNotes = (topicId: string) => {
    requireAuth(() => {
      setActiveTopicId(topicId);
      setCurrentView('notes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleOpenQuiz = (topicId: string) => {
    requireAuth(() => {
      setActiveTopicId(topicId);
      setCurrentView('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleQuizSubmit = (score: number, total: number, userAnswers: number[]) => {
    setLastQuizScore({ score, total, userAnswers });
    
    // Calculate earned XP (+10 per correct answer)
    const earnedXp = score * 10;
    
    // Update progress state
    setProgress(prev => {
      const existing = prev.completedTopics[activeTopicId];
      const bestScore = existing ? Math.max(existing.score, score) : score;
      
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        completedTopics: {
          ...prev.completedTopics,
          [activeTopicId]: {
            score: bestScore,
            total,
            date: new Date().toISOString()
          }
        }
      };
    });

    setCurrentView('quiz-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlaygroundWithCode = (code?: string) => {
    requireAuth(() => {
      setPlaygroundInitialCode(code);
      setIsPlaygroundOpen(true);
    });
  };

  const handleLoginSuccess = (userProfile: UserProfile, verified: boolean) => {
    setUser(userProfile);
    setIsEmailVerified(verified);
    if (verified) {
      setProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
    }
  };

  const handleNavigateToVerification = (email: string) => {
    setPendingVerificationEmail(email);
    setCurrentView('verify-email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logoutFirebase();
    setUser(null);
    setIsEmailVerified(false);
    setCurrentView('home');
  };

  const handleVerificationSuccess = () => {
    setIsEmailVerified(true);
    setCurrentView('home');
    setProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
  };

  // Filter topics by selected track level
  const filteredTopics = TOPICS.filter(t => selectedLevel === 'all' || t.level === selectedLevel);

  // Active notes and quiz data
  const currentNotes = NOTES_DATA[activeTopicId] || NOTES_DATA['python-basics'];
  const currentQuiz = QUIZZES_DATA[activeTopicId] || QUIZZES_DATA['python-basics'];

  // Initial Auth Loading Screen (Prevents flickering on reload)
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center space-y-4">
        <img 
          src="/logo.png" 
          alt="PyLearn Logo" 
          className="h-20 w-auto object-contain animate-pulse" 
        />
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <span>Verifying Security & Auth State...</span>
        </div>
      </div>
    );
  }

  const getSEOProps = () => {
    if (currentView === 'notes' && NOTES_DATA[activeTopicId]) {
      const notes = NOTES_DATA[activeTopicId];
      return {
        title: `${notes.title} — Illustrated Python Notes`,
        description: `Read illustrated Python study notes on ${notes.title}. ${(notes.subtitle || notes.summary || '').slice(0, 140)}...`,
        topicId: activeTopicId,
        canonicalPath: activeTopicId
      };
    }
    if (currentView === 'quiz' && NOTES_DATA[activeTopicId]) {
      const notes = NOTES_DATA[activeTopicId];
      return {
        title: `${notes.title} Quiz & Knowledge Test`,
        description: `Test your Python skills on ${notes.title} with interactive quizzes and earn XP points.`,
        topicId: activeTopicId,
        canonicalPath: `quiz-${activeTopicId}`
      };
    }
    if (currentView === 'cheat-sheet') {
      return {
        title: 'Python Technical Interview Cheat Sheet',
        description: 'Quick reference guide for Python syntax, complexity, design patterns, OOP, and data structures for technical interview preparation.',
        canonicalPath: 'cheat-sheet'
      };
    }
    if (currentView === 'projects') {
      return {
        title: 'Hands-On Python Mini-Project Labs',
        description: 'Build real-world Python applications with in-browser WASM execution, guided instructions, and code visualizers.',
        canonicalPath: 'projects'
      };
    }
    return {
      title: 'Python Zero to Hero Masterclass & Interactive Quizzes',
      description: 'Master Python programming with zero experience! Interactive story notes, Gemini-generated visual architecture diagrams, interview cheat sheet, Pyodide WASM playground, and quizzes.',
      canonicalPath: ''
    };
  };

  const seoProps = getSEOProps();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans antialiased flex flex-col selection:bg-blue-200 selection:text-blue-900">
      
      {/* Dynamic Route SEO & Head Manager */}
      <SEOHead
        title={seoProps.title}
        description={seoProps.description}
        topicId={seoProps.topicId}
        canonicalPath={seoProps.canonicalPath}
      />

      {/* Opening Intro Splash Screen Animation */}
      {showSplash && <OpeningSplash onFinish={() => setShowSplash(false)} />}
      
      {/* Top Header Navigation */}
      <Header
        streak={progress.streak}
        xp={progress.xp}
        user={user}
        currentView={currentView}
        onOpenCheatSheet={() => requireAuth(() => { setCurrentView('cheat-sheet'); window.scrollTo({ top: 0, behavior: 'smooth' }); })}
        onOpenPlayground={() => requireAuth(() => handleOpenPlaygroundWithCode())}
        onOpenProjects={() => requireAuth(() => { setCurrentView('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); })}
        onGoHome={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onToggleSearch={() => requireAuth(() => setIsSearchOpen(true))}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Unauthenticated / Unverified Banner */}
      {(!user || !isEmailVerified) && currentView !== 'verify-email' && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white py-3 px-4 shadow-md text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>
            {!user 
              ? 'Guest Preview Mode: Sign in or create a free account to unlock full story notes, quizzes & progress tracking.'
              : 'Email Unverified: Please verify your email address to unlock protected notes & quizzes.'}
          </span>
          <button
            onClick={() => {
              if (!user) {
                setIsAuthOpen(true);
              } else {
                setPendingVerificationEmail(user.email);
                setCurrentView('verify-email');
              }
            }}
            className="ml-2 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer"
          >
            {!user ? 'Log In / Sign Up' : 'Verify Email Now'}
          </button>
        </div>
      )}

      {/* Main Page Content Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Email Verification Page */}
        {currentView === 'verify-email' && (
          <EmailVerificationView
            userEmail={pendingVerificationEmail || user?.email || ''}
            onVerifiedSuccess={handleVerificationSuccess}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'home' && (
          <div className="space-y-10">
            {/* Landing Hero & Roadmap Filter */}
            <Hero
              onStartNotes={() => handleOpenNotes('python-basics')}
              onStartQuiz={() => handleOpenQuiz('python-basics')}
              onOpenCheatSheet={() => requireAuth(() => { setCurrentView('cheat-sheet'); window.scrollTo({ top: 0, behavior: 'smooth' }); })}
              onOpenProjects={() => requireAuth(() => { setCurrentView('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); })}
              onOpenAuth={() => setIsAuthOpen(true)}
              user={user}
              selectedLevel={selectedLevel}
              onSelectLevel={setSelectedLevel}
            />

            {/* Zero-to-Hero Topic Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                    Masterclass Topics ({filteredTopics.length})
                  </h2>
                  <p className="text-sm font-serif italic text-slate-500">
                    {user && isEmailVerified
                      ? 'Choose a topic below to read illustrated story notes or test your knowledge with interactive quizzes.'
                      : 'Sign in & verify email to unlock reading illustrated notes, taking quizzes, and earning XP!'}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  {user && isEmailVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{Object.keys(progress.completedTopics).length} / {TOPICS.length} Mastered</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-amber-500" />
                      <span>{!user ? 'Sign In to Track Progress' : 'Verify Email to Unlock'}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Grid of Topic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTopics.map((topic) => {
                  const topicProgress = progress.completedTopics[topic.id];
                  return (
                    <TopicCard
                      key={topic.id}
                      topic={{
                        ...topic,
                        completed: (user && isEmailVerified) ? !!topicProgress : false,
                        score: (user && isEmailVerified && topicProgress) ? Math.round((topicProgress.score / topicProgress.total) * 100) : undefined
                      }}
                      isLocked={!user || !isEmailVerified}
                      onReadNotes={handleOpenNotes}
                      onTakeQuiz={handleOpenQuiz}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Protected Views (Only rendered if user is logged in AND email is verified) */}
        {user && isEmailVerified && currentView === 'notes' && (
          <NotesView
            notes={currentNotes}
            onBack={() => setCurrentView('home')}
            onTakeQuiz={handleOpenQuiz}
            onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
          />
        )}

        {user && isEmailVerified && currentView === 'quiz' && (
          <QuizView
            quiz={currentQuiz}
            onClose={() => setCurrentView('home')}
            onComplete={handleQuizSubmit}
          />
        )}

        {user && isEmailVerified && currentView === 'quiz-results' && (
          <QuizResults
            quiz={currentQuiz}
            score={lastQuizScore.score}
            total={lastQuizScore.total}
            userAnswers={lastQuizScore.userAnswers}
            onBackToHome={() => setCurrentView('home')}
            onRetake={() => setCurrentView('quiz')}
          />
        )}

        {user && isEmailVerified && currentView === 'cheat-sheet' && (
          <CheatSheetView
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {user && isEmailVerified && currentView === 'projects' && (
          <ProjectsView
            onBackToHome={() => setCurrentView('home')}
            onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
            completedProjects={progress.completedProjects}
          />
        )}

      </main>

      {/* Global Interactive WASM Playground Modal (Protected) */}
      {user && isEmailVerified && (
        <PlaygroundModal
          isOpen={isPlaygroundOpen}
          initialCode={playgroundInitialCode}
          onClose={() => setIsPlaygroundOpen(false)}
        />
      )}

      {/* Global Search Finder Modal (Protected) */}
      {user && isEmailVerified && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectTopicNotes={handleOpenNotes}
          onSelectTopicQuiz={handleOpenQuiz}
        />
      )}

      {/* User Login / Register Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToVerification={handleNavigateToVerification}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-serif">
          <div className="flex items-center gap-2 font-sans font-bold text-slate-900">
            <img src="/logo.png" alt="PyLearn Logo" className="h-7 w-auto object-contain" />
            <span>PyLearn Notebook</span>
            <span className="text-slate-400 font-normal">| Zero-to-Hero Masterclass</span>
          </div>

          <p>© {new Date().getFullYear()} PyLearn Notebook. Empowering zero-knowledge beginners to master Python.</p>

          <div className="flex items-center gap-4 text-slate-600 font-sans font-semibold">
            <button onClick={() => setIsAuthOpen(true)} className="hover:text-blue-600 cursor-pointer">
              {user ? `Logged in as ${user.name}` : 'Sign In'}
            </button>
            <button onClick={() => requireAuth(() => setCurrentView('cheat-sheet'))} className="hover:text-blue-600 cursor-pointer">Cheat Sheet</button>
            <button onClick={() => requireAuth(() => setCurrentView('projects'))} className="hover:text-blue-600 cursor-pointer">Labs</button>
          </div>
        </div>
      </footer>

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}

export default App;
