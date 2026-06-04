import React, { useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TestState } from '../types';

interface TypingAreaProps {
  snippet: string[];
  typedChars: string[];
  currentIndex: number;
  activeLine: number;
  testState: TestState;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

// Height of one line in px — must match leading-[2] at text-[18px]
const LINE_HEIGHT_PX = 40;
// How many completed lines to keep visible above the active line
const LINES_ABOVE = 2;

export function TypingArea({ snippet, typedChars, currentIndex, activeLine, testState, onKeyDown }: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (testState !== 'FINISHED') {
      inputRef.current?.focus();
    }
  }, [testState]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Split snippet into lines for rendering
  const lines = useMemo(() => {
    const result: Array<{ chars: string[]; startIndex: number }> = [];
    let currentLine: string[] = [];
    let lineStart = 0;

    snippet.forEach((char, i) => {
      if (char === '\n') {
        result.push({ chars: currentLine, startIndex: lineStart });
        currentLine = [];
        lineStart = i + 1;
      } else {
        currentLine.push(char);
      }
    });
    if (currentLine.length > 0 || snippet.length === 0) {
      result.push({ chars: currentLine, startIndex: lineStart });
    }
    return result;
  }, [snippet]);

  // translateY so the active line sits at a fixed vertical position
  // We offset by (activeLine - LINES_ABOVE) lines, clamped at 0
  const translateY = -Math.max(0, activeLine - LINES_ABOVE) * LINE_HEIGHT_PX;

  const renderedLines = useMemo(() => {
    return lines.map((line, lineIdx) => {
      const lineChars = line.chars.map((char, charOffset) => {
        const absoluteIdx = line.startIndex + charOffset;
        let stateClass = 'text-secondary-text'; // pending

        if (absoluteIdx < typedChars.length) {
          stateClass =
            typedChars[absoluteIdx] === char
              ? 'text-primary-text'   // correct
              : 'text-error bg-error/10 border-b border-error'; // wrong
        }

        const isCursor = absoluteIdx === currentIndex && testState !== 'FINISHED';

        return (
          <span
            key={absoluteIdx}
            className={cn(
              'relative',
              stateClass,
              isCursor &&
                'before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-accent before:animate-cursor-blink',
            )}
          >
            {char}
          </span>
        );
      });

      // Newline character at end of line (except last line)
      const newlineIdx = line.startIndex + line.chars.length;
      const isNewlineCursor = newlineIdx === currentIndex && testState !== 'FINISHED' && lineIdx < lines.length - 1;

      return (
        <div
          key={lineIdx}
          className="relative whitespace-pre flex items-center"
          style={{ height: LINE_HEIGHT_PX, lineHeight: `${LINE_HEIGHT_PX}px` }}
        >
          {lineChars}
          {lineIdx < lines.length - 1 && (
            <span
              className={cn(
                'relative text-secondary-text/30 select-none ml-0.5',
                isNewlineCursor &&
                  'before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-accent before:animate-cursor-blink',
              )}
            >
              ↵
            </span>
          )}
        </div>
      );
    });
  }, [lines, typedChars, currentIndex, testState]);

  return (
    <div
      className={cn(
        'relative w-full rounded-xl bg-surface border border-border overflow-hidden transition-shadow duration-300',
        testState === 'RUNNING' && 'ring-1 ring-accent/20 shadow-[0_0_30px_rgba(34,211,238,0.05)]',
      )}
      onClick={handleContainerClick}
      data-testid="typing-area"
    >
      {/* macOS window bar */}
      <div className="absolute top-0 left-0 w-full h-10 bg-surface/50 border-b border-border flex items-center px-4 gap-2 select-none z-10">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>

      {/* Fixed-height viewport — no scrollbar */}
      <div
        className="pt-14 pb-4 px-8 overflow-hidden select-none"
        style={{ height: 400 }}
      >
        {/* Inner block slides up via translateY */}
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            transition: 'transform 150ms ease',
          }}
          className="font-mono text-[18px] tracking-wide"
        >
          {renderedLines}
        </div>
      </div>

      {/* Hidden focus sink */}
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
        spellCheck={false}
        data-testid="hidden-input"
      />
    </div>
  );
}
