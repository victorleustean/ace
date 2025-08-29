// app/(marketing)/layout.tsx
"use client";

import { Header } from "./header"
import { Footer } from "./footer"
import MarketingLoading from "@/components/marketing-loading"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show loading on the main marketing page
    if (pathname === '/') {
      // Simulate loading time and resource loading
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        // Small delay before showing content for smooth transition
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }, 2500); // Adjust timing as needed

      return () => clearTimeout(loadingTimer);
    } else {
      // For other pages, skip loading
      setIsLoading(false);
      setIsVisible(true);
    }
  }, [pathname]);

  // Show loading screen
  if (isLoading) {
    return <MarketingLoading />;
  }

  // Show main content with smooth Apple-style transitions
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" as="image" href="/hero-dollar.webp" />
      <link rel="preload" as="image" href="/logo.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      <div className={`min-h-screen flex flex-col ${isVisible ? 'marketing-entrance' : 'opacity-0'}`}>
        <Header />
        <main className="flex-1">
          <div className="stagger-content">
            {children}
          </div>
        </main>
        <Footer />
      </div>

      {/* Add the required CSS styles */}
      <style jsx global>{`
        /* Apple-style smooth entrance animation */
        @keyframes appleEntrance {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            filter: blur(10px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(20px) scale(0.98);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* Enhanced marketing page entrance */
        .marketing-entrance {
          animation: appleEntrance 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        /* Staggered content reveal */
        .stagger-content > * {
          opacity: 0;
          transform: translateY(30px);
          animation: contentReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .stagger-content > *:nth-child(1) { animation-delay: 0.2s; }
        .stagger-content > *:nth-child(2) { animation-delay: 0.3s; }
        .stagger-content > *:nth-child(3) { animation-delay: 0.4s; }
        .stagger-content > *:nth-child(4) { animation-delay: 0.5s; }
        .stagger-content > *:nth-child(5) { animation-delay: 0.6s; }
        .stagger-content > *:nth-child(6) { animation-delay: 0.7s; }

        /* Content reveal animation */
        @keyframes contentReveal {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Smooth transitions for all elements */
        * {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>
    </>
  )
}

export default MarketingLayout;