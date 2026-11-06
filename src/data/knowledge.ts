import type { KnowledgeEntry } from '@/types';

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ---------- JAVA ----------
  {
    id: 'java-jvm',
    subject: 'java',
    question: 'What is the JVM?',
    keywords: ['jvm', 'java virtual machine', 'bytecode', 'platform independent', 'write once run anywhere'],
    answer:
      'The Java Virtual Machine (JVM) is an abstract machine that executes Java bytecode. It is what makes Java platform-independent: you compile Java source to bytecode (.class files) once, and the JVM on any platform interprets or JIT-compiles that bytecode into native instructions. The JVM handles memory management and garbage collection at runtime.',
    references: ['JVM Specification', 'Oracle Java Docs'],
  },
  {
    id: 'java-oop',
    subject: 'java',
    question: 'What are the four pillars of OOP?',
    keywords: ['oop', 'object oriented', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'four pillars'],
    answer:
      'The four pillars of object-oriented programming are:\n1. Encapsulation — bundling data and methods together and restricting direct access via private fields and accessors.\n2. Inheritance — a subclass reuses and extends behavior from a parent class (extends in Java).\n3. Polymorphism — the same interface can take many forms; method overloading (compile-time) and overriding (runtime) via dynamic dispatch.\n4. Abstraction — exposing essential behavior while hiding implementation details using abstract classes and interfaces.',
  },
  {
    id: 'java-interface-abstract',
    subject: 'java',
    question: 'Difference between abstract class and interface?',
    keywords: ['abstract class', 'interface', 'difference', 'abstract vs interface'],
    answer:
      'An abstract class can have both implemented and abstract methods, instance fields, and constructors, and a class can extend only one. An interface (pre-Java 8) had only abstract method signatures and constants; since Java 8 it supports default and static methods, and Java 16 added sealed/private interface methods. A class can implement multiple interfaces, which is why interfaces are preferred for defining capabilities across unrelated classes.',
  },
  {
    id: 'java-gc',
    subject: 'java',
    question: 'How does garbage collection work in Java?',
    keywords: ['garbage collection', 'gc', 'memory', 'heap', 'finalize', 'mark and sweep'],
    answer:
      "Garbage collection automatically frees memory occupied by objects no longer referenced by the program. The JVM typically uses a generational, mark-and-sweep style collector: it divides the heap into young and old generations, identifies live objects by tracing from GC roots, and reclaims unreachable ones. Modern collectors like G1 (default since Java 9) and ZGC aim for low pause times. You can suggest a cycle with System.gc() but it's not guaranteed.",
  },

  // ---------- PYTHON ----------
  {
    id: 'py-interpreted',
    subject: 'python',
    question: 'Is Python compiled or interpreted?',
    keywords: ['interpreted', 'compiled', 'cpython', 'bytecode', 'pyc'],
    answer:
      'Python is both. CPython first compiles source code to intermediate bytecode (.pyc files stored in __pycache__) and then executes that bytecode on the Python virtual machine. So it is compiled to bytecode and then interpreted — this is why people commonly call Python an interpreted language, even though there is an explicit compile step.',
  },
  {
    id: 'py-list-tuple',
    subject: 'python',
    question: 'Difference between a list and a tuple?',
    keywords: ['list', 'tuple', 'difference', 'mutable', 'immutable'],
    answer:
      'A list is mutable — you can add, remove, or change elements after creation — and is written with square brackets []. A tuple is immutable and written with parentheses (). Because tuples cannot change, they are hashable (when their elements are), slightly more memory-efficient, and commonly used for fixed records and as dictionary keys. Lists are better when the collection will grow or change.',
  },
  {
    id: 'py-decorator',
    subject: 'python',
    question: 'What is a decorator in Python?',
    keywords: ['decorator', '@', 'wrapper', 'higher order function'],
    answer:
      'A decorator is a function that takes another function (or class) and returns a replacement, extending its behavior without modifying the original. You apply it with the @decorator syntax above the target. Under the hood, @decorator above def f(): ... is equivalent to f = decorator(f). Decorators are widely used for logging, caching (functools.cache), and web routing (Flask @app.route).',
  },
  {
    id: 'py-gil',
    subject: 'python',
    question: 'What is the GIL?',
    keywords: ['gil', 'global interpreter lock', 'threading', 'concurrency', 'multithreading'],
    answer:
      "The Global Interpreter Lock (GIL) is a mutex in CPython that ensures only one thread executes Python bytecode at a time. It simplifies reference-counted memory management but limits true CPU parallelism in multi-threaded Python programs. I/O-bound code still benefits from threads (the GIL is released during I/O), and CPU-bound work uses the multiprocessing module to run separate interpreters in parallel. PEP 703 proposes making the GIL optional in future CPython.",
  },

  // ---------- DBMS ----------
  {
    id: 'dbms-acid',
    subject: 'dbms',
    question: 'What are ACID properties?',
    keywords: ['acid', 'transaction', 'atomicity', 'consistency', 'isolation', 'durability'],
    answer:
      'ACID describes guarantees a reliable transaction should provide:\n- Atomicity — all operations in a transaction succeed or none do (all-or-nothing).\n- Consistency — a transaction moves the database from one valid state to another, respecting constraints.\n- Isolation — concurrent transactions appear to execute serially; intermediate states are not visible to others.\n- Durability — once committed, changes survive crashes and power loss (typically via a write-ahead log).',
  },
  {
    id: 'dbms-normalization',
    subject: 'dbms',
    question: 'What is normalization and its normal forms?',
    keywords: ['normalization', 'normal form', '1nf', '2nf', '3nf', 'bcnf', 'anomaly'],
    answer:
      'Normalization organizes tables to reduce redundancy and avoid insertion, update, and deletion anomalies. Key forms:\n- 1NF: atomic values, no repeating groups.\n- 2NF: 1NF + no partial dependency on a composite key.\n- 3NF: 2NF + no transitive dependency (non-key attributes depend only on the key).\n- BCNF: a stronger 3NF where every determinant is a candidate key.\nTrade-off: heavy normalization adds joins; denormalization is sometimes used in analytics/OLAP.',
  },
  {
    id: 'dbms-join',
    subject: 'dbms',
    question: 'What are the different types of joins in SQL?',
    keywords: ['join', 'inner join', 'left join', 'right join', 'full join', 'cross join', 'sql'],
    answer:
      'SQL joins combine rows from two tables based on a related column:\n- INNER JOIN: only matching rows from both.\n- LEFT (OUTER) JOIN: all left rows + matches; NULLs where no match.\n- RIGHT (OUTER) JOIN: all right rows + matches.\n- FULL OUTER JOIN: all rows from both; NULLs where no match.\n- CROSS JOIN: Cartesian product of both tables.\n- SELF JOIN: a table joined with itself using aliases.',
  },
  {
    id: 'dbms-index',
    subject: 'dbms',
    question: 'What is a database index and when should you use one?',
    keywords: ['index', 'b-tree', 'hash index', 'performance', 'query optimization'],
    answer:
      "An index is a secondary data structure (commonly a B-tree or hash) that lets the database find rows quickly without scanning the whole table. Use indexes on columns used in WHERE, JOIN, and ORDER BY clauses and on foreign keys. Cost: indexes add storage and slow down INSERT/UPDATE/DELETE because the index must be maintained. Over-indexing hurts write performance, so index the hot query paths, not every column.",
  },

  // ---------- OS ----------
  {
    id: 'os-process-thread',
    subject: 'os',
    question: 'Difference between a process and a thread?',
    keywords: ['process', 'thread', 'difference', 'context switch', 'shared memory'],
    answer:
      'A process is an instance of a running program with its own memory space (code, data, heap, stack) and resources. A thread is the smallest unit of execution within a process; threads of the same process share code, heap, and OS resources but have their own program counter, registers, and stack. Context switching between threads of the same process is cheaper than between processes because memory does not need to be remapped.',
  },
  {
    id: 'os-deadlock',
    subject: 'os',
    question: 'What are the conditions for deadlock?',
    keywords: ['deadlock', 'coffman', 'mutual exclusion', 'hold and wait', 'no preemption', 'circular wait'],
    answer:
      'A deadlock requires all four Coffman conditions to hold simultaneously:\n1. Mutual exclusion — a resource cannot be shared.\n2. Hold and wait — a process holds resources while waiting for others.\n3. No preemption — resources are released only voluntarily.\n4. Circular wait — a cycle exists in the resource allocation graph.\nBreak any one condition to prevent deadlock (e.g., resource ordering breaks circular wait).',
  },
  {
    id: 'os-scheduling',
    subject: 'os',
    question: 'What are common CPU scheduling algorithms?',
    keywords: ['scheduling', 'fcfs', 'sjf', 'round robin', 'priority', 'scheduling algorithm'],
    answer:
      'Common CPU scheduling algorithms:\n- FCFS (First-Come, First-Served): simple, non-preemptive, can cause long waits (convoy effect).\n- SJF (Shortest Job First): minimizes average waiting time, but hard to predict burst times.\n- Round Robin: each process gets a fixed time quantum; fair and responsive.\n- Priority scheduling: highest priority first; can starve low-priority jobs (mitigated by aging).\n- Multilevel feedback queue: adapts priorities and time slices based on behavior.',
  },
  {
    id: 'os-paging',
    subject: 'os',
    question: 'What is paging and how does virtual memory work?',
    keywords: ['paging', 'virtual memory', 'page', 'frame', 'page fault', 'mmu'],
    answer:
      'Paging divides a process virtual address space into fixed-size pages and physical memory into frames of the same size. The MMU maps page numbers to frame numbers via a page table. A page fault occurs when a referenced page is not in physical memory; the OS fetches it from disk (swap) and updates the table. Paging avoids external fragmentation but can suffer internal fragmentation (last page is partially used) and TLB misses.',
  },

  // ---------- NETWORKS ----------
  {
    id: 'net-osi',
    subject: 'networks',
    question: 'What are the layers of the OSI model?',
    keywords: ['osi', 'layers', '7 layers', 'osi model'],
    answer:
      'The OSI model has 7 layers (top to bottom):\n7. Application — HTTP, FTP, DNS.\n6. Presentation — encryption, compression, encoding.\n5. Session — manages sessions and dialogues.\n4. Transport — TCP/UDP, end-to-end reliability.\n3. Network — IP routing, logical addressing.\n2. Data Link — MAC addressing, frames, switches.\n1. Physical — raw bits over the medium (cables, signals).',
  },
  {
    id: 'net-tcp-udp',
    subject: 'networks',
    question: 'Difference between TCP and UDP?',
    keywords: ['tcp', 'udp', 'difference', 'reliable', 'connection oriented', 'handshake'],
    answer:
      'TCP is connection-oriented: it establishes a connection via a three-way handshake, guarantees in-order, reliable delivery using sequence numbers and acknowledgements, and controls congestion/flow. UDP is connectionless: it sends datagrams with no guarantee of delivery, order, or duplication — but with lower overhead and latency. Use TCP for web, email, and file transfer; UDP for DNS lookups, live streaming, VoIP, and gaming.',
  },
  {
    id: 'net-dns',
    subject: 'networks',
    question: 'How does DNS resolution work?',
    keywords: ['dns', 'domain name system', 'resolution', 'resolver', 'tld', 'root'],
    answer:
      'DNS translates a domain name to an IP address. The browser asks a recursive resolver, which queries in order: root nameserver (returns the TLD server for .com), the TLD server (returns the authoritative server for example.com), and the authoritative server (returns the A/AAAA record). Results are cached at each level using TTLs to reduce future lookups. The final IP is returned to the browser, which opens a TCP connection.',
  },
  {
    id: 'net-3way',
    subject: 'networks',
    question: 'Explain the TCP three-way handshake.',
    keywords: ['three way handshake', 'syn', 'ack', 'tcp connection', 'handshake'],
    answer:
      'To establish a TCP connection, the client and server exchange three segments:\n1. SYN — client sends a synchronize segment with a random sequence number.\n2. SYN-ACK — server acknowledges and sends its own sequence number.\n3. ACK — client acknowledges the server sequence.\nAfter this, both sides agree on initial sequence numbers and the connection is established. Termination uses a four-way FIN/ACK exchange.',
  },

  // ---------- MATH ----------
  {
    id: 'mathtime-complexity',
    subject: 'math',
    question: 'What is Big-O notation?',
    keywords: ['big o', 'asymptotic', 'time complexity', 'complexity', 'growth rate'],
    answer:
      'Big-O notation describes an upper bound on the growth rate of a function as input size grows, ignoring constants and lower-order terms. It is used to compare algorithm efficiency. Examples: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic (good sorts), O(n²) quadratic (nested loops), O(2ⁿ) exponential. Big-Ω is a lower bound and Big-Θ is a tight bound; Big-O is the most commonly cited.',
  },
  {
    id: 'math-probability',
    subject: 'math',
    question: 'What is the difference between probability and statistics?',
    keywords: ['probability', 'statistics', 'difference', 'bayes'],
    answer:
      "Probability reasons forward from a known model to predict outcomes of a random experiment (P(heads)=0.5). Statistics reasons backward from observed data to infer the underlying model or parameters (estimating a coin's bias from flips). Probability is axiomatic and deductive; statistics is inductive and deals with estimation, hypothesis testing, and uncertainty over real samples.",
  },
  {
    id: 'math-matrix',
    subject: 'math',
    question: 'What is a matrix and matrix multiplication?',
    keywords: ['matrix', 'multiplication', 'linear algebra', 'rows columns', 'dimensions'],
    answer:
      'A matrix is a rectangular array of numbers arranged in rows and columns. Two matrices A (m×n) and B (n×p) can be multiplied when the number of columns of A equals the number of rows of B, producing an m×p matrix C where C[i][j] = sum over k of A[i][k] * B[k][j]. Matrix multiplication is associative and distributive but not commutative: AB ≠ BA in general. It underpins linear transformations, graphics, and neural network layers.',
  },
  {
    id: 'math-permutation',
    subject: 'math',
    question: 'Difference between permutations and combinations?',
    keywords: ['permutation', 'combination', 'npr', 'ncr', 'counting'],
    answer:
      'Both count selections from a set, but order matters in permutations and does not in combinations. Number of permutations of r items from n: P(n,r) = n!/(n-r)!. Number of combinations: C(n,r) = n!/((n-r)! r!). Example: choosing 3 committee members from 10 is C(10,3)=120 (a set); ranking the top 3 of 10 runners is P(10,3)=720 (an ordered list).',
  },

  // ---------- AI ----------
  {
    id: 'ai-ml-dl',
    subject: 'ai',
    question: 'What is the difference between AI, ML, and deep learning?',
    keywords: ['ai', 'ml', 'deep learning', 'difference', 'neural network'],
    answer:
      'AI is the broad field of building systems that perform tasks requiring human intelligence. Machine learning is a subset of AI where systems learn patterns from data instead of being explicitly programmed. Deep learning is a subset of ML that uses multi-layer (deep) neural networks, excelling at high-dimensional data like images, audio, and text. So: AI ⊃ ML ⊃ Deep Learning.',
  },
  {
    id: 'ai-supervised',
    subject: 'ai',
    question: 'What are supervised, unsupervised, and reinforcement learning?',
    keywords: ['supervised', 'unsupervised', 'reinforcement', 'learning types', 'labels'],
    answer:
      'Supervised learning trains on labeled input-output pairs to predict outputs for new inputs (classification, regression). Unsupervised learning finds structure in unlabeled data (clustering like k-means, dimensionality reduction like PCA). Reinforcement learning trains an agent to take actions in an environment to maximize cumulative reward through trial and error (Q-learning, policy gradients).',
  },
  {
    id: 'ai-gradient',
    subject: 'ai',
    question: 'What is gradient descent?',
    keywords: ['gradient descent', 'loss', 'learning rate', 'optimization', 'sgd'],
    answer:
      'Gradient descent is an iterative optimization algorithm that minimizes a loss function by moving parameters in the direction of the negative gradient. Update rule: θ = θ - η·∇L(θ), where η is the learning rate. Variants include batch, mini-batch, and stochastic gradient descent (one sample at a time), plus momentum, RMSProp, and Adam which adapt the step size. Too large a learning rate diverges; too small converges slowly.',
  },
  {
    id: 'ai-overfitting',
    subject: 'ai',
    question: 'What is overfitting and how do you prevent it?',
    keywords: ['overfitting', 'underfitting', 'bias variance', 'regularization', 'dropout'],
    answer:
      'Overfitting occurs when a model learns training-data noise so well that it generalizes poorly to new data — high variance, low bias. Prevention techniques: more training data, simpler models, regularization (L1/L2), dropout in neural nets, early stopping, k-fold cross-validation, and data augmentation. Underfitting is the opposite: the model is too simple to capture the pattern — high bias.',
  },
];

// Quick lookup by subject for the chatbot's subject-aware fallback
export const KNOWLEDGE_BY_SUBJECT: Record<string, KnowledgeEntry[]> =
  KNOWLEDGE_BASE.reduce(
    (acc, entry) => {
      (acc[entry.subject] ||= []).push(entry);
      return acc;
    },
    {} as Record<string, KnowledgeEntry[]>,
  );
