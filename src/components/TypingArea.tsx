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

// Height of one line in px — must match the font-size + line-height below
const LINE_HEIGHT_PX = 40;
// How many completed lines to keep visible above the active line
const LINES_ABOVE = 1;
// macOS title bar height in px (h-10 = 40px)
const TITLE_BAR_H = 40;
// Maximum visible code lines in the viewport (scrolls for longer snippets)
const MAX_VISIBLE_LINES = 5;

export function TypingArea({ snippet, typedChars, currentIndex, activeLine, testState, onKeyDown }: TypingAreaProps) {
  const inputRef    = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // ── Focus management ─────────────────────────────────────────────────────
  useEffect(() => {
    if (testState !== 'FINISHED') {
      inputRef.current?.focus();
    }
  }, [testState]);

  // Re-focus when a new snippet loads mid-session
  useEffect(() => {
    if (testState === 'RUNNING') {
      inputRef.current?.focus();
    }
  }, [snippet, testState]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // ── Split snippet into lines ──────────────────────────────────────────────
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

  // ── Programmatic scroll — keeps active line in view ───────────────────────
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const scrollTarget = Math.max(0, activeLine - LINES_ABOVE) * LINE_HEIGHT_PX;
    el.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  }, [activeLine]);

  // ── Container height: title bar + visible code lines + bottom padding ────
  // Capped at MAX_VISIBLE_LINES so long snippets don't make the box too tall.
  const visibleLines = Math.min(lines.length, MAX_VISIBLE_LINES);
  const totalH = Math.max(
    TITLE_BAR_H + visibleLines * LINE_HEIGHT_PX + 32, // 32 = top gap + bottom pad
    200,
  );

  // ── Render lines ──────────────────────────────────────────────────────────
  const renderedLines = useMemo(() => {
    return lines.map((line, lineIdx) => {
      const lineChars = line.chars.map((char, charOffset) => {
        const absoluteIdx = line.startIndex + charOffset;
        let stateClass = 'text-secondary-text'; // pending

        if (absoluteIdx < typedChars.length) {
          stateClass =
            typedChars[absoluteIdx] === char
              ? 'text-primary-text'                               // correct
              : 'text-error bg-error/10 border-b border-error';  // wrong
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

      // Newline indicator (↵) at end of each non-last line
      const newlineIdx      = line.startIndex + line.chars.length;
      const isNewlineCursor =
        newlineIdx === currentIndex && testState !== 'FINISHED' && lineIdx < lines.length - 1;

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
      style={{ height: totalH }}
      onClick={handleContainerClick}
      data-testid="typing-area"
    >
      {/* ── macOS window bar ─────────────────────────────────────────────────
          Fully opaque (bg-surface) so sliding code never bleeds through.
          z-30 ensures it always sits on top of the scrolling content.       */}
      <div className="absolute top-0 left-0 w-full h-10 bg-surface border-b border-border flex items-center px-4 gap-2 select-none z-30">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>

      {/* ── Scrollable code viewport ─────────────────────────────────────────
          Uses scrollTop (not translateY) for reliable browser-level clipping.
          The scrollbar is hidden via CSS; scrolling is programmatic only.    */}
      <div
        ref={viewportRef}
        className="absolute inset-0 pt-14 pb-4 px-8 select-none typing-viewport"
        style={{ overflowY: 'scroll' }}
      >
        <div className="font-mono text-[18px] tracking-wide">
          {renderedLines}
        </div>
      </div>

      {/* ── IDLE start hint ──────────────────────────────────────────────── */}
      {testState === 'IDLE' && (
        <div className="absolute bottom-4 right-6 flex items-center justify-center pointer-events-none z-20">
          <span className="text-secondary-text/35 text-xs font-mono tracking-widest select-none">
            start typing to begin
          </span>
        </div>
      )}

      {/* ── Hidden focus sink (captures all keystrokes) ──────────────────── */}
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
