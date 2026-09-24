
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { reportClientError } from '../src/lib/apiClient.ts';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorReported: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorReported: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorReported: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
    try {
      reportClientError(error, window.location.pathname, 'REACT_RENDER');
      this.setState({ errorReported: true });
    } catch {
      // Telemetry silence
    }
  }

  private handleReset = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem('tulc_subscribers_cache');
    } catch {
      // Ignore
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected system variance was detected.";
      
      try {
        if (this.state.error?.message) {
          if (this.state.error.message.includes("Missing or insufficient permissions")) {
            errorMessage = "Institutional clearance required. Please verify administrative credentials.";
          } else if (this.state.error.message.includes("Network")) {
            errorMessage = "Strategic network gateway disconnected. Please verify connection.";
          } else {
            errorMessage = this.state.error.message;
          }
        }
      } catch {
        // Fallback message
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9] p-6">
          <div className="max-w-lg w-full bg-white p-8 sm:p-10 border border-zinc-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#b8860b] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-zinc-900 mb-2">
              System Variance Detected
            </h2>
            <p className="text-xs text-zinc-600 font-serif italic mb-6 leading-relaxed">
              {errorMessage}
            </p>

            {this.state.error?.stack && (
              <div className="text-left bg-zinc-50 border border-zinc-200 p-3 text-[10px] font-mono text-zinc-600 overflow-x-auto max-h-28 mb-6 rounded-2xs">
                {this.state.error.stack.split('\n').slice(0, 3).join('\n')}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-bold tracking-wider rounded-2xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-calibrate System</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 text-[10px] font-mono uppercase font-bold tracking-wider rounded-2xs transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Headquarters</span>
              </button>
            </div>

            {this.state.errorReported && (
              <div className="mt-4 text-[9px] font-mono text-zinc-400">
                Diagnostic telemetry automatically routed to institutional event log.
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
export { ErrorBoundary };

