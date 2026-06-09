import React from 'react';
import { cn } from '@/lib/utils';
import { TestState } from '../types';

interface MetricsRowProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  testState: TestState;
  snippetCount: number;
}

export function MetricsRow({ wpm, accuracy, timeLeft, testState, snippetCount }: MetricsRowProps) {
  const isIdle = testState === 'IDLE';

  return (
    <div className="flex items-center gap-12 py-6 w-full" data-testid="metrics-row">
      <div className="flex flex-col">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">WPM</span>
        <span
          className={cn(
            'text-5xl font-mono font-bold tracking-tighter transition-colors duration-200',
            isIdle ? 'text-secondary-text/40' : 'text-accent'
          )}
          data-testid="metric-wpm"
        >
          {isIdle ? '—' : wpm}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">Accuracy</span>
        <span className="text-5xl font-mono font-bold text-primary-text tracking-tighter" data-testid="metric-accuracy">
          {accuracy}%
        </span>
      </div>

      {/* Snippet counter — only visible during RUNNING state */}
      {testState === 'RUNNING' && snippetCount > 0 && (
        <div className="flex flex-col">
          <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">Snippets</span>
          <span className="text-5xl font-mono font-bold text-secondary-text/60 tracking-tighter">
            {snippetCount}
          </span>
        </div>
      )}

      <div className="flex flex-col ml-auto text-right">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">Time</span>
        <span
          className={cn(
            'text-5xl font-mono font-bold tracking-tighter transition-colors duration-500',
            timeLeft <= 10 && testState === 'RUNNING' ? 'text-error' : 'text-primary-text'
          )}
          data-testid="metric-time"
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
