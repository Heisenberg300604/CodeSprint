import { SnippetEntry } from './javascript';

export const javaSnippets: SnippetEntry[] = [
  // --- BEGINNER ---
  {
    difficulty: 'Beginner',
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `public int add(int a, int b) {\n    return a + b;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `public boolean isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `int[] numbers = {5, 3, 8, 1, 9};\nArrays.sort(numbers);\nSystem.out.println(Arrays.toString(numbers));`,
  },
  {
    difficulty: 'Beginner',
    code: `public String reverse(String str) {\n    return new StringBuilder(str).reverse().toString();\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `class Rectangle {\n    private int width, height;\n    public Rectangle(int w, int h) {\n        this.width = w;\n        this.height = h;\n    }\n    public int area() { return width * height; }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `for (int i = 1; i <= 10; i++) {\n    System.out.println(i + ": " + (i * i));\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `public int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `List<String> names = new ArrayList<>();\nnames.add("Alice");\nnames.add("Bob");\nCollections.sort(names);\nSystem.out.println(names);`,
  },
  {
    difficulty: 'Beginner',
    code: `Map<String, Integer> scores = new HashMap<>();\nscores.put("Alice", 95);\nscores.put("Bob", 87);\nSystem.out.println(scores.get("Alice"));`,
  },
  {
    difficulty: 'Beginner',
    code: `try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Error: " + e.getMessage());\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `public class Counter {\n    private int count = 0;\n    public void increment() { count++; }\n    public int getCount() { return count; }\n}`,
  },
  {
    difficulty: 'Beginner',
    code: `String text = "Hello World";\nSystem.out.println(text.toUpperCase());\nSystem.out.println(text.length());`,
  },
  {
    difficulty: 'Beginner',
    code: `int[] arr = {3, 1, 4, 1, 5, 9};\nint sum = 0;\nfor (int n : arr) sum += n;\nSystem.out.println("Sum: " + sum);`,
  },
  {
    difficulty: 'Beginner',
    code: `public boolean isEven(int n) {\n    return n % 2 == 0;\n}`,
  },

  // --- INTERMEDIATE ---
  {
    difficulty: 'Intermediate',
    code: `List<String> names = users.stream()\n    .filter(u -> u.getAge() > 18)\n    .map(User::getName)\n    .sorted()\n    .collect(Collectors.toList());`,
  },
  {
    difficulty: 'Intermediate',
    code: `public interface Repository<T, ID> {\n    Optional<T> findById(ID id);\n    T save(T entity);\n    void delete(ID id);\n    List<T> findAll();\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `public class Builder {\n    private String name;\n    private int age;\n    public Builder name(String n) { this.name = n; return this; }\n    public Builder age(int a) { this.age = a; return this; }\n    public User build() { return new User(name, age); }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `Optional<String> opt = Optional.of("hello")\n    .filter(s -> s.length() > 3)\n    .map(String::toUpperCase);\nopt.ifPresent(System.out::println);`,
  },
  {
    difficulty: 'Intermediate',
    code: `public class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> e) {\n        return size() > capacity;\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `public <T> CompletableFuture<T> retry(Supplier<T> task, int times) {\n    return CompletableFuture.supplyAsync(task)\n        .exceptionally(e -> times > 0 ? retry(task, times - 1).join() : null);\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `public enum Status {\n    PENDING, ACTIVE, INACTIVE;\n\n    public boolean isActive() {\n        return this == ACTIVE;\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `Map<String, Long> wordCount = Arrays.stream(text.split("\\\\s+"))\n    .collect(Collectors.groupingBy(\n        Function.identity(),\n        Collectors.counting()\n    ));`,
  },
  {
    difficulty: 'Intermediate',
    code: `public class EventBus {\n    private final Map<Class<?>, List<Consumer<Object>>> listeners = new ConcurrentHashMap<>();\n    public <T> void subscribe(Class<T> type, Consumer<T> listener) {\n        listeners.computeIfAbsent(type, k -> new ArrayList<>()).add(e -> listener.accept(type.cast(e)));\n    }\n}`,
  },
  {
    difficulty: 'Intermediate',
    code: `List<Integer> nums = IntStream.rangeClosed(1, 10)\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * n)\n    .boxed()\n    .collect(Collectors.toList());`,
  },

  // --- ADVANCED ---
  {
    difficulty: 'Advanced',
    code: `public class Result<T> {\n    private final T value;\n    private final Throwable error;\n    private Result(T v, Throwable e) { this.value = v; this.error = e; }\n    public static <T> Result<T> ok(T v) { return new Result<>(v, null); }\n    public static <T> Result<T> err(Throwable e) { return new Result<>(null, e); }\n    public boolean isOk() { return error == null; }\n    public T get() { if (!isOk()) throw new RuntimeException(error); return value; }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `@FunctionalInterface\npublic interface ThrowingSupplier<T> {\n    T get() throws Exception;\n\n    static <T> T unchecked(ThrowingSupplier<T> supplier) {\n        try { return supplier.get(); }\n        catch (Exception e) { throw new RuntimeException(e); }\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `public synchronized void produce() throws InterruptedException {\n    while (buffer.size() == capacity) {\n        wait();\n    }\n    buffer.add(nextItem());\n    notifyAll();\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `public class Proxy<T> implements InvocationHandler {\n    private final T target;\n    public Proxy(T target) { this.target = target; }\n    @Override\n    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {\n        System.out.println("Before: " + method.getName());\n        Object result = method.invoke(target, args);\n        System.out.println("After: " + method.getName());\n        return result;\n    }\n}`,
  },
  {
    difficulty: 'Advanced',
    code: `public <T> T deserialize(String json, Class<T> type) {\n    return objectMapper.readValue(json, type);\n}\n\npublic <T> List<T> deserializeList(String json, Class<T> elementType) {\n    JavaType listType = objectMapper.getTypeFactory()\n        .constructCollectionType(List.class, elementType);\n    return objectMapper.readValue(json, listType);\n}`,
  },
];
