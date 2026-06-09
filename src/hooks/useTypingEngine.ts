import { useState, useEffect, useCallback, useRef } from 'react';
import { usePostHog } from '@posthog/react';
import { TestState, TypingEngineReturn, Difficulty, Duration } from '../types';
import { Language } from '../constants';
import { SNIPPETS } from '../data/snippets/index';

interface UseTypingEngineProps {
  language: Language;
  difficulty: Difficulty;
  duration: Duration;
}

// ─── Snippet History (session-level anti-repeat) ─────────────────────────────
const SESSION_KEY = (lang: Language, diff: Difficulty) => `cs-used-${lang}-${diff}`;

function getUsedIndexes(lang: Language, diff: Difficulty): number[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY(lang, diff));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setUsedIndexes(lang: Language, diff: Difficulty, indexes: number[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY(lang, diff), JSON.stringify(indexes));
  } catch {
    // sessionStorage unavailable — degrade gracefully
  }
}

function pickSnippet(lang: Language, diff: Difficulty): { text: string; index: number } {
  const list = SNIPPETS[lang][diff];
  const pool = list.length;
  let used = getUsedIndexes(lang, diff);

  // Reset history when the whole pool has been shown
  if (used.length >= pool) {
    used = [];
    setUsedIndexes(lang, diff, []);
  }

  const available = Array.from({ length: pool }, (_, i) => i).filter(i => !used.includes(i));
  const idx = available[Math.floor(Math.random() * available.length)];

  setUsedIndexes(lang, diff, [...used, idx]);
  return { text: list[idx], index: idx };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeActiveLine(snippet: string[], currentIndex: number): number {
  let line = 0;
  for (let i = 0; i < currentIndex && i < snippet.length; i++) {
    if (snippet[i] === '\n') line++;
  }
  return line;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useTypingEngine({ language, difficulty, duration }: UseTypingEngineProps): TypingEngineReturn {
  const posthog = usePostHog();
  const [testState, setTestState] = useState<TestState>('IDLE');
  const [snippet, setSnippet] = useState<string[]>([]);
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [grossWpm, setGrossWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [errors, setErrors] = useState<number>(0);
  const [totalTyped, setTotalTyped] = useState<number>(0);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [isNewPersonalBest, setIsNewPersonalBest] = useState<boolean>(false);
  const [snippetCount, setSnippetCount] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Session-cumulative refs — persist across snippet auto-advances
  const sessionTotalTypedRef = useRef<number>(0);
  const sessionErrorsRef = useRef<number>(0);

  // Per-snippet refs for closure correctness
  const totalTypedRef = useRef<number>(0);
  const errorsRef = useRef<number>(0);
  const snippetCountRef = useRef<number>(0);

  // Keep per-snippet refs in sync with state
  useEffect(() => { totalTypedRef.current = totalTyped; }, [totalTyped]);
  useEffect(() => { errorsRef.current = errors; }, [errors]);
  useEffect(() => { snippetCountRef.current = snippetCount; }, [snippetCount]);

  // ── Reset shared state ──────────────────────────────────────────────────
  const resetState = useCallback(() => {
    setTypedChars([]);
    setCurrentIndex(0);
    setWpm(0);
    setGrossWpm(0);
    setAccuracy(100);
    setTimeLeft(duration);
    setErrors(0);
    setTotalTyped(0);
    setActiveLine(0);
    setIsNewPersonalBest(false);
    setTestState('IDLE');
    setSnippetCount(0);
    totalTypedRef.current = 0;
    errorsRef.current = 0;
    snippetCountRef.current = 0;
    sessionTotalTypedRef.current = 0;
    sessionErrorsRef.current = 0;
    startTimeRef.current = null;
    endTimeRef.current = null;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, [duration]);

  // ── Load snippet ────────────────────────────────────────────────────────
  const loadSnippet = useCallback(() => {
    const { text } = pickSnippet(language, difficulty);
    setSnippet(text.split(''));
    resetState();
  }, [language, difficulty, resetState]);

  // ── Advance to next snippet (mid-session, without resetting the timer) ──
  const advanceSnippet = useCallback(() => {
    // Accumulate session totals from the just-finished snippet
    sessionTotalTypedRef.current += totalTypedRef.current;
    sessionErrorsRef.current += errorsRef.current;

    // Pick next snippet and reset per-snippet state only
    const { text } = pickSnippet(language, difficulty);
    setSnippet(text.split(''));
    setTypedChars([]);
    setCurrentIndex(0);
    setActiveLine(0);
    setErrors(0);
    setTotalTyped(0);
    totalTypedRef.current = 0;
    errorsRef.current = 0;
    snippetCountRef.current += 1;
    setSnippetCount(prev => prev + 1);
    // testState stays RUNNING, timer keeps counting
  }, [language, difficulty]);

  useEffect(() => {
    loadSnippet();
  }, [loadSnippet]);

  // ── Personal Best ───────────────────────────────────────────────────────
  useEffect(() => {
    const key = `${language}-${difficulty}`;
    const best = localStorage.getItem(key);
    setPersonalBest(best ? parseFloat(best) : null);
  }, [language, difficulty]);

  // ── End test ────────────────────────────────────────────────────────────
  const endTest = useCallback(() => {
    setTestState('FINISHED');
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const elapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 60000
      : duration / 60;

    // Use session-cumulative totals (includes all completed snippets + current snippet progress)
    const total = sessionTotalTypedRef.current + totalTypedRef.current;
    const errs = sessionErrorsRef.current + errorsRef.current;

    // Gross WPM: total chars / 5 / elapsed
    const gross = Math.max(0, Math.round((total / 5) / elapsed));
    // Net WPM: correct chars / 5 / elapsed  (correct = total - errors)
    const net = Math.max(0, Math.round(((total - errs) / 5) / elapsed));

    setGrossWpm(gross);
    setWpm(net);

    // Expose final session totals to results screen
    setTotalTyped(total);
    setErrors(errs);

    const key = `${language}-${difficulty}`;
    const currentBest = localStorage.getItem(key);
    const isNewBest = !currentBest || net > parseFloat(currentBest);
    if (isNewBest) {
      localStorage.setItem(key, net.toString());
      setPersonalBest(net);
      setIsNewPersonalBest(true);
      posthog?.capture('personal_best_achieved', {
        language,
        difficulty,
        wpm: net,
        previous_best: currentBest ? parseFloat(currentBest) : null,
      });
    }

    posthog?.capture('test_completed', {
      language,
      difficulty,
      duration,
      wpm: net,
      accuracy: Math.round(((total - errs) / total) * 100),
      errors: errs,
      total_chars_typed: total,
      snippets_completed: snippetCountRef.current + 1,
      is_personal_best: isNewBest,
    });
  }, [duration, language, difficulty, posthog]);

  // ── Countdown timer ─────────────────────────────────────────────────────
  useEffect(() => {
    if (testState === 'RUNNING') {
      timerIntervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
    }
  }, [testState, endTest]);

  // ── Real-time WPM (updated every 300ms) ─────────────────────────────────
  useEffect(() => {
    if (testState === 'RUNNING' && startTimeRef.current) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current!) / 60000;
        // Include accumulated session totals in live WPM
        const total = sessionTotalTypedRef.current + totalTypedRef.current;
        const gross = Math.max(0, Math.round((total / 5) / (elapsed || 0.001)));
        setGrossWpm(gross);
        setWpm(gross);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [testState]);

  // ── Key handler ─────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (testState === 'FINISHED') return;

    const { key } = e;

    // Tab: smart indentation — consume leading spaces on current line
    if (key === 'Tab') {
      e.preventDefault();
      if (testState === 'IDLE') {
        setTestState('RUNNING');
        startTimeRef.current = Date.now();
        posthog?.capture('test_started', {
          language,
          difficulty,
          duration,
        });
      }
      // Try to match up to 4 leading spaces at the current position
      let consumed = 0;
      for (let i = 0; i < 4 && snippet[currentIndex + i] === ' '; i++) {
        consumed++;
      }
      if (consumed > 0) {
        setTypedChars(prev => [...prev, ...Array(consumed).fill(' ')]);
        setCurrentIndex(prev => {
          const next = prev + consumed;
          setActiveLine(computeActiveLine(snippet, next));
          return next;
        });
        setTotalTyped(prev => prev + consumed);
        totalTypedRef.current += consumed;
      }
      return;
    }

    // Escape: reset to IDLE with same snippet
    if (key === 'Escape') {
      e.preventDefault();
      resetState();
      return;
    }

    // Ctrl/Cmd+Shift+R: new snippet
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && key.toLowerCase() === 'r') {
      e.preventDefault();
      loadSnippet();
      return;
    }

    // Ignore modifier-only combos
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (key.length > 1 && key !== 'Backspace' && key !== 'Enter') return;

    e.preventDefault();

    // Start test on first real keystroke
    if (testState === 'IDLE') {
      setTestState('RUNNING');
      startTimeRef.current = Date.now();
      posthog?.capture('test_started', {
        language,
        difficulty,
        duration,
      });
    }

    if (key === 'Backspace') {
      if (currentIndex > 0) {
        setTypedChars(prev => prev.slice(0, -1));
        setCurrentIndex(prev => {
          const next = prev - 1;
          setActiveLine(computeActiveLine(snippet, next));
          return next;
        });
        // Note: we do NOT decrement totalTyped — MonkeyType convention.
      }
      return;
    }

    if (key === 'Enter') {
      if (snippet[currentIndex] === '\n') {
        setTypedChars(prev => [...prev, '\n']);
        setCurrentIndex(prev => {
          const next = prev + 1;
          setActiveLine(computeActiveLine(snippet, next));
          return next;
        });
        setTotalTyped(prev => prev + 1);
        totalTypedRef.current += 1;
      }
      return;
    }

    // Normal character
    const expectedChar = snippet[currentIndex];
    if (!expectedChar) return;

    const isCorrect = key === expectedChar;

    setTypedChars(prev => [...prev, key]);
    setCurrentIndex(prev => {
      const next = prev + 1;
      setActiveLine(computeActiveLine(snippet, next));
      return next;
    });
    setTotalTyped(prev => prev + 1);
    totalTypedRef.current += 1;

    if (!isCorrect) {
      setErrors(prev => prev + 1);
      errorsRef.current += 1;
    }

    // Recalculate live accuracy (session-cumulative)
    setAccuracy(() => {
      const total = sessionTotalTypedRef.current + totalTypedRef.current;
      const errs = sessionErrorsRef.current + errorsRef.current;
      return total > 0 ? Math.round(((total - errs) / total) * 100) : 100;
    });

    // Snippet complete — auto-advance to next snippet, keep session running
    if (currentIndex + 1 === snippet.length) {
      advanceSnippet();
    }
  }, [currentIndex, snippet, testState, language, difficulty, duration, posthog, loadSnippet, resetState, endTest, advanceSnippet]);

  // ── Restart (same snippet) ──────────────────────────────────────────────
  const restart = useCallback(() => {
    resetState();
  }, [resetState]);

  return {
    testState,
    snippet,
    typedChars,
    currentIndex,
    wpm,
    grossWpm,
    accuracy,
    timeLeft,
    errors,
    totalTyped,
    activeLine,
    handleKeyDown,
    restart,
    newTest: loadSnippet,
    personalBest,
    isNewPersonalBest,
    snippetCount,
  };
}
