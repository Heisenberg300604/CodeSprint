import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConfigBar } from './ConfigBar';
import { MetricsRow } from './MetricsRow';
import { TypingArea } from './TypingArea';
import { ResultsScreen } from './ResultsScreen';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { Difficulty, Duration } from '../types';
import { Language } from '../constants';

export default function CodeSprintApp() {
  const [language, setLanguage] = useState<Language>('JavaScript');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [duration, setDuration] = useState<Duration>(30);

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
  } = useTypingEngine({
    language,
    difficulty,
    duration
  });

  // Global shortcuts — active when textarea loses focus or on results screen
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        // Tab loads a new test only from IDLE/FINISHED
        if (testState === 'IDLE' || testState === 'FINISHED') {
          newTest();
        }
      }
      if (e.key === 'Escape' && testState === 'FINISHED') {
        e.preventDefault();
        restart();
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
        </div>
        <ConfigBar
          language={language}
          difficulty={difficulty}
          duration={duration}
          onLanguageChange={setLanguage}
          onDifficultyChange={setDifficulty}
          onDurationChange={setDuration}
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
          <p>Tab — new test &middot; Esc — retry</p>
        ) : (
          <p>Esc — restart &middot; Tab — new snippet</p>
        )}
      </div>
    </div>
  );
}
