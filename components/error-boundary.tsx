// components/error-boundary.tsx
"use client";

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error: Error; retry: () => void}>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Handle chunk loading errors specifically
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      // Retry loading the chunk
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{error: Error; retry: () => void}> = ({ error, retry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#001E80]">
    <div className="text-center text-white p-8">
      <div className="mb-8">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur before:bg-[linear-gradient(to_right,#F8FBFF,#FB92CF,#FFD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
              F
            </span>
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl font-light mb-4">Se încarcă aplicația...</h1>
      <p className="text-white/70 mb-8">Vă rugăm să așteptați câteva secunde.</p>
      
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
      
      {error.name === 'ChunkLoadError' && (
        <p className="text-sm text-white/50 mt-4">Reîncărcarea automată în câteva secunde...</p>
      )}
    </div>
  </div>
);

export default ErrorBoundary;
