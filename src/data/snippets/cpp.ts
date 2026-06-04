import { SnippetEntry } from './javascript';

export const cppSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `int add(int a, int b) {\n    return a + b;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `bool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `#include <vector>\n#include <algorithm>\n\nstd::vector<int> nums = {3, 1, 4, 1, 5};\nstd::sort(nums.begin(), nums.end());`,
  },
  {
    difficulty: 'Beginner',
    code: `class Rectangle {\npublic:\n    int width, height;\n    Rectangle(int w, int h) : width(w), height(h) {}\n    int area() const { return width * height; }\n};`,
  },
  {
    difficulty: 'Beginner',
    code: `#include <string>\n\nstd::string greet(const std::string& name) {\n    return "Hello, " + name + "!";\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `for (int i = 1; i <= 10; i++) {\n    std::cout << i << ": " << (i * i) << "\\n";\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `#include <map>\n\nstd::map<std::string, int> scores;\nscores["Alice"] = 95;\nscores["Bob"] = 87;\nstd::cout << scores["Alice"];`,
  },
  {
    difficulty: 'Beginner',
    code: `int arr[] = {5, 3, 8, 1, 9};\nint n = sizeof(arr) / sizeof(arr[0]);\nint sum = 0;\nfor (int i = 0; i < n; i++) sum += arr[i];`,
  },
  {
    difficulty: 'Beginner',
    code: `bool isEven(int n) {\n    return n % 2 == 0;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `#include <iostream>\n#include <string>\n\nstd::string reverse(std::string s) {\n    std::reverse(s.begin(), s.end());\n    return s;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `try {\n    throw std::runtime_error("Something went wrong");\n} catch (const std::exception& e) {\n    std::cerr << "Error: " << e.what() << "\\n";\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `struct Point {\n    double x, y;\n};\n\ndouble distance(Point a, Point b) {\n    return std::sqrt(std::pow(a.x - b.x, 2) + std::pow(a.y - b.y, 2));\n}`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `template <typename T>\nT myMax(T x, T y) {\n    return (x > y) ? x : y;\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `std::unique_ptr<int[]> arr = std::make_unique<int[]>(10);\nfor (int i = 0; i < 10; i++) {\n    arr[i] = i * i;\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `template <typename Container>\nauto sum(const Container& c) -> typename Container::value_type {\n    return std::accumulate(c.begin(), c.end(),\n        typename Container::value_type{});\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `class Singleton {\npublic:\n    static Singleton& instance() {\n        static Singleton inst;\n        return inst;\n    }\nprivate:\n    Singleton() = default;\n    Singleton(const Singleton&) = delete;\n    Singleton& operator=(const Singleton&) = delete;\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `auto numbers = std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\nauto evens = numbers\n    | std::views::filter([](int n) { return n % 2 == 0; })\n    | std::views::transform([](int n) { return n * n; });`,
  },
  {
    difficulty: 'Intermediate',
    code: `template <typename T>\nclass Stack {\n    std::vector<T> data;\npublic:\n    void push(T item) { data.push_back(std::move(item)); }\n    T pop() {\n        T item = std::move(data.back());\n        data.pop_back();\n        return item;\n    }\n    bool empty() const { return data.empty(); }\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `void thread_safe_increment(std::atomic<int>& counter, int times) {\n    for (int i = 0; i < times; ++i) {\n        counter.fetch_add(1, std::memory_order_relaxed);\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `class RAII {\n    FILE* file;\npublic:\n    explicit RAII(const char* name) : file(fopen(name, "r")) {\n        if (!file) throw std::runtime_error("Cannot open file");\n    }\n    ~RAII() { if (file) fclose(file); }\n    RAII(const RAII&) = delete;\n    RAII& operator=(const RAII&) = delete;\n};`,
  },
  {
    difficulty: 'Intermediate',
    code: `template <typename F>\nauto memoize(F f) {\n    std::unordered_map<decltype(f(0)), decltype(f(0))> cache;\n    return [=](auto arg) mutable {\n        auto it = cache.find(arg);\n        if (it != cache.end()) return it->second;\n        return cache[arg] = f(arg);\n    };\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `#include <future>\n\nstd::future<int> asyncSquare(int n) {\n    return std::async(std::launch::async, [n]() {\n        std::this_thread::sleep_for(std::chrono::milliseconds(100));\n        return n * n;\n    });\n}`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `template <typename T>\nclass Result {\n    std::variant<T, std::exception_ptr> data;\npublic:\n    static Result ok(T v)  { return Result{std::move(v)}; }\n    static Result err(std::exception_ptr e) { return Result{e}; }\n    bool is_ok() const { return std::holds_alternative<T>(data); }\n    T& value() { return std::get<T>(data); }\n};`,
  },
  {
    difficulty: 'Advanced',
    code: `template <typename... Ts>\nstruct Overloaded : Ts... { using Ts::operator()...; };\ntemplate <typename... Ts> Overloaded(Ts...) -> Overloaded<Ts...>;\n\nstd::variant<int, float, std::string> v = 42;\nstd::visit(Overloaded{\n    [](int i)         { std::cout << "int: " << i; },\n    [](float f)       { std::cout << "float: " << f; },\n    [](std::string s) { std::cout << "string: " << s; },\n}, v);`,
  },
  {
    difficulty: 'Advanced',
    code: `template <typename T, std::size_t N>\nconstexpr std::array<T, N> make_iota() {\n    std::array<T, N> arr{};\n    for (std::size_t i = 0; i < N; i++) arr[i] = static_cast<T>(i);\n    return arr;\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `void thread_func() {\n    std::unique_lock<std::mutex> lock(cv_mutex);\n    cv.wait(lock, [] { return data_ready; });\n    process_data();\n    data_ready = false;\n    cv.notify_all();\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `template <typename Head, typename... Tail>\nstruct TypeList {\n    using head = Head;\n    using tail = TypeList<Tail...>;\n    static constexpr std::size_t size = 1 + sizeof...(Tail);\n};\n\ntemplate <typename T>\nstruct TypeList<T> {\n    using head = T;\n    static constexpr std::size_t size = 1;\n};`,
  },
];
