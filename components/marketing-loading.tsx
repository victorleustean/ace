"use client";
import { SyncLoader } from "react-spinners";
import React from 'react';
import BlurText from "./blur-text";

const MarketingLoading = () => {
  const handleAnimationComplete = () => {
    console.log('Loading animation completed!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-white to-[#001E80] flex items-center justify-center loading-screen">
      <div className="text-center relative">
        <BlurText
          text="Bun venit pe FinHub!"
          delay={500}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-[#CCDDFF] text-white bg-clip-text mb-8"
        />
        {/* Spinner */}
        <SyncLoader
          color="#FFF"
          margin={10}
          size={20}
          className="mt-24"
        />
      </div>
      {/* Loading fade out animation */}
      <style jsx>{`
        .loading-screen {
          animation: loadingFadeOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards 2s;
        }
        @keyframes loadingFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
            backdrop-filter: blur(0px);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
            backdrop-filter: blur(5px);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
            backdrop-filter: blur(20px);
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketingLoading;