import { Language } from '../constants';
import { Difficulty } from '../types';

type SnippetRecord = Record<Language, Record<Difficulty, string[]>>;

export const SNIPPETS: SnippetRecord = {
  JavaScript: {
    Beginner: [
      "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
      "const filterEven = (arr) => {\n  return arr.filter(num => num % 2 === 0);\n};\nconsole.log(filterEven([1, 2, 3, 4]));",
      "function greet(name) {\n  const message = `Hello, ${name}!`;\n  return message;\n}"
    ],
    Advanced: [
      "const racePromises = async (promises) => {\n  try {\n    const result = await Promise.race(promises);\n    return result;\n  } catch (err) {\n    throw new Error('Race failed');\n  }\n};",
      "const compose = (...fns) => (x) =>\n  fns.reduceRight((acc, fn) => fn(acc), x);\n\nconst toUpper = str => str.toUpperCase();\nconst exclaim = str => `${str}!`;",
      "function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}"
    ]
  },
  TypeScript: {
    Beginner: [
      "interface User {\n  id: number;\n  name: string;\n}\n\nfunction getUserInfo(user: User): string {\n  return `User ${user.id} is ${user.name}`;\n}",
      "type Result<T> = {\n  success: boolean;\n  data?: T;\n  error?: string;\n};",
      "function getLength<T>(items: T[]): number {\n  return items.length;\n}"
    ],
    Advanced: [
      "type DeepPartial<T> = {\n  [P in keyof T]?: T[P] extends object\n    ? DeepPartial<T[P]>\n    : T[P];\n};",
      "function assertIsString(val: any): asserts val is string {\n  if (typeof val !== 'string') {\n    throw new Error('Not a string!');\n  }\n}",
      "type ExtractPromiseType<T> = T extends Promise<infer U>\n  ? U\n  : T;\n\ntype MyString = ExtractPromiseType<Promise<string>>;"
    ]
  },
  Python: {
    Beginner: [
      "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
      "def filter_even(numbers):\n    return [n for n in numbers if n % 2 == 0]",
      "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return 'Woof!'"
    ],
    Advanced: [
      "def timer_decorator(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        return result\n    return wrapper",
      "class AsyncContextManager:\n    async def __aenter__(self):\n        await self.connect()\n        return self\n    async def __aexit__(self, exc_type, exc, tb):\n        await self.close()",
      "def get_combinations(lst):\n    if not lst:\n        return [[]]\n    rest = get_combinations(lst[1:])\n    return rest + [[lst[0]] + r for r in rest]"
    ]
  },
  Java: {
    Beginner: [
      "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}",
      "public int sum(int a, int b) {\n    return a + b;\n}",
      "class Rectangle {\n    int width, height;\n    public int area() {\n        return width * height;\n    }\n}"
    ],
    Advanced: [
      "public <T> CompletableFuture<T> fetchAsync() {\n    return CompletableFuture.supplyAsync(() -> {\n        return performExpensiveTask();\n    });\n}",
      "List<String> names = users.stream()\n    .filter(u -> u.getAge() > 18)\n    .map(User::getName)\n    .collect(Collectors.toList());",
      "public synchronized void safeMethod() {\n    while (condition == false) {\n        wait();\n    }\n    doTask();\n    notifyAll();\n}"
    ]
  },
  Rust: {
    Beginner: [
      "fn fibonacci(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}",
      "struct User {\n    username: String,\n    active: bool,\n}",
      "fn main() {\n    let numbers = vec![1, 2, 3];\n    for n in numbers {\n        println!(\"{}\", n);\n    }\n}"
    ],
    Advanced: [
      "impl<'a, T> MyIterator<'a, T> where T: Clone {\n    fn next(&mut self) -> Option<T> {\n        self.items.pop().map(|i| i.clone())\n    }\n}",
      "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nlet counter = Arc::new(Mutex::new(0));",
      "pub trait Summary {\n    fn summarize(&self) -> String;\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!(\"{}\", self.title)\n    }\n}"
    ]
  },
  Go: {
    Beginner: [
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
      "func add(x int, y int) int {\n    return x + y\n}",
      "type Vertex struct {\n    X, Y float64\n}"
    ],
    Advanced: [
      "func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 2\n    }\n}",
      "func (v *Vertex) Scale(f float64) {\n    v.X = v.X * f\n    v.Y = v.Y * f\n}",
      "select {\ncase msg1 := <-c1:\n    fmt.Println(\"received\", msg1)\ncase msg2 := <-c2:\n    fmt.Println(\"received\", msg2)\n}"
    ]
  },
  "C++": {
    Beginner: [
      "#include <iostream>\n\nint main() {\n    std::cout << \"Hello World!\" << std::endl;\n    return 0;\n}",
      "int add(int a, int b) {\n    return a + b;\n}",
      "class MyClass {\n  public:\n    int myNum;\n    void myMethod() {\n        std::cout << \"Hello World!\";\n    }\n};"
    ],
    Advanced: [
      "template <typename T>\nT myMax(T x, T y) {\n    return (x > y) ? x : y;\n}",
      "std::unique_ptr<int> ptr(new int(10));\nstd::unique_ptr<int> ptr2 = std::move(ptr);",
      "void thread_func() {\n    std::lock_guard<std::mutex> lock(my_mutex);\n    shared_var++;\n}"
    ]
  }
};
