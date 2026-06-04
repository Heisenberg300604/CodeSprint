import { useState, useEffect, useCallback, useRef } from 'react';
import { TestState, TypingEngineReturn, Difficulty, Duration } from '../types';
import { Language } from '../constants';
import { SNIPPETS } from '../data/snippets';

interface UseTypingEngineProps {
  language: Language;
  difficulty: Difficulty;
  duration: Duration;
}

export function useTypingEngine({ language, difficulty, duration }: UseTypingEngineProps): TypingEngineReturn {
  const [testState, setTestState] = useState<TestState>('IDLE');
  const [snippet, setSnippet] = useState<string[]>([]);
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [errors, setErrors] = useState<number>(0);
  const [totalTyped, setTotalTyped] = useState<number>(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [isNewPersonalBest, setIsNewPersonalBest] = useState<boolean>(false);

  const startTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const loadSnippet = useCallback(() => {
    const list = SNIPPETS[language][difficulty];
    const text = list[Math.floor(Math.random() * list.length)];
    setSnippet(text.split(''));
    setTypedChars([]);
    setCurrentIndex(0);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(duration);
    setErrors(0);
    setTotalTyped(0);
    setTestState('IDLE');
    setIsNewPersonalBest(false);
    startTimeRef.current = null;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, [language, difficulty, duration]);

  useEffect(() => {
    loadSnippet();
  }, [loadSnippet]);

  useEffect(() => {
    const key = `${language}-${difficulty}`;
    const best = localStorage.getItem(key);
    if (best) setPersonalBest(parseFloat(best));
    else setPersonalBest(null);
  }, [language, difficulty]);

  const endTest = useCallback(() => {
    setTestState('FINISHED');
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    let correctCount = 0;
    snippet.forEach((char, i) => {
      if (typedChars[i] === char) correctCount++;
    });
    
    const minutesElapsed = (duration - timeLeft) / 60 || (duration / 60);
    const finalWpm = Math.max(0, Math.round((correctCount / 5) / minutesElapsed));
    setWpm(finalWpm);
    
    const key = `${language}-${difficulty}`;
    const currentBest = localStorage.getItem(key);
    
    if (!currentBest || finalWpm > parseFloat(currentBest)) {
      localStorage.setItem(key, finalWpm.toString());
      setPersonalBest(finalWpm);
      setIsNewPersonalBest(true);
    }
  }, [snippet, typedChars, duration, timeLeft, language, difficulty]);

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

  // Real-time WPM updater
  useEffect(() => {
    if (testState === 'RUNNING' && startTimeRef.current) {
      const interval = setInterval(() => {
        const elapsedMinutes = (Date.now() - startTimeRef.current!) / 60000;
        let correctCount = 0;
        snippet.forEach((char, i) => {
          if (i < typedChars.length && typedChars[i] === char) correctCount++;
        });
        setWpm(Math.max(0, Math.round((correctCount / 5) / (elapsedMinutes || 0.01))));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [testState, snippet, typedChars]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (testState === 'FINISHED') return;
    
    const { key } = e;
    
    if (key === 'Tab') {
      e.preventDefault();
      loadSnippet();
      return;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && key.toLowerCase() === 'r') {
      e.preventDefault();
      setTypedChars([]);
      setCurrentIndex(0);
      setTestState('IDLE');
      setTimeLeft(duration);
      setErrors(0);
      setTotalTyped(0);
      startTimeRef.current = null;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    if (key === 'Escape') {
      e.preventDefault();
      setTypedChars([]);
      setCurrentIndex(0);
      setTestState('IDLE');
      setTimeLeft(duration);
      setErrors(0);
      setTotalTyped(0);
      startTimeRef.current = null;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }
    
    // Ignore meta/control keys that are not characters
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (key.length > 1 && key !== 'Backspace' && key !== 'Enter') return;
    
    e.preventDefault();

    if (testState === 'IDLE') {
      setTestState('RUNNING');
      startTimeRef.current = Date.now();
    }
    
    if (key === 'Backspace') {
      if (currentIndex > 0) {
        setTypedChars(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }
      return;
    }
    
    if (key === 'Enter') {
      if (snippet[currentIndex] === '\n') {
        setTypedChars(prev => [...prev, '\n']);
        setCurrentIndex(prev => prev + 1);
        setTotalTyped(prev => prev + 1);
      }
      return;
    }

    // Normal char typed
    const expectedChar = snippet[currentIndex];
    if (!expectedChar) return; // end of snippet reached before time
    
    const isCorrect = key === expectedChar;
    
    setTypedChars(prev => [...prev, key]);
    setCurrentIndex(prev => prev + 1);
    setTotalTyped(prev => prev + 1);
    
    if (!isCorrect) {
      setErrors(prev => prev + 1);
    }
    
    setAccuracy(prev => {
      let correct = 0;
      const newTyped = [...typedChars, key];
      snippet.forEach((c, i) => {
        if (i < newTyped.length && newTyped[i] === c) correct++;
      });
      return Math.round((correct / (totalTyped + 1)) * 100);
    });

    if (currentIndex + 1 === snippet.length) {
      endTest();
    }

  }, [currentIndex, snippet, testState, loadSnippet, duration, endTest, typedChars, totalTyped]);

  const restart = useCallback(() => {
    setTypedChars([]);
    setCurrentIndex(0);
    setTestState('IDLE');
    setTimeLeft(duration);
    setErrors(0);
    setTotalTyped(0);
    startTimeRef.current = null;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, [duration]);

  return {
    testState,
    snippet,
    typedChars,
    currentIndex,
    wpm,
    accuracy,
    timeLeft,
    errors,
    totalTyped,
    handleKeyDown,
    restart,
    newTest: loadSnippet,
    personalBest,
    isNewPersonalBest
  };
}
