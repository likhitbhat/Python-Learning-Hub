import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, LogIn, UserPlus, CheckCircle2, AlertCircle, ArrowRight, Clock, Send } from 'lucide-react';
import { loginWithEmail, registerWithEmail, loginWithGoogle, resendVerificationEmail } from '../services/firebaseAuth';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile, isVerified: boolean) => void;
  onNavigateToVerification: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onNavigateToVerification
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Countdown timer effect for 60s resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleResendUnverifiedLink = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    try {
      await resendVerificationEmail();
      setIsLoading(false);
      setSuccessMessage(`Fresh verification email sent to ${unverifiedEmail || email}! Please check your inbox.`);
      setResendCooldown(60);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Failed to resend verification email.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setUnverifiedEmail(null);
    
    if (!email || !password || (activeTab === 'register' && !name)) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      if (activeTab === 'register') {
        const res = await registerWithEmail(name, email, password);
        setIsLoading(false);
        setSuccessMessage('Account created! A verification link has been sent to your email.');
        
        setTimeout(() => {
          onLoginSuccess(res.user, false);
          onNavigateToVerification(email);
          onClose();
          setName('');
          setEmail('');
          setPassword('');
        }, 800);
      } else {
        const res = await loginWithEmail(email, password);
        setIsLoading(false);
        setSuccessMessage('Successfully logged in!');
        
        setTimeout(() => {
          onLoginSuccess(res.user, res.isVerified);
          if (!res.isVerified) {
            onNavigateToVerification(email);
          }
          onClose();
          setEmail('');
          setPassword('');
        }, 600);
      }
    } catch (err: any) {
      setIsLoading(false);
      const msg = err?.message || 'Authentication failed.';
      setErrorMessage(msg);
      
      if (msg.includes('verify your email') || err?.code === 'auth/unverified-email') {
        setUnverifiedEmail(email);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    setUnverifiedEmail(null);

    try {
      const userProfile = await loginWithGoogle();
      setSuccessMessage('Signed in with Google via Firebase!');
      setTimeout(() => {
        // Google users are automatically email verified!
        onLoginSuccess(userProfile, true);
        onClose();
        setIsLoading(false);
      }, 600);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Google sign-in popup failed.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      {/* Paper Card Modal Container */}
      <div 
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 relative transform transition-all animate-scaleUp cursor-default no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper texture dot background overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#94a3b8 0.75px, transparent 0.75px)', backgroundSize: '16px 16px' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-3 sm:pb-4 text-center relative z-10">
          <img 
            src="/logo.png" 
            alt="PyLearn Logo" 
            className="h-16 sm:h-20 w-auto object-contain mx-auto mb-2.5 sm:mb-3" 
          />
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            {activeTab === 'login' ? 'Welcome Back!' : 'Start Your Python Quest'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">
            {activeTab === 'login'
              ? 'Sign in to save your XP, streaks, and quiz progress.'
              : 'Join over 50,000+ zero-to-hero learners today!'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="px-6 sm:px-8 mb-4 sm:mb-6 relative z-10">
          <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200/80">
            <button
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setUnverifiedEmail(null); }}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>

            <button
              onClick={() => { setActiveTab('register'); setErrorMessage(''); setUnverifiedEmail(null); }}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-6 space-y-3.5 sm:space-y-4 relative z-10">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold leading-relaxed animate-fadeIn flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Unverified Email Warning & Action Box */}
          {unverifiedEmail && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2.5 animate-fadeIn">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Mail className="w-4 h-4 text-amber-600" />
                <span>Email Verification Required</span>
              </div>
              <p className="text-amber-800 leading-snug">
                Please verify <strong>{unverifiedEmail}</strong> before entering the application.
              </p>
              
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleResendUnverifiedLink}
                  disabled={isLoading || resendCooldown > 0}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-amber-300 text-amber-900 font-extrabold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {resendCooldown > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Wait {resendCooldown}s</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-600" />
                      <span>Resend Email</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigateToVerification(unverifiedEmail);
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Verification Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Full Name Input (Register Only) */}
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Alex Pendelton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-800 transition-all outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-800 transition-all outline-hidden"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-800 transition-all outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{activeTab === 'login' ? 'Sign In to PyLearn' : 'Create Free Account'}</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Full-width Google OAuth Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition-all shadow-2xs cursor-pointer"
          >
            <span className="text-red-500 font-extrabold text-base leading-none">G</span>
            <span>Continue with Google</span>
          </button>

          {/* Close / Guest Link at Bottom */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
            >
              Explore Homepage as Guest Preview →
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
