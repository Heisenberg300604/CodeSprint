import React from 'react';
import { cn } from '@/lib/utils';

interface MetricsRowProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
}

export function MetricsRow({ wpm, accuracy, timeLeft }: MetricsRowProps) {
  return (
    <div className="flex items-center gap-12 py-6 w-full" data-testid="metrics-row">
      <div className="flex flex-col">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">WPM</span>
        <span className="text-5xl font-mono font-bold text-accent tracking-tighter" data-testid="metric-wpm">
          {wpm}
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">Accuracy</span>
        <span className="text-5xl font-mono font-bold text-primary-text tracking-tighter" data-testid="metric-accuracy">
          {accuracy}%
        </span>
      </div>

      <div className="flex flex-col ml-auto text-right">
        <span className="text-[10px] tracking-wider font-semibold text-secondary-text uppercase mb-1">Time</span>
        <span className="text-5xl font-mono font-bold text-primary-text tracking-tighter" data-testid="metric-time">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
