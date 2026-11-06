import type { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ---------- JAVA ----------
  {
    id: 'j1',
    subject: 'java',
    topic: 'OOP',
    difficulty: 'easy',
    question: 'Which of the following is NOT one of the four pillars of OOP?',
    options: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism'],
    correctIndex: 2,
    explanation:
      'The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is a build step, not an OOP pillar.',
  },
  {
    id: 'j2',
    subject: 'java',
    topic: 'JVM',
    difficulty: 'medium',
    question: 'What does the JVM execute?',
    options: ['Source code directly', 'Machine code', 'Bytecode', 'Assembly'],
    correctIndex: 2,
    explanation:
      'The JVM executes Java bytecode (.class files). Source is compiled to bytecode first, then the JVM interprets or JIT-compiles it.',
  },
  {
    id: 'j3',
    subject: 'java',
    topic: 'Memory',
    difficulty: 'hard',
    question: 'Which memory area is shared among all threads of a process in Java?',
    options: ['Stack', 'PC Register', 'Heap', 'Native Method Stack'],
    correctIndex: 2,
    explanation:
      'The heap is shared across threads and holds all objects. Each thread has its own stack, PC register, and native method stack.',
  },
  {
    id: 'j4',
    subject: 'java',
    topic: 'Collections',
    difficulty: 'medium',
    question: 'Which interface allows duplicate elements and is ordered by insertion index?',
    options: ['Set', 'List', 'Map', 'Queue'],
    correctIndex: 1,
    explanation:
      'List (e.g. ArrayList, LinkedList) allows duplicates and provides index-based access. Set forbids duplicates; Map stores key-value pairs.',
  },

  // ---------- PYTHON ----------
  {
    id: 'p1',
    subject: 'python',
    topic: 'Basics',
    difficulty: 'easy',
    question: 'Which of these is an immutable data structure in Python?',
    options: ['list', 'dict', 'set', 'tuple'],
    correctIndex: 3,
    explanation: 'Tuples are immutable. Lists, dicts, and sets are all mutable.',
  },
  {
    id: 'p2',
    subject: 'python',
    topic: 'Functions',
    difficulty: 'medium',
    question: 'What does a Python decorator do?',
    options: [
      'It deletes a function',
      'It wraps a function to extend behavior without editing it',
      'It compiles a function to C',
      'It makes a function async',
    ],
    correctIndex: 1,
    explanation:
      'A decorator takes a function and returns a replacement, extending behavior. @decorator above def f is sugar for f = decorator(f).',
  },
  {
    id: 'p3',
    subject: 'python',
    topic: 'Concurrency',
    difficulty: 'hard',
    question: 'Why do CPU-bound Python threads not run in true parallel?',
    options: [
      'Python does not support threads',
      'The GIL allows only one thread to run bytecode at a time',
      'Threads share the stack',
      'Threads require root permission',
    ],
    correctIndex: 1,
    explanation:
      'The Global Interpreter Lock (GIL) in CPython serializes bytecode execution. Use multiprocessing for CPU-bound parallelism.',
  },
  {
    id: 'p4',
    subject: 'python',
    topic: 'Basics',
    difficulty: 'easy',
    question: 'How do you create a single-line comment in Python?',
    options: ['// comment', '# comment', '<!-- comment -->', '/* comment */'],
    correctIndex: 1,
    explanation: 'Python uses the # symbol for single-line comments.',
  },

  // ---------- DBMS ----------
  {
    id: 'd1',
    subject: 'dbms',
    topic: 'Transactions',
    difficulty: 'easy',
    question: 'Which ACID property guarantees that a transaction is all-or-nothing?',
    options: ['Consistency', 'Isolation', 'Atomicity', 'Durability'],
    correctIndex: 2,
    explanation: 'Atomicity ensures all operations in a transaction either all succeed or none do.',
  },
  {
    id: 'd2',
    subject: 'dbms',
    topic: 'Normalization',
    difficulty: 'medium',
    question: 'Which normal form removes transitive dependencies?',
    options: ['1NF', '2NF', '3NF', '1NF only'],
    correctIndex: 2,
    explanation: '3NF eliminates transitive dependencies where non-key attributes depend on other non-key attributes.',
  },
  {
    id: 'd3',
    subject: 'dbms',
    topic: 'SQL',
    difficulty: 'easy',
    question: 'Which JOIN returns all rows from the left table plus matched rows from the right?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctIndex: 1,
    explanation: 'LEFT JOIN returns every left-table row and matching right-table rows, with NULLs where no match exists.',
  },
  {
    id: 'd4',
    subject: 'dbms',
    topic: 'Indexing',
    difficulty: 'hard',
    question: 'What is the main trade-off of adding a database index?',
    options: [
      'Faster writes, slower reads',
      'Faster reads, slower writes and more storage',
      'No effect on writes',
      'It removes the need for a primary key',
    ],
    correctIndex: 1,
    explanation:
      'Indexes speed up reads but must be updated on every write, adding storage and write cost.',
  },

  // ---------- OS ----------
  {
    id: 'o1',
    subject: 'os',
    topic: 'Processes',
    difficulty: 'easy',
    question: 'A thread shares which of the following with other threads of the same process?',
    options: ['Stack', 'Program counter', 'Heap', 'Registers'],
    correctIndex: 2,
    explanation: 'Threads share code, heap, and OS resources, but each has its own stack, PC, and registers.',
  },
  {
    id: 'o2',
    subject: 'os',
    topic: 'Deadlocks',
    difficulty: 'medium',
    question: 'Which is NOT one of the four Coffman deadlock conditions?',
    options: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Lazy evaluation'],
    correctIndex: 3,
    explanation:
      'The four conditions are mutual exclusion, hold and wait, no preemption, and circular wait. Lazy evaluation is unrelated.',
  },
  {
    id: 'o3',
    subject: 'os',
    topic: 'Scheduling',
    difficulty: 'medium',
    question: 'Which scheduling algorithm can cause starvation of low-priority jobs?',
    options: ['Round Robin', 'FCFS', 'Priority scheduling', 'SJF (preemptive)'],
    correctIndex: 2,
    explanation:
      'Priority scheduling can starve low-priority jobs; aging (raising priority over time) is the usual fix.',
  },
  {
    id: 'o4',
    subject: 'os',
    topic: 'Memory',
    difficulty: 'hard',
    question: 'A page fault occurs when:',
    options: [
      'A program writes to a read-only page',
      'A referenced page is not present in physical memory',
      'Two pages collide in the TLB',
      'The page table overflows',
    ],
    correctIndex: 1,
    explanation:
      'A page fault happens when the CPU references a page not currently in RAM; the OS fetches it from disk/swap.',
  },

  // ---------- NETWORKS ----------
  {
    id: 'n1',
    subject: 'networks',
    topic: 'OSI Model',
    difficulty: 'easy',
    question: 'How many layers does the OSI model have?',
    options: ['4', '5', '7', '8'],
    correctIndex: 2,
    explanation: 'The OSI model has 7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.',
  },
  {
    id: 'n2',
    subject: 'networks',
    topic: 'Protocols',
    difficulty: 'medium',
    question: 'Which transport protocol guarantees reliable, ordered delivery?',
    options: ['UDP', 'TCP', 'ICMP', 'ARP'],
    correctIndex: 1,
    explanation: 'TCP uses sequence numbers, ACKs, and retransmission to guarantee reliable, in-order delivery. UDP does not.',
  },
  {
    id: 'n3',
    subject: 'networks',
    topic: 'DNS',
    difficulty: 'medium',
    question: 'Which server holds the authoritative records for a specific domain?',
    options: ['Root server', 'TLD server', 'Recursive resolver', 'Authoritative nameserver'],
    correctIndex: 3,
    explanation:
      'The authoritative nameserver stores the actual DNS records for the domain; resolvers query it last.',
  },
  {
    id: 'n4',
    subject: 'networks',
    topic: 'Handshake',
    difficulty: 'hard',
    question: 'In the TCP three-way handshake, the second segment contains which flags?',
    options: ['SYN', 'ACK', 'SYN + ACK', 'FIN'],
    correctIndex: 2,
    explanation:
      'The server responds with SYN+ACK, acknowledging the client SYN and sending its own sequence number.',
  },

  // ---------- MATH ----------
  {
    id: 'm1',
    subject: 'math',
    topic: 'Complexity',
    difficulty: 'easy',
    question: 'Which complexity is best (grows slowest) for large inputs?',
    options: ['O(n²)', 'O(n log n)', 'O(log n)', 'O(n)'],
    correctIndex: 2,
    explanation: 'O(log n) grows slowest among these, so it scales best for large inputs.',
  },
  {
    id: 'm2',
    subject: 'math',
    topic: 'Counting',
    difficulty: 'medium',
    question: 'How many ways can you choose 2 items from 4 without regard to order?',
    options: ['6', '12', '8', '4'],
    correctIndex: 0,
    explanation: 'C(4,2) = 4!/(2!·2!) = 6. Order does not matter for combinations.',
  },
  {
    id: 'm3',
    subject: 'math',
    topic: 'Linear Algebra',
    difficulty: 'hard',
    question: 'When can two matrices A (m×n) and B (p×q) be multiplied as A·B?',
    options: ['m = q', 'n = p', 'm = p', 'n = q'],
    correctIndex: 1,
    explanation:
      'For A·B, the number of columns of A (n) must equal the number of rows of B (p). The result is m×q.',
  },
  {
    id: 'm4',
    subject: 'math',
    topic: 'Probability',
    difficulty: 'medium',
    question: 'Two fair coins are tossed. What is the probability of getting at least one head?',
    options: ['1/4', '1/2', '3/4', '1'],
    correctIndex: 2,
    explanation:
      'P(at least one head) = 1 - P(no heads) = 1 - 1/4 = 3/4.',
  },

  // ---------- AI ----------
  {
    id: 'a1',
    subject: 'ai',
    topic: 'Fundamentals',
    difficulty: 'easy',
    question: 'Which is the correct nesting relationship?',
    options: [
      'ML ⊃ AI ⊃ Deep Learning',
      'AI ⊃ ML ⊃ Deep Learning',
      'Deep Learning ⊃ AI ⊃ ML',
      'AI = ML = Deep Learning',
    ],
    correctIndex: 1,
    explanation: 'AI is the broadest field; ML is a subset of AI; Deep Learning is a subset of ML.',
  },
  {
    id: 'a2',
    subject: 'ai',
    topic: 'Learning Types',
    difficulty: 'medium',
    question: 'Training an agent to maximize reward through trial and error is called:',
    options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Transfer learning'],
    correctIndex: 2,
    explanation:
      'Reinforcement learning trains an agent via rewards from an environment through trial and error.',
  },
  {
    id: 'a3',
    subject: 'ai',
    topic: 'Optimization',
    difficulty: 'hard',
    question: 'In gradient descent, what does the learning rate control?',
    options: [
      'The number of layers',
      'The size of each parameter update step',
      'The size of the dataset',
      'The activation function',
    ],
    correctIndex: 1,
    explanation:
      'The learning rate η scales the gradient: θ = θ - η·∇L. Too large diverges, too small converges slowly.',
  },
  {
    id: 'a4',
    subject: 'ai',
    topic: 'Generalization',
    difficulty: 'medium',
    question: 'A model that performs well on training data but poorly on test data is:',
    options: ['Underfitting', 'Overfitting', 'Well regularized', 'Converged'],
    correctIndex: 1,
    explanation:
      'Overfitting means the model memorized training data and noise, failing to generalize to unseen data.',
  },
];
