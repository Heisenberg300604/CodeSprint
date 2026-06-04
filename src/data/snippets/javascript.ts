import { Difficulty } from '../../types';

export interface SnippetEntry {
  code: string;
  difficulty: Difficulty;
}

export const javascriptSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
  },
  {
    difficulty: 'Beginner',
    code: `function isEven(n) {\n  return n % 2 === 0;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const user = { name: 'Alice', age: 30 };\nconsole.log(user.name);`,
  },
  {
    difficulty: 'Beginner',
    code: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `function sum(a, b) {\n  return a + b;\n}\nconsole.log(sum(3, 4));`,
  },
  {
    difficulty: 'Beginner',
    code: `const fruits = ['apple', 'banana', 'cherry'];\nfruits.forEach(fruit => console.log(fruit));`,
  },
  {
    difficulty: 'Beginner',
    code: `function reverseString(str) {\n  return str.split('').reverse().join('');\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const square = x => x * x;\nconsole.log(square(5));`,
  },
  {
    difficulty: 'Beginner',
    code: `let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `function maxOf(a, b) {\n  return a > b ? a : b;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const name = 'World';\nconsole.log(\`Hello, \${name}!\`);`,
  },
  {
    difficulty: 'Beginner',
    code: `const arr = [5, 3, 8, 1];\narr.sort((a, b) => a - b);\nconsole.log(arr);`,
  },
  {
    difficulty: 'Beginner',
    code: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `const obj = { x: 10, y: 20 };\nconst { x, y } = obj;\nconsole.log(x, y);`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `const fetchUser = async (id) => {\n  const res = await fetch(\`/api/users/\${id}\`);\n  if (!res.ok) throw new Error('Not found');\n  return res.json();\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    (this.events[event] ??= []).push(listener);\n  }\n  emit(event, ...args) {\n    this.events[event]?.forEach(l => l(...args));\n  }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `function chunk(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `async function* paginate(url) {\n  let next = url;\n  while (next) {\n    const res = await fetch(next);\n    const data = await res.json();\n    yield data.items;\n    next = data.nextPage ?? null;\n  }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `function flattenDeep(arr) {\n  return arr.reduce((acc, val) =>\n    Array.isArray(val)\n      ? acc.concat(flattenDeep(val))\n      : acc.concat(val),\n  []);\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `const groupBy = (arr, key) =>\n  arr.reduce((groups, item) => {\n    const group = item[key];\n    groups[group] = groups[group] ?? [];\n    groups[group].push(item);\n    return groups;\n  }, {});`,
  },
  {
    difficulty: 'Intermediate',
    code: `function throttle(fn, limit) {\n  let inThrottle = false;\n  return function (...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\n\nconst transform = pipe(\n  x => x * 2,\n  x => x + 1,\n  x => x.toString()\n);`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `const compose = (...fns) => (x) =>\n  fns.reduceRight((acc, fn) => fn(acc), x);\n\nconst toUpper = s => s.toUpperCase();\nconst exclaim = s => \`\${s}!\`;\nconst shout = compose(exclaim, toUpper);`,
  },
  {
    difficulty: 'Advanced',
    code: `function createStore(reducer, initialState) {\n  let state = initialState;\n  const listeners = [];\n  return {\n    getState: () => state,\n    dispatch: (action) => {\n      state = reducer(state, action);\n      listeners.forEach(l => l());\n    },\n    subscribe: (listener) => listeners.push(listener),\n  };\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `const retry = (fn, retries = 3, delay = 500) =>\n  new Promise((resolve, reject) => {\n    const attempt = (n) =>\n      Promise.resolve()\n        .then(fn)\n        .then(resolve)\n        .catch(err =>\n          n > 0\n            ? setTimeout(() => attempt(n - 1), delay)\n            : reject(err)\n        );\n    attempt(retries);\n  });`,
  },
  {
    difficulty: 'Advanced',
    code: `function* range(start, end, step = 1) {\n  for (let i = start; i < end; i += step) {\n    yield i;\n  }\n}\n\nconst squares = [...range(0, 10, 2)].map(x => x ** 2);`,
  },
  {
    difficulty: 'Advanced',
    code: `class Observable {\n  constructor(subscriber) {\n    this._subscriber = subscriber;\n  }\n  subscribe(observer) {\n    return this._subscriber(observer);\n  }\n  map(fn) {\n    return new Observable(observer =>\n      this.subscribe({ next: v => observer.next(fn(v)) })\n    );\n  }\n}`,
  },
];
