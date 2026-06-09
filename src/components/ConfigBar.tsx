import React from 'react';
import { usePostHog } from '@posthog/react';
import { Difficulty, Duration } from '../types';
import { Language, DIFFICULTIES, DURATIONS } from '../constants';
import { LanguageDropdown } from './LanguageDropdown';
import { cn } from '@/lib/utils';

interface ConfigBarProps {
  language: Language;
  difficulty: Difficulty;
  duration: Duration;
  onLanguageChange: (v: Language) => void;
  onDifficultyChange: (v: Difficulty) => void;
  onDurationChange: (v: Duration) => void;
  disabled?: boolean;
}

export function ConfigBar({
  language,
  difficulty,
  duration,
  onLanguageChange,
  onDifficultyChange,
  onDurationChange,
  disabled
}: ConfigBarProps) {
  const posthog = usePostHog();

  const handleLanguageChange = (v: Language) => {
    posthog?.capture('language_changed', { language: v, previous_language: language });
    onLanguageChange(v);
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    posthog?.capture('difficulty_changed', { difficulty: diff, previous_difficulty: difficulty });
    onDifficultyChange(diff);
  };

  const handleDurationChange = (dur: Duration) => {
    posthog?.capture('duration_changed', { duration: dur, previous_duration: duration });
    onDurationChange(dur);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 w-full" data-testid="config-bar">
      <LanguageDropdown value={language} onChange={handleLanguageChange} disabled={disabled} />

      <div className="flex items-center gap-6">
        <div className="flex bg-surface p-1 rounded-full border border-border" data-testid="difficulty-toggle">
          {DIFFICULTIES.map(diff => (
            <button
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              disabled={disabled}
              data-testid={`difficulty-btn-${diff}`}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                difficulty === diff 
                  ? "bg-secondary-bg text-accent shadow-sm" 
                  : "text-secondary-text hover:text-primary-text hover:bg-secondary-bg/50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="flex bg-surface p-1 rounded-full border border-border" data-testid="duration-toggle">
          {DURATIONS.map(dur => (
            <button
              key={dur}
              onClick={() => handleDurationChange(dur)}
              disabled={disabled}
              data-testid={`duration-btn-${dur}`}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                duration === dur 
                  ? "bg-secondary-bg text-accent shadow-sm" 
                  : "text-secondary-text hover:text-primary-text hover:bg-secondary-bg/50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {dur}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
