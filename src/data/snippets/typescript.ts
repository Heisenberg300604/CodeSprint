import { SnippetEntry } from './javascript';

export const typescriptSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `type Status = 'active' | 'inactive' | 'pending';\n\nfunction getLabel(s: Status): string {\n  return s.toUpperCase();\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `function identity<T>(value: T): T {\n  return value;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const numbers: number[] = [1, 2, 3];\nconst doubled = numbers.map((n): number => n * 2);`,
  },
  {
    difficulty: 'Beginner',
    code: `enum Direction {\n  Up = 'UP',\n  Down = 'DOWN',\n  Left = 'LEFT',\n  Right = 'RIGHT',\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `function getLength<T>(items: T[]): number {\n  return items.length;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `class Animal {\n  constructor(public name: string) {}\n  speak(): string {\n    return \`\${this.name} makes a sound.\`;\n  }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `type Nullable<T> = T | null;\n\nconst username: Nullable<string> = null;`,
  },
  {
    difficulty: 'Beginner',
    code: `interface Point {\n  x: number;\n  y: number;\n}\n\nfunction distance(a: Point, b: Point): number {\n  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `type Pair<T, U> = [T, U];\n\nconst entry: Pair<string, number> = ['age', 30];`,
  },
  {
    difficulty: 'Beginner',
    code: `function isString(value: unknown): value is string {\n  return typeof value === 'string';\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const add = (a: number, b: number): number => a + b;\nconsole.log(add(2, 3));`,
  },
  {
    difficulty: 'Beginner',
    code: `interface Config {\n  host: string;\n  port: number;\n  secure?: boolean;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `type DeepPartial<T> = {\n  [P in keyof T]?: T[P] extends object\n    ? DeepPartial<T[P]>\n    : T[P];\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `function assertIsString(val: unknown): asserts val is string {\n  if (typeof val !== 'string') {\n    throw new Error(\`Expected string, got \${typeof val}\`);\n  }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Result<T, E = Error> =\n  | { success: true; data: T }\n  | { success: false; error: E };\n\nfunction ok<T>(data: T): Result<T> {\n  return { success: true, data };\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type EventMap = Record<string, unknown[]>;\n\nclass TypedEmitter<T extends EventMap> {\n  private listeners = new Map<keyof T, Function[]>();\n  on<K extends keyof T>(event: K, fn: (...args: T[K]) => void) {\n    (this.listeners.get(event) ?? this.listeners.set(event, []).get(event)!).push(fn);\n  }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type ReadonlyDeep<T> = {\n  readonly [P in keyof T]: T[P] extends object\n    ? ReadonlyDeep<T[P]>\n    : T[P];\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `async function fetchJSON<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n  return res.json() as Promise<T>;\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `function groupBy<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T[]> {\n  return arr.reduce((map, item) => {\n    const group = item[key];\n    map.set(group, [...(map.get(group) ?? []), item]);\n    return map;\n  }, new Map<T[K], T[]>());\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\n\ntype UnwrappedUser = Awaited<Promise<Promise<User>>>;`,
  },
  {
    difficulty: 'Intermediate',
    code: `class Repository<T extends { id: string }> {\n  private store = new Map<string, T>();\n  save(entity: T): void { this.store.set(entity.id, entity); }\n  findById(id: string): T | undefined { return this.store.get(id); }\n  findAll(): T[] { return [...this.store.values()]; }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type NonNullableFields<T> = {\n  [K in keyof T]-?: NonNullable<T[K]>;\n};\n\ntype RequiredUser = NonNullableFields<Partial<User>>;`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `type UnionToIntersection<U> =\n  (U extends any ? (k: U) => void : never) extends\n  (k: infer I) => void ? I : never;`,
  },
  {
    difficulty: 'Advanced',
    code: `type Flatten<T> = T extends Array<infer Item> ? Flatten<Item> : T;\n\ntype DeepNumber = Flatten<number[][][]>;`,
  },
  {
    difficulty: 'Advanced',
    code: `type PathKeys<T, Prefix extends string = ''> = {\n  [K in keyof T & string]: T[K] extends object\n    ? PathKeys<T[K], \`\${Prefix}\${K}.\`>\n    : \`\${Prefix}\${K}\`;\n}[keyof T & string];`,
  },
  {
    difficulty: 'Advanced',
    code: `type Builder<T> = {\n  [K in keyof T]-?: (value: T[K]) => Builder<T>;\n} & { build: () => T };\n\nfunction createBuilder<T extends object>(defaults: T): Builder<T> {\n  const obj = { ...defaults };\n  const proxy = new Proxy(obj, { get: (t, k) => k === 'build' ? () => t : (v: any) => { (t as any)[k] = v; return proxy; } });\n  return proxy as Builder<T>;\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `type Prettify<T> = { [K in keyof T]: T[K] } & {};\n\ntype Merge<A, B> = Prettify<Omit<A, keyof B> & B>;`,
  },
];
