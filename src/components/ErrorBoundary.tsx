import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white">
          <div className="brutalist-card p-12 max-w-2xl w-full text-center space-y-6">
            <div className="w-16 h-16 bg-brand-pink border-4 border-black rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-3xl font-extrabold text-white">!</span>
            </div>
            <h1 className="text-3xl font-extrabold">页面出错了</h1>
            <p className="text-gray-500 font-semibold text-lg break-words">
              {this.state.error.message}
            </p>
            <button
              className="brutalist-button-black mx-auto text-sm px-6 py-3"
              onClick={() => this.setState({ error: null })}
            >
              重试
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
