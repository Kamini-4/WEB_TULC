
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      
      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error === "Missing or insufficient permissions.") {
            errorMessage = "You do not have permission to view this content. Please ensure you are logged in with the correct account.";
          }
        }
      } catch (e) {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-black/5 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">System Variance Detected</h2>
            <p className="text-zinc-600 mb-8 italic font-light">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#b8860b] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-[#9a700a] transition-colors"
            >
              Re-calibrate System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
