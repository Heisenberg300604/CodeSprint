import { SnippetEntry } from './javascript';

export const pythonSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `def greet(name: str) -> str:\n    return f"Hello, {name}!"`,
  },
  {
    difficulty: 'Beginner',
    code: `numbers = [1, 2, 3, 4, 5]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)`,
  },
  {
    difficulty: 'Beginner',
    code: `def factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)`,
  },
  {
    difficulty: 'Beginner',
    code: `class Dog:\n    def __init__(self, name: str):\n        self.name = name\n\n    def bark(self) -> str:\n        return "Woof!"`,
  },
  {
    difficulty: 'Beginner',
    code: `fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit.upper())`,
  },
  {
    difficulty: 'Beginner',
    code: `def is_palindrome(s: str) -> bool:\n    return s == s[::-1]`,
  },
  {
    difficulty: 'Beginner',
    code: `squares = {x: x ** 2 for x in range(1, 6)}\nprint(squares)`,
  },
  {
    difficulty: 'Beginner',
    code: `def sum_list(nums: list) -> int:\n    total = 0\n    for n in nums:\n        total += n\n    return total`,
  },
  {
    difficulty: 'Beginner',
    code: `name = input("Enter your name: ")\nprint(f"Hello, {name}!")`,
  },
  {
    difficulty: 'Beginner',
    code: `def celsius_to_fahrenheit(c: float) -> float:\n    return c * 9 / 5 + 32`,
  },
  {
    difficulty: 'Beginner',
    code: `stack = []\nstack.append(1)\nstack.append(2)\nstack.pop()`,
  },
  {
    difficulty: 'Beginner',
    code: `def count_vowels(s: str) -> int:\n    return sum(1 for c in s if c in "aeiouAEIOU")`,
  },
  {
    difficulty: 'Beginner',
    code: `a, b = 5, 3\nprint(f"Max: {max(a, b)}, Min: {min(a, b)}")`,
  },
  {
    difficulty: 'Beginner',
    code: `words = ["hello", "world", "python"]\nwords.sort(key=len)\nprint(words)`,
  },
  {
    difficulty: 'Beginner',
    code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `def timer(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper`,
  },
  {
    difficulty: 'Intermediate',
    code: `from typing import Generator\n\ndef fibonacci() -> Generator[int, None, None]:\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b`,
  },
  {
    difficulty: 'Intermediate',
    code: `from dataclasses import dataclass, field\n\n@dataclass\nclass Config:\n    host: str = "localhost"\n    port: int = 8080\n    tags: list = field(default_factory=list)`,
  },
  {
    difficulty: 'Intermediate',
    code: `def flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result`,
  },
  {
    difficulty: 'Intermediate',
    code: `from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fib(n: int) -> int:\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)`,
  },
  {
    difficulty: 'Intermediate',
    code: `class Singleton:\n    _instance = None\n\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance`,
  },
  {
    difficulty: 'Intermediate',
    code: `from collections import defaultdict\n\ndef group_by(items, key_fn):\n    groups = defaultdict(list)\n    for item in items:\n        groups[key_fn(item)].append(item)\n    return dict(groups)`,
  },
  {
    difficulty: 'Intermediate',
    code: `import asyncio\n\nasync def fetch(url: str) -> str:\n    await asyncio.sleep(0.1)\n    return f"Response from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("https://api.example.com/a"),\n        fetch("https://api.example.com/b"),\n    )`,
  },
  {
    difficulty: 'Intermediate',
    code: `def memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper`,
  },
  {
    difficulty: 'Intermediate',
    code: `from contextlib import contextmanager\n\n@contextmanager\ndef managed_resource(name: str):\n    print(f"Acquiring {name}")\n    try:\n        yield name\n    finally:\n        print(f"Releasing {name}")`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `from typing import TypeVar, Generic, Iterator\n\nT = TypeVar("T")\n\nclass Stack(Generic[T]):\n    def __init__(self) -> None:\n        self._items: list[T] = []\n    def push(self, item: T) -> None:\n        self._items.append(item)\n    def pop(self) -> T:\n        return self._items.pop()\n    def __iter__(self) -> Iterator[T]:\n        return reversed(self._items)`,
  },
  {
    difficulty: 'Advanced',
    code: `import asyncio\nfrom typing import AsyncIterator\n\nasync def arange(start: int, stop: int) -> AsyncIterator[int]:\n    for i in range(start, stop):\n        await asyncio.sleep(0)\n        yield i`,
  },
  {
    difficulty: 'Advanced',
    code: `def retry(times=3, exceptions=(Exception,)):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for attempt in range(times):\n                try:\n                    return func(*args, **kwargs)\n                except exceptions as e:\n                    if attempt == times - 1:\n                        raise\n        return wrapper\n    return decorator`,
  },
  {
    difficulty: 'Advanced',
    code: `from abc import ABC, abstractmethod\n\nclass AbstractRepository(ABC):\n    @abstractmethod\n    def find_by_id(self, entity_id: str):\n        ...\n    @abstractmethod\n    def save(self, entity) -> None:\n        ...\n    @abstractmethod\n    def delete(self, entity_id: str) -> None:\n        ...`,
  },
  {
    difficulty: 'Advanced',
    code: `class MetaValidator(type):\n    def __new__(mcs, name, bases, namespace):\n        for attr, value in namespace.items():\n            if callable(value) and not attr.startswith("_"):\n                namespace[attr] = mcs._validate(value)\n        return super().__new__(mcs, name, bases, namespace)\n\n    @staticmethod\n    def _validate(func):\n        def wrapper(*args, **kwargs):\n            result = func(*args, **kwargs)\n            assert result is not None\n            return result\n        return wrapper`,
  },
];
