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

  // Re-focus whenever a new snippet loads (snippet array reference changes)
  useEffect(() => {
    if (testState === 'RUNNING') {
      inputRef.current?.focus();
    }
  }, [snippet, testState]);

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
  const translateY = -Math.max(0, activeLine - LINES_ABOVE) * LINE_HEIGHT_PX;

  // Content-aware height:
  //  pt-14 (56px title bar space) + all lines + pb-4 (16px)
  //  capped between 200px min and 520px max
  const TITLE_BAR_PT = 56; // pt-14
  const BOTTOM_PB    = 16; // pb-4
  const naturalContentHeight = lines.length * LINE_HEIGHT_PX;
  const viewportHeight = Math.min(
    Math.max(naturalContentHeight + TITLE_BAR_PT + BOTTOM_PB, 200),
    520,
  );

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
      style={{ height: viewportHeight, transition: 'height 250ms ease, box-shadow 300ms ease' }}
      onClick={handleContainerClick}
      data-testid="typing-area"
    >
      {/* macOS window bar */}
      <div className="absolute top-0 left-0 w-full h-10 bg-surface/50 border-b border-border flex items-center px-4 gap-2 select-none z-10">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>

      {/* Viewport — sized to match outer container */}
      <div
        className="h-full pt-14 pb-4 px-8 overflow-hidden select-none"
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

      {/* IDLE start hint overlay */}
      {testState === 'IDLE' && (
        <div className="absolute bottom-4 right-6 flex items-center justify-center pointer-events-none z-20">
          <span className="text-secondary-text/35 text-xs font-mono tracking-widest select-none">
            start typing to begin
          </span>
        </div>
      )}

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
