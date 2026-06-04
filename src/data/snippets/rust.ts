import { SnippetEntry } from './javascript';

export const rustSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `fn is_even(n: i32) -> bool {\n    n % 2 == 0\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `let numbers = vec![1, 2, 3, 4, 5];\nlet sum: i32 = numbers.iter().sum();\nprintln!("Sum: {}", sum);`,
  },
  {
    difficulty: 'Beginner',
    code: `struct Point {\n    x: f64,\n    y: f64,\n}\n\nfn distance(a: &Point, b: &Point) -> f64 {\n    ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `fn factorial(n: u64) -> u64 {\n    match n {\n        0 | 1 => 1,\n        _ => n * factorial(n - 1),\n    }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `fn main() {\n    for i in 1..=5 {\n        println!("{}: {}", i, i * i);\n    }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `let mut v = vec![3, 1, 4, 1, 5];\nv.sort();\nv.dedup();\nprintln!("{:?}", v);`,
  },
  {
    difficulty: 'Beginner',
    code: `fn reverse_string(s: &str) -> String {\n    s.chars().rev().collect()\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `use std::collections::HashMap;\n\nlet mut scores: HashMap<&str, i32> = HashMap::new();\nscores.insert("Alice", 95);\nscores.insert("Bob", 87);`,
  },
  {
    difficulty: 'Beginner',
    code: `fn max_of(a: i32, b: i32) -> i32 {\n    if a > b { a } else { b }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `#[derive(Debug)]\nstruct User {\n    name: String,\n    age: u32,\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `fn count_vowels(s: &str) -> usize {\n    s.chars().filter(|c| "aeiouAEIOU".contains(*c)).count()\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `let result: Result<i32, &str> = Ok(42);\nmatch result {\n    Ok(v) => println!("Got: {}", v),\n    Err(e) => println!("Error: {}", e),\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `fn fibonacci(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `let numbers: Vec<i32> = (1..=10).filter(|n| n % 2 == 0).collect();\nprintln!("{:?}", numbers);`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `pub trait Animal {\n    fn name(&self) -> &str;\n    fn speak(&self) -> String;\n    fn describe(&self) -> String {\n        format!("{} says: {}", self.name(), self.speak())\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `use std::sync::{Arc, Mutex};\nuse std::thread;\n\nlet counter = Arc::new(Mutex::new(0));\nlet handles: Vec<_> = (0..10).map(|_| {\n    let c = Arc::clone(&counter);\n    thread::spawn(move || { *c.lock().unwrap() += 1; })\n}).collect();`,
  },
  {
    difficulty: 'Intermediate',
    code: `#[derive(Debug, Clone)]\npub enum Tree<T> {\n    Leaf(T),\n    Node(Box<Tree<T>>, Box<Tree<T>>),\n}\n\nimpl<T: std::fmt::Display> Tree<T> {\n    pub fn depth(&self) -> usize {\n        match self {\n            Tree::Leaf(_) => 1,\n            Tree::Node(l, r) => 1 + l.depth().max(r.depth()),\n        }\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `fn chunk<T: Clone>(v: &[T], size: usize) -> Vec<Vec<T>> {\n    v.chunks(size).map(|c| c.to_vec()).collect()\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `use std::collections::HashMap;\n\nfn word_count(text: &str) -> HashMap<&str, usize> {\n    let mut map = HashMap::new();\n    for word in text.split_whitespace() {\n        *map.entry(word).or_insert(0) += 1;\n    }\n    map\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `struct Stack<T> {\n    items: Vec<T>,\n}\n\nimpl<T> Stack<T> {\n    pub fn new() -> Self { Stack { items: vec![] } }\n    pub fn push(&mut self, item: T) { self.items.push(item); }\n    pub fn pop(&mut self) -> Option<T> { self.items.pop() }\n    pub fn is_empty(&self) -> bool { self.items.is_empty() }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `fn memoize<A, R, F>(f: F) -> impl FnMut(A) -> R\nwhere\n    A: Eq + std::hash::Hash + Clone,\n    R: Clone,\n    F: Fn(A) -> R,\n{\n    let mut cache = std::collections::HashMap::new();\n    move |arg: A| cache.entry(arg.clone()).or_insert_with(|| f(arg.clone())).clone()\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `use std::fs;\nuse std::io::{self, BufRead};\n\nfn count_lines(path: &str) -> io::Result<usize> {\n    let file = fs::File::open(path)?;\n    Ok(io::BufReader::new(file).lines().count())\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `impl<T: Clone + Eq + std::hash::Hash> Iterator for UniqueIter<T> {\n    type Item = T;\n    fn next(&mut self) -> Option<T> {\n        while let Some(item) = self.inner.next() {\n            if self.seen.insert(item.clone()) {\n                return Some(item);\n            }\n        }\n        None\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `async fn fetch_json<T: serde::de::DeserializeOwned>(url: &str) -> anyhow::Result<T> {\n    let resp = reqwest::get(url).await?;\n    let data = resp.json::<T>().await?;\n    Ok(data)\n}`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `pub struct StateMachine<S, E> {\n    state: S,\n    transitions: Vec<(S, E, S)>,\n}\n\nimpl<S: Eq + Clone, E: Eq> StateMachine<S, E> {\n    pub fn transition(&mut self, event: &E) -> bool {\n        if let Some(next) = self.transitions.iter()\n            .find(|(s, e, _)| s == &self.state && e == event)\n            .map(|(_, _, next)| next.clone())\n        {\n            self.state = next;\n            true\n        } else {\n            false\n        }\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `pub trait Middleware<Req, Res>: Send + Sync {\n    fn handle(\n        &self,\n        req: Req,\n        next: Box<dyn Fn(Req) -> Res + Send>,\n    ) -> Res;\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `use std::pin::Pin;\nuse std::future::Future;\n\npub fn boxed_future<T: 'static>(\n    f: impl Future<Output = T> + Send + 'static,\n) -> Pin<Box<dyn Future<Output = T> + Send>> {\n    Box::pin(f)\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `pub trait Component: Send + Sync + 'static {}\npub type ComponentId = std::any::TypeId;\n\npub struct World {\n    components: std::collections::HashMap<ComponentId, Box<dyn std::any::Any + Send + Sync>>,\n}\n\nimpl World {\n    pub fn insert<C: Component>(&mut self, c: C) {\n        self.components.insert(ComponentId::of::<C>(), Box::new(c));\n    }\n    pub fn get<C: Component>(&self) -> Option<&C> {\n        self.components.get(&ComponentId::of::<C>())?.downcast_ref()\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `fn merge_sorted<T: Ord>(a: &[T], b: &[T]) -> Vec<T> where T: Clone {\n    let (mut i, mut j) = (0, 0);\n    let mut result = Vec::with_capacity(a.len() + b.len());\n    while i < a.len() && j < b.len() {\n        if a[i] <= b[j] { result.push(a[i].clone()); i += 1; }\n        else { result.push(b[j].clone()); j += 1; }\n    }\n    result.extend_from_slice(&a[i..]);\n    result.extend_from_slice(&b[j..]);\n    result\n}`,
  },
];
