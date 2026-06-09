export type TestState = 'IDLE' | 'RUNNING' | 'FINISHED';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Duration = 30 | 60 | 120;

export interface TypingEngineReturn {
  testState: TestState;
  snippet: string[];
  typedChars: string[];
  currentIndex: number;
  wpm: number;
  grossWpm: number;
  accuracy: number;
  timeLeft: number;
  errors: number;
  totalTyped: number;
  activeLine: number;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  restart: () => void;
  newTest: () => void;
  personalBest: number | null;
  isNewPersonalBest: boolean;
  snippetCount: number;
}
