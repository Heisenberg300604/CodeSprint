import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConfigBar } from './ConfigBar';
import { MetricsRow } from './MetricsRow';
import { TypingArea } from './TypingArea';
import { ResultsScreen } from './ResultsScreen';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { Difficulty, Duration } from '../types';
import { Language, LANGUAGES, DIFFICULTIES, DURATIONS } from '../constants';

// ─── localStorage keys ────────────────────────────────────────────────────────
const LS_LANG = 'cs-language';
const LS_DIFF = 'cs-difficulty';
const LS_DUR  = 'cs-duration';

function getInitialLanguage(): Language {
  try {
    const v = localStorage.getItem(LS_LANG) as Language | null;
    if (v && (LANGUAGES as readonly string[]).includes(v)) return v;
  } catch { /* localStorage unavailable */ }
  return 'JavaScript';
}

function getInitialDifficulty(): Difficulty {
  try {
    const v = localStorage.getItem(LS_DIFF) as Difficulty | null;
    if (v && DIFFICULTIES.includes(v)) return v;
  } catch { /* localStorage unavailable */ }
  return 'Beginner';
}

function getInitialDuration(): Duration {
  try {
    const v = localStorage.getItem(LS_DUR);
    if (v) {
      const n = parseInt(v, 10) as Duration;
      if (DURATIONS.includes(n)) return n;
    }
  } catch { /* localStorage unavailable */ }
  return 30;
}

export default function CodeSprintApp() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [difficulty, setDifficulty] = useState<Difficulty>(getInitialDifficulty);
  const [duration, setDuration] = useState<Duration>(getInitialDuration);

  // ── Persist selections whenever they change ──────────────────────────────
  const handleLanguageChange = (v: Language) => {
    setLanguage(v);
    try { localStorage.setItem(LS_LANG, v); } catch { /* ignore */ }
  };
  const handleDifficultyChange = (v: Difficulty) => {
    setDifficulty(v);
    try { localStorage.setItem(LS_DIFF, v); } catch { /* ignore */ }
  };
  const handleDurationChange = (v: Duration) => {
    setDuration(v);
    try { localStorage.setItem(LS_DUR, String(v)); } catch { /* ignore */ }
  };

  const {
    testState,
    snippet,
    typedChars,
    currentIndex,
    wpm,
    accuracy,
    timeLeft,
    errors,
    totalTyped,
    activeLine,
    handleKeyDown,
    restart,
    newTest,
    isNewPersonalBest,
    snippetCount,
  } = useTypingEngine({ language, difficulty, duration });

  // ── Global shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Tab: new test (from IDLE or FINISHED)
      if (e.key === 'Tab') {
        e.preventDefault();
        if (testState === 'IDLE' || testState === 'FINISHED') {
          newTest();
        }
      }
      // Escape: retry (from FINISHED)
      if (e.key === 'Escape' && testState === 'FINISHED') {
        e.preventDefault();
        restart();
      }
      // Shift+Space: new test (from IDLE or FINISHED)
      if (e.shiftKey && e.code === 'Space') {
        e.preventDefault();
        if (testState === 'IDLE' || testState === 'FINISHED') {
          newTest();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [testState, newTest, restart]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center py-8 px-4 sm:px-8 w-full max-w-[900px] mx-auto">

      {/* Header / Config area */}
      <motion.div
        className="w-full flex flex-col mb-4 transition-opacity duration-300"
        style={{ opacity: testState === 'RUNNING' ? 0.3 : 1 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold font-mono tracking-tight flex items-center gap-2">
            <span className="text-accent">&gt;_</span> CodeSprint
          </h1>

          {/* GitHub link */}
          <a
            href="https://github.com/Heisenberg300604/CodeSprint"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View CodeSprint on GitHub"
            className="text-secondary-text hover:text-primary-text transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>

        <ConfigBar
          language={language}
          difficulty={difficulty}
          duration={duration}
          onLanguageChange={handleLanguageChange}
          onDifficultyChange={handleDifficultyChange}
          onDurationChange={handleDurationChange}
          disabled={testState === 'RUNNING'}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col">
        {testState !== 'FINISHED' ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MetricsRow
                wpm={wpm}
                accuracy={accuracy}
                timeLeft={timeLeft}
                testState={testState}
                snippetCount={snippetCount}
              />
            </motion.div>

            <TypingArea
              snippet={snippet}
              typedChars={typedChars}
              currentIndex={currentIndex}
              activeLine={activeLine}
              testState={testState}
              onKeyDown={handleKeyDown as any}
            />
          </>
        ) : (
          <ResultsScreen
            wpm={wpm}
            accuracy={accuracy}
            errors={errors}
            totalTyped={totalTyped}
            duration={duration}
            language={language}
            isNewPersonalBest={isNewPersonalBest}
            snippetCount={snippetCount}
            onRetry={restart}
            onNewTest={newTest}
          />
        )}
      </div>

      {/* Footer Hints */}
      <div
        className="mt-6 text-center text-secondary-text font-mono text-xs transition-opacity duration-300"
        style={{ opacity: testState === 'RUNNING' ? 0 : 1 }}
      >
        {testState === 'FINISHED' ? (
          <p>Tab / Shift+Space — new test &middot; Esc — retry</p>
        ) : (
          <p>Esc — restart &middot; Tab / Shift+Space — new snippet</p>
        )}
      </div>
    </div>
  );
}
