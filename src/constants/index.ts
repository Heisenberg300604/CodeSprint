import { Difficulty, Duration } from '../types';

export const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Rust',
  'Go',
  'C++'
] as const;

export type Language = typeof LANGUAGES[number];

export const DIFFICULTIES: Difficulty[] = ['Beginner', 'Advanced'];
export const DURATIONS: Duration[] = [30, 60, 120];
