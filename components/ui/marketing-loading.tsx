// components/marketing-loading.tsx
"use client";

import React, { useState, useEffect } from 'react';
import BlurText from "./blur-text";

interface MarketingLoadingProps {
  onAnimationComplete?: () => void;
}

const MarketingLoading: React.FC<MarketingLoadingProps> = ({ 
  onAnimationComplete 
}) => {
  const [phase, setPhase] = useState<'loading' | 'text-complete' | 'fade-out'>('loading');

  const handleTextComplete = () => {
    console.log('Text animation completed!');
    setPhase('text-complete');
    
    // Wait a moment, then start fade out
    setTimeout(() => {
      setPhase('fade-out');
      
      // Notify parent after fade starts
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 600); // Match the fade-out duration
    }, 800); // Pause before fade out
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-b from-black to-[#001E80] flex items-center justify-center transition-all duration-700 ease-in-out ${
        phase === 'fade-out' 
          ? 'opacity-0 scale-105' 
          : 'opacity-100 scale-100'
      }`}
    >
      <div className="text-center relative">
        {/* Apple-style logo area */}
        <div className="mb-12">
          <div 
            className={`inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur before:bg-[linear-gradient(to_right,#F8FBFF,#FB92CF,#FFD9B,#C2F0B1,#2FD8FE)] before:absolute transition-all duration-1000 ${
              phase === 'text-complete' ? 'scale-110' : 'scale-100'
            }`}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
                F
              </span>
            </div>
          </div>
        </div>

        <BlurText
          text="Bun venit pe FinHub!"
          delay={300}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleTextComplete}
          className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-tight"
        />
        
        {/* Apple-style progress indicator - appears after text */}
        <div 
          className={`transition-all duration-500 ${
            phase === 'text-complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex justify-center mt-12">
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingLoading;