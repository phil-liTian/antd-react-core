import React from "react";
import Alert from "./Alert";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error | null;
  info: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: undefined,
    info: {
      componentStack: ''
    }
  }

  handleClick() {
    console.log('a');
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, info: errorInfo })
  }

  render(): React.ReactNode {
    const { children, message, description } = this.props
    const { error, info } = this.state
    const componentStack = info?.componentStack || null
    const errorMessage = typeof message === 'undefined' ? (error || '').toString() : message
    const errorDescription = typeof description === 'undefined' ? componentStack : description

    if (error) {
      return <Alert message={errorMessage} type='error' description={<pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{errorDescription}</pre>} />
    }

    return children
  }
}


export default ErrorBoundary