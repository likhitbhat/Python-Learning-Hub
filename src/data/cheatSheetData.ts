import type { CheatSheetTopic } from '../types';

export const CHEAT_SHEET_DATA: CheatSheetTopic[] = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    iconName: 'Snake',
    tables: [
      {
        categoryTitle: 'ARITHMETIC',
        items: [
          { operatorOrConcept: '+ - * / // % **', description: 'Standard math operations', example: '7 // 2 → 3 | 7 % 2 → 1 | 2**8 → 256' },
          { operatorOrConcept: 'divmod(a, b)', description: 'Returns (quotient, remainder)', example: 'divmod(7, 2) → (3, 1)' },
          { operatorOrConcept: 'abs(x) & round(x, n)', description: 'Absolute value & rounding', example: 'abs(-5) → 5 | round(3.1415, 2) → 3.14' }
        ]
      },
      {
        categoryTitle: 'COMPARISON',
        items: [
          { operatorOrConcept: '== != > < >= <=', description: 'Value comparison operators', example: 'Returns True or False' },
          { operatorOrConcept: '5 == 5', description: 'Checks equality', example: 'True' },
          { operatorOrConcept: '5 != 3', description: 'Checks inequality', example: 'True' }
        ]
      },
      {
        categoryTitle: 'LOGICAL',
        items: [
          { operatorOrConcept: 'and or not', description: 'Boolean logical operators', example: 'True and False → False' },
          { operatorOrConcept: 'True or False', description: 'Logical OR operation', example: 'True' },
          { operatorOrConcept: 'not True', description: 'Logical negation', example: 'False' }
        ]
      },
      {
        categoryTitle: 'ASSIGNMENT',
        items: [
          { operatorOrConcept: '= += -= *= /= //= %= **=', description: 'Compound assignment operators', example: 'a += 5 → a = a + 5' },
          { operatorOrConcept: 'a, b = b, a', description: 'In-place variable swap', example: 'Swaps a and b without temporary variable' },
          { operatorOrConcept: 'a **= 2', description: 'In-place exponentiation', example: 'a = a ** 2' }
        ]
      }
    ],
    interviewTips: [
      'Python is case-sensitive: Age, age, AGE are completely different variables.',
      'Use // (floor division) frequently in DSA — e.g. finding mid index: mid = (low + high) // 2.',
      'a, b = b, a swaps two variables in one line — no temp variable needed!',
      'is checks object identity in memory; == checks value equality.'
    ]
  },
  {
    id: 'conditions-loops',
    title: 'Conditions & Loops',
    iconName: 'Repeat',
    tables: [
      {
        categoryTitle: 'CONTROL FLOW',
        items: [
          { operatorOrConcept: 'if / elif / else', description: 'Conditional branching', example: 'if x > 0: print("Pos") elif x == 0: print("Zero")' },
          { operatorOrConcept: 'Ternary Operator', description: 'Inline conditional statement', example: 'val = "Even" if x % 2 == 0 else "Odd"' }
        ]
      },
      {
        categoryTitle: 'ITERATION',
        items: [
          { operatorOrConcept: 'for item in iterable:', description: 'For loop over sequences', example: 'for char in "python": print(char)' },
          { operatorOrConcept: 'enumerate(list)', description: 'Loop with index & value', example: 'for idx, val in enumerate(["a", "b"]):' },
          { operatorOrConcept: 'range(start, stop, step)', description: 'Generates arithmetic sequence', example: 'list(range(0, 10, 2)) → [0, 2, 4, 6, 8]' }
        ]
      }
    ],
    interviewTips: [
      'Loop else block executes ONLY if the loop completes without encountering a break statement.',
      'Use enumerate() instead of range(len(lst)) for cleaner, Pythonic code in interviews.',
      'pass is a no-op placeholder; break exits loop; continue skips to next iteration.'
    ]
  },
  {
    id: 'functions-recursion',
    title: 'Functions',
    iconName: 'Wrench',
    tables: [
      {
        categoryTitle: 'ARGUMENTS & RETURNS',
        items: [
          { operatorOrConcept: 'def func(a, b=10):', description: 'Default arguments', example: 'b defaults to 10 if omitted' },
          { operatorOrConcept: '*args', description: 'Positional arguments tuple', example: 'def fn(*args): sum(args)' },
          { operatorOrConcept: '**kwargs', description: 'Keyword arguments dictionary', example: 'def fn(**kwargs): kwargs.get("key")' }
        ]
      },
      {
        categoryTitle: 'LAMBDA & RECURSION',
        items: [
          { operatorOrConcept: 'lambda x: x * 2', description: 'Anonymous inline function', example: 'sorted(pts, key=lambda p: p[1])' },
          { operatorOrConcept: 'Base Case', description: 'Essential stopping condition in recursion', example: 'if n <= 1: return 1' }
        ]
      }
    ],
    interviewTips: [
      'NEVER use mutable objects (list [], dict {}) as default argument values in functions.',
      'Lambda functions are single-expression anonymous functions useful in sort keys and map/filter.',
      'Every recursive algorithm MUST define a clear base case to avoid stack overflow.'
    ]
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    iconName: 'Database',
    tables: [
      {
        categoryTitle: 'LISTS & TUPLES',
        items: [
          { operatorOrConcept: 'List [1, 2, 3]', description: 'Mutable ordered sequence', example: 'lst.append(4) | lst.pop()' },
          { operatorOrConcept: 'Tuple (1, 2, 3)', description: 'Immutable ordered sequence', example: 'Used for fixed record tuples or dict keys' }
        ]
      },
      {
        categoryTitle: 'DICTS & SETS',
        items: [
          { operatorOrConcept: 'Dict {"a": 1}', description: 'Key-value hash table', example: 'd.get("key", default_val)' },
          { operatorOrConcept: 'Set {1, 2, 3}', description: 'Unique unordered elements', example: 's1 & s2 (Intersection) | s1 | s2 (Union)' }
        ]
      }
    ],
    interviewTips: [
      'Dictionary lookup and set in checks run in O(1) average time complexity.',
      'Lists are dynamic arrays in CPython with O(1) append and O(N) insertion/deletion at index 0.',
      'Tuple immutability allows them to be used as Dictionary keys and Set elements.'
    ]
  },
  {
    id: 'dsa-complexity',
    title: 'DSA & Complexity',
    iconName: 'Zap',
    tables: [
      {
        categoryTitle: 'BIG-O COMPLEXITY',
        items: [
          { operatorOrConcept: 'O(1)', description: 'Constant Time', example: 'Array index access, Dict get' },
          { operatorOrConcept: 'O(log N)', description: 'Logarithmic Time', example: 'Binary Search in sorted array' },
          { operatorOrConcept: 'O(N)', description: 'Linear Time', example: 'Single loop over array' },
          { operatorOrConcept: 'O(N log N)', description: 'Linearithmic Time', example: 'Python sorted() Timsort algorithm' }
        ]
      }
    ],
    interviewTips: [
      'Space complexity includes auxiliary stack space used by recursion.',
      'Two-pointer approach and sliding window technique often reduce O(N^2) problems to O(N).'
    ]
  },
  {
    id: 'oop-interview',
    title: 'OOP & Interview',
    iconName: 'Target',
    tables: [
      {
        categoryTitle: 'OOP PILLARS',
        items: [
          { operatorOrConcept: 'Encapsulation', description: 'Hiding internal state', example: 'Use _protected or __private variables' },
          { operatorOrConcept: 'Inheritance', description: 'Child class inheriting Parent', example: 'class Child(Parent): super().__init__()' },
          { operatorOrConcept: 'Polymorphism', description: 'Common interface for different types', example: 'Overriding parent methods in child' }
        ]
      },
      {
        categoryTitle: 'DUNDER METHODS',
        items: [
          { operatorOrConcept: '__init__(self)', description: 'Constructor method', example: 'Initializes instance attributes' },
          { operatorOrConcept: '__str__(self)', description: 'User string representation', example: 'Called by print(obj) and str(obj)' },
          { operatorOrConcept: '__repr__(self)', description: 'Developer representation', example: 'Called in interactive shell or repr(obj)' },
          { operatorOrConcept: '__len__(self)', description: 'Length hook', example: 'Called by len(obj)' }
        ]
      }
    ],
    interviewTips: [
      'super().__init__() calls the parent class constructor method.',
      'Python uses C3 Linearization algorithm for Multiple Inheritance method resolution order (MRO).'
    ]
  }
];
