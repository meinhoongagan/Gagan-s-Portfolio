import React from "react";

/**
 * Catches render errors in a subtree and shows a fallback instead of a blank
 * white screen. Wrap risky/experimental pieces (e.g. a WebGL canvas) so a
 * failure there degrades gracefully instead of taking down the whole page.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
