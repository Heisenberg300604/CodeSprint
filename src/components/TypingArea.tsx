import React, { useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TestState } from '../types';

interface TypingAreaProps {
  snippet: string[];
  typedChars: string[];
  currentIndex: number;
  testState: TestState;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function TypingArea({ snippet, typedChars, currentIndex, testState, onKeyDown }: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (testState !== 'FINISHED') {
      inputRef.current?.focus();
    }
  }, [testState]);

  useEffect(() => {
    // Keep active character in view
    if (activeCharRef.current && containerRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const renderedSnippet = useMemo(() => {
    return snippet.map((char, index) => {
      let stateClass = "text-secondary-text"; // PENDING
      
      if (index < typedChars.length) {
        if (typedChars[index] === char) {
          stateClass = "text-primary-text drop-shadow-[0_0_8px_rgba(248,250,252,0.1)]"; // CORRECT
        } else {
          stateClass = "text-error border-b border-error bg-error/10"; // INCORRECT
        }
      }

      const isCursor = index === currentIndex && testState !== 'FINISHED';

      // Replace newline with return symbol visually, but actually render a break
      const isNewline = char === '\n';
      const displayChar = isNewline ? '↵\n' : char;

      return (
        <span
          key={index}
          ref={isCursor ? activeCharRef : null}
          className={cn(
            "relative",
            stateClass,
            isCursor && "before:absolute before:left-0 before:bottom-0 before:w-[2px] before:h-full before:bg-accent before:animate-cursor-blink",
            isCursor && isNewline && "before:left-auto before:right-0" // place cursor after symbol on newline
          )}
        >
          {displayChar}
        </span>
      );
    });
  }, [snippet, typedChars, currentIndex, testState]);

  return (
    <div 
      className={cn(
        "relative w-full rounded-xl bg-surface border border-border overflow-hidden transition-shadow duration-300",
        testState === 'RUNNING' && "ring-1 ring-accent ring-opacity-20 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
      )}
      onClick={handleContainerClick}
      data-testid="typing-area"
    >
      {/* macOS dots */}
      <div className="absolute top-0 left-0 w-full h-10 bg-surface/50 border-b border-border flex items-center px-4 gap-2 select-none">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>

      <div 
        ref={containerRef}
        className="pt-16 pb-8 px-8 h-[400px] overflow-y-auto overflow-x-hidden font-mono text-[20px] leading-[1.8] whitespace-pre-wrap break-all tracking-wide select-none"
      >
        {renderedSnippet}
      </div>

      <textarea
        ref={inputRef}
        className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (testState === 'RUNNING') {
            inputRef.current?.focus();
          }
        }}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        data-testid="hidden-input"
      />
    </div>
  );
}
