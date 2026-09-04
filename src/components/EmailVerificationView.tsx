import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, RefreshCw, LogOut, AlertCircle, Clock, Send } from 'lucide-react';
import { checkCurrentEmailVerification, resendVerificationEmail, logoutFirebase } from '../services/firebaseAuth';

interface EmailVerificationViewProps {
  userEmail: string;
  onVerifiedSuccess: () => void;
  onLogout: () => void;
}

export const EmailVerificationView: React.FC<EmailVerificationViewProps> = ({
  userEmail,
  onVerifiedSuccess,
  onLogout
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Countdown timer effect for 60-second resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Handler: "I've Verified My Email"
  const handleCheckVerification = async () => {
    setIsChecking(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const isVerified = await checkCurrentEmailVerification();
      setIsChecking(false);

      if (isVerified) {
        setSuccessMessage('Email verified successfully! Unlocking your Python Masterclass...');
        setTimeout(() => {
          onVerifiedSuccess();
        }, 1000);
      } else {
        setErrorMessage('Verification link not clicked yet. Please open your email inbox, click the verification link, and try again.');
      }
    } catch (err: any) {
      setIsChecking(false);
      setErrorMessage(err?.message || 'Failed to check verification status. Please try again.');
    }
  };

  // Handler: "Resend Verification Email"
  const handleResendEmail = async () => {
    if (cooldown > 0) return;

    setIsSending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await resendVerificationEmail();
      setIsSending(false);
      setSuccessMessage(`Fresh verification email sent to ${userEmail}. Check your inbox or spam folder!`);
      setCooldown(60); // Start 60-second cooldown timer
    } catch (err: any) {
      setIsSending(false);
      setErrorMessage(err?.message || 'Failed to send verification email. Please try again in a moment.');
    }
  };

  const handleSignOut = async () => {
    await logoutFirebase();
    onLogout();
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Paper Card Verification Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 relative overflow-hidden text-center space-y-6">
        
        {/* Paper texture dot background overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#94a3b8 0.75px, transparent 0.75px)', backgroundSize: '16px 16px' }}
        />

        {/* Animated Envelope & Ring Header */}
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/10 animate-bounce">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Please Verify Your Email Address
          </h2>
          <p className="text-slate-600 font-serif italic text-sm sm:text-base mt-2 max-w-md mx-auto">
            We have sent a security verification link to your email:
          </p>
          <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-300 text-blue-900 font-bold font-mono text-sm shadow-2xs">
            {userEmail || 'your email'}
          </div>
        </div>

        {/* Status Banners */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 text-left animate-fadeIn relative z-10">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 text-left animate-fadeIn relative z-10">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Instructions Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm text-slate-700 space-y-2 relative z-10">
          <p className="font-bold text-slate-900">How to unlock your account:</p>
          <ol className="list-decimal list-inside space-y-1 font-serif text-slate-600 leading-relaxed">
            <li>Open your email inbox for <strong>{userEmail}</strong>.</li>
            <li>Click the verification link in the email from <strong>Firebase / PyLearn</strong>.</li>
            <li>Return here and click <strong>"I've Verified My Email"</strong> below!</li>
          </ol>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 relative z-10 pt-2">
          
          {/* Check Verification Status Button */}
          <button
            onClick={handleCheckVerification}
            disabled={isChecking}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isChecking ? (
              <RefreshCw className="w-5 h-5 animate-spin text-white" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-white" />
            )}
            <span>{isChecking ? 'Checking Firebase Server...' : "I've Verified My Email"}</span>
          </button>

          {/* Resend Verification Email Button with 60s Cooldown */}
          <button
            onClick={handleResendEmail}
            disabled={isSending || cooldown > 0}
            className="w-full py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-extrabold text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
            ) : cooldown > 0 ? (
              <Clock className="w-4 h-4 text-amber-500" />
            ) : (
              <Send className="w-4 h-4 text-blue-600" />
            )}
            <span>
              {cooldown > 0 
                ? `Resend Link Available in ${cooldown}s` 
                : isSending 
                ? 'Sending Verification Email...' 
                : 'Resend Verification Email'}
            </span>
          </button>

          {/* Logout Option */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out or use a different email</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
