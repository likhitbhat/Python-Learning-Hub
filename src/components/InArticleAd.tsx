import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface InArticleAdProps {
  className?: string;
}

export const InArticleAd: React.FC<InArticleAdProps> = ({ className = '' }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('Google AdSense push error:', e);
    }
  }, []);

  return (
    <div className={`my-8 px-4 py-3 rounded-2xl bg-white/60 border border-slate-200/80 shadow-xs text-center overflow-hidden transition-all ${className}`}>
      <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3450418052022882"
        data-ad-slot="1570803740"
      />
    </div>
  );
};
