import { Language } from '../../constants';
import { Difficulty } from '../../types';
import { javascriptSnippets } from './javascript';
import { typescriptSnippets } from './typescript';
import { pythonSnippets } from './python';
import { javaSnippets } from './java';
import { rustSnippets } from './rust';
import { goSnippets } from './go';
import { cppSnippets } from './cpp';

export type { SnippetEntry } from './javascript';

// Aggregate all snippets into the shape expected by the typing engine:
// SNIPPETS[language][difficulty] => string[]
type SnippetRecord = Record<Language, Record<Difficulty, string[]>>;

function buildSnippetRecord(
  entries: Array<{ code: string; difficulty: Difficulty }>,
): Record<Difficulty, string[]> {
  const result: Record<Difficulty, string[]> = {
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  };
  for (const { code, difficulty } of entries) {
    result[difficulty].push(code);
  }
  return result;
}

export const SNIPPETS: SnippetRecord = {
  JavaScript: buildSnippetRecord(javascriptSnippets),
  TypeScript: buildSnippetRecord(typescriptSnippets),
  Python: buildSnippetRecord(pythonSnippets),
  Java: buildSnippetRecord(javaSnippets),
  Rust: buildSnippetRecord(rustSnippets),
  Go: buildSnippetRecord(goSnippets),
  'C++': buildSnippetRecord(cppSnippets),
};
