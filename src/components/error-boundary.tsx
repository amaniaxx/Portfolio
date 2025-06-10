import React, { Component, ErrorInfo, ReactNode } from 'react';

// Types
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Constants
const ERROR_MESSAGES = {
  title: 'Something went wrong',
  description: 'We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.'
} as const;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRefresh = (): void => {
    window.location.reload();
  };

  private renderErrorContent(): ReactNode {
    const { error } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {ERROR_MESSAGES.title}
          </h1>
          
          <p className="text-foreground mb-4">
            {ERROR_MESSAGES.description}
          </p>

          {error && (
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="text-sm font-mono text-foreground/80">
                {error.toString()}
              </p>
            </div>
          )}

          <button
            onClick={this.handleRefresh}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.renderErrorContent();
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 