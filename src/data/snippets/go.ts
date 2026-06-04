import { SnippetEntry } from './javascript';

export const goSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `package main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `func add(a, b int) int {\n    return a + b\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `func isEven(n int) bool {\n    return n%2 == 0\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `numbers := []int{3, 1, 4, 1, 5, 9}\nfor _, n := range numbers {\n    fmt.Println(n)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `func factorial(n int) int {\n    if n <= 1 {\n        return 1\n    }\n    return n * factorial(n-1)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `scores := map[string]int{\n    "Alice": 95,\n    "Bob":   87,\n}\nfmt.Println(scores["Alice"])`,
  },
  {
    difficulty: 'Beginner',
    code: `func reverseString(s string) string {\n    runes := []rune(s)\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `func fibonacci(n int) int {\n    if n <= 1 {\n        return n\n    }\n    return fibonacci(n-1) + fibonacci(n-2)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `type Rectangle struct {\n    Width  float64\n    Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `nums := []int{5, 3, 8, 1, 9, 2}\nsort.Ints(nums)\nfmt.Println(nums)`,
  },
  {
    difficulty: 'Beginner',
    code: `for i := 1; i <= 5; i++ {\n    fmt.Printf("%d squared is %d\\n", i, i*i)\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `func max(a, b int) int {\n    if a > b {\n        return a\n    }\n    return b\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `s := "Hello, World!"\nfmt.Println(len(s))\nfmt.Println(strings.ToUpper(s))`,
  },
  {
    difficulty: 'Beginner',
    code: `file, err := os.Open("data.txt")\nif err != nil {\n    log.Fatal(err)\n}\ndefer file.Close()`,
  },
  {
    difficulty: 'Beginner',
    code: `func sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf("Worker %d processing %d\\n", id, j)\n        results <- j * 2\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Stack[T any] struct {\n    items []T\n}\n\nfunc (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }\nfunc (s *Stack[T]) Pop() (T, bool) {\n    var zero T\n    if len(s.items) == 0 { return zero, false }\n    item := s.items[len(s.items)-1]\n    s.items = s.items[:len(s.items)-1]\n    return item, true\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Middleware func(http.Handler) http.Handler\n\nfunc Chain(h http.Handler, middlewares ...Middleware) http.Handler {\n    for i := len(middlewares) - 1; i >= 0; i-- {\n        h = middlewares[i](h)\n    }\n    return h\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `func merge(a, b <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        defer close(out)\n        for a != nil || b != nil {\n            select {\n            case v, ok := <-a:\n                if !ok { a = nil } else { out <- v }\n            case v, ok := <-b:\n                if !ok { b = nil } else { out <- v }\n            }\n        }\n    }()\n    return out\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Option[T any] struct {\n    value T\n    valid bool\n}\n\nfunc Some[T any](v T) Option[T] { return Option[T]{v, true} }\nfunc None[T any]() Option[T]    { return Option[T]{} }\nfunc (o Option[T]) Unwrap() T  { return o.value }`,
  },
  {
    difficulty: 'Intermediate',
    code: `func retry(attempts int, sleep time.Duration, fn func() error) error {\n    for i := 0; ; i++ {\n        if err := fn(); err == nil {\n            return nil\n        } else if i >= attempts-1 {\n            return err\n        }\n        time.Sleep(sleep)\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `func Map[T, U any](s []T, f func(T) U) []U {\n    result := make([]U, len(s))\n    for i, v := range s {\n        result[i] = f(v)\n    }\n    return result\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `type Repository[T any] interface {\n    FindByID(ctx context.Context, id string) (T, error)\n    Save(ctx context.Context, entity T) error\n    Delete(ctx context.Context, id string) error\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `func memoize[K comparable, V any](f func(K) V) func(K) V {\n    cache := make(map[K]V)\n    return func(k K) V {\n        if v, ok := cache[k]; ok {\n            return v\n        }\n        v := f(k)\n        cache[k] = v\n        return v\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `func Filter[T any](s []T, pred func(T) bool) []T {\n    var result []T\n    for _, v := range s {\n        if pred(v) {\n            result = append(result, v)\n        }\n    }\n    return result\n}`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `func pipeline[T any](stages ...func(<-chan T) <-chan T) func(<-chan T) <-chan T {\n    return func(in <-chan T) <-chan T {\n        out := in\n        for _, stage := range stages {\n            out = stage(out)\n        }\n        return out\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `type EventBus struct {\n    mu       sync.RWMutex\n    handlers map[string][]func(interface{})\n}\n\nfunc (b *EventBus) Subscribe(event string, fn func(interface{})) {\n    b.mu.Lock()\n    defer b.mu.Unlock()\n    b.handlers[event] = append(b.handlers[event], fn)\n}\n\nfunc (b *EventBus) Publish(event string, data interface{}) {\n    b.mu.RLock()\n    defer b.mu.RUnlock()\n    for _, fn := range b.handlers[event] {\n        go fn(data)\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `func WithTimeout[T any](ctx context.Context, timeout time.Duration, fn func(context.Context) (T, error)) (T, error) {\n    ctx, cancel := context.WithTimeout(ctx, timeout)\n    defer cancel()\n    return fn(ctx)\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `type CircuitBreaker struct {\n    mu        sync.Mutex\n    state     string\n    failures  int\n    threshold int\n    resetAt   time.Time\n}\n\nfunc (cb *CircuitBreaker) Call(fn func() error) error {\n    cb.mu.Lock()\n    if cb.state == "open" && time.Now().Before(cb.resetAt) {\n        cb.mu.Unlock()\n        return fmt.Errorf("circuit open")\n    }\n    cb.mu.Unlock()\n    err := fn()\n    cb.mu.Lock()\n    defer cb.mu.Unlock()\n    if err != nil {\n        cb.failures++\n        if cb.failures >= cb.threshold {\n            cb.state = "open"\n            cb.resetAt = time.Now().Add(30 * time.Second)\n        }\n    } else {\n        cb.failures = 0\n        cb.state = "closed"\n    }\n    return err\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `func Reduce[T, U any](s []T, init U, fn func(U, T) U) U {\n    result := init\n    for _, v := range s {\n        result = fn(result, v)\n    }\n    return result\n}`,
  },
];
