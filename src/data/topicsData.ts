import type { Topic, TopicNotes, TopicQuiz } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Hello World, variables, user input, formatting, and how Python executes code.',
    questionCount: 10,
    theme: 'blue',
    iconName: 'Snake',
    level: 'beginner',
    xp: 100,
  },
  {
    id: 'data-types-operators',
    title: 'Data Types & Operators',
    description: 'Primitives, numeric precision, casting, precedence, bitwise & arithmetic operations.',
    questionCount: 10,
    theme: 'emerald',
    iconName: 'BarChart2',
    level: 'beginner',
    xp: 100,
  },
  {
    id: 'conditions-loops',
    title: 'Conditions & Loops',
    description: 'Control flow, ternary operators, range(), for-else loops, structural pattern matching.',
    questionCount: 10,
    theme: 'purple',
    iconName: 'Repeat',
    level: 'beginner',
    xp: 100,
  },
  {
    id: 'functions-recursion',
    title: 'Functions & Recursion',
    description: '*args, **kwargs, default argument evaluation, lambdas, tail recursion, and call stack.',
    questionCount: 10,
    theme: 'amber',
    iconName: 'Wrench',
    level: 'beginner',
    xp: 100,
  },
  {
    id: 'lists-strings',
    title: 'Lists & Strings',
    description: 'Immutability vs mutability, extended slicing, list comprehensions, and str formatting.',
    questionCount: 10,
    theme: 'cyan',
    iconName: 'List',
    level: 'intermediate',
    xp: 150,
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Dictionaries, hash tables, set operations, tuple immutability, stacks, and queues.',
    questionCount: 10,
    theme: 'rose',
    iconName: 'Database',
    level: 'intermediate',
    xp: 150,
  },
  {
    id: 'dsa-basics',
    title: 'DSA Basics',
    description: 'Big-O notation, asymptotic analysis, binary search, Timsort, space/time trade-offs.',
    questionCount: 10,
    theme: 'indigo',
    iconName: 'Zap',
    level: 'intermediate',
    xp: 150,
  },
  {
    id: 'oop-interview-prep',
    title: 'OOP & Interview Prep',
    description: 'Classes, inheritance, polymorphism, encapsulation, dunder methods, C3 MRO.',
    questionCount: 10,
    theme: 'teal',
    iconName: 'Target',
    level: 'intermediate',
    xp: 150,
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    description: 'Try-except-else-finally, custom exceptions, stack tracebacks, and error hierarchies.',
    questionCount: 10,
    theme: 'orange',
    iconName: 'ShieldAlert',
    level: 'advanced',
    xp: 200,
  },
  {
    id: 'decorators-closures',
    title: 'Decorators & Closures',
    description: 'First-class functions, lexical scopes, free variables, wrapper decorators, functools.wraps.',
    questionCount: 10,
    theme: 'violet',
    iconName: 'Package',
    level: 'advanced',
    xp: 200,
  },
  {
    id: 'generators-iterators',
    title: 'Generators & Iterators',
    description: 'Yield statement, generator expressions, iterator protocol (__iter__, __next__), lazy evaluation.',
    questionCount: 10,
    theme: 'sky',
    iconName: 'Cpu',
    level: 'advanced',
    xp: 200,
  },
  {
    id: 'context-managers',
    title: 'Context Managers',
    description: 'With statement, resource allocation, __enter__/__exit__, contextlib.contextmanager.',
    questionCount: 10,
    theme: 'lime',
    iconName: 'FolderKey',
    level: 'advanced',
    xp: 200,
  },
  {
    id: 'copy-identity-gotchas',
    title: 'Copy, Identity & Gotchas',
    description: 'Is vs ==, shallow vs deep copy, mutable default arguments, LEGB scoping rules.',
    questionCount: 10,
    theme: 'pink',
    iconName: 'Layers',
    level: 'mastery',
    xp: 250,
  },
  {
    id: 'collections-module',
    title: 'collections Module',
    description: 'Counter, defaultdict, namedtuple, deque, ChainMap, and OrderedDict internals.',
    questionCount: 10,
    theme: 'blue',
    iconName: 'Boxes',
    level: 'mastery',
    xp: 250,
  },
  {
    id: 'multithreading-gil',
    title: 'Multithreading & GIL',
    description: 'CPython GIL, threading for I/O bound tasks, multiprocessing for CPU bound, asyncio event loop.',
    questionCount: 10,
    theme: 'fuchsia',
    iconName: 'Activity',
    level: 'mastery',
    xp: 250,
  },
  {
    id: 'unit-testing',
    title: 'Unit Testing',
    description: 'Unittest framework, test discovery, assertions, pytest fixtures, and unittest.mock.',
    questionCount: 10,
    theme: 'emerald',
    iconName: 'CheckCircle2',
    level: 'mastery',
    xp: 250,
  },
];

export const NOTES_DATA: Record<string, TopicNotes> = {
  'python-basics': {
    topicId: 'python-basics',
    title: 'Python Basics',
    subtitle: 'Your very first steps into coding! Learn printing, variables, user input, and basic execution.',
    quickTopics: ['Hello World & Printing', 'Variables & Data Storage', 'User Input & Conversions', 'Under the Hood: Execution'],
    sections: [
      {
        id: 'hello-world',
        title: '1. Your First Line of Code ("Hello, World!")',
        storyNarrative: 'Imagine you just built a friendly robot helper named Py-Bot! Py-Bot is standing right in front of you, eager to speak. To make Py-Bot say its very first words out loud to the world, you just hand Py-Bot a note that says print("Hello, World!"). Py-Bot smiles, reads your note, and speaks your exact words onto the screen!',
        analogy: 'In Python, telling the computer to speak to you on screen is as simple as writing a friendly message in plain English—no complicated setup required!',
        imageUrl: '/diagrams/hello_world.png',
        visualDiagram: `+-------------------------------------------------------+
|                   YOUR FIRST CODE                     |
|                                                       |
|   print("Hello, World!")                              |
|     |         |                                       |
|     v         v                                       |
|  [Action]  [Message to Display]                       |
+-------------------------------------------------------+
                           |
                           v  (Py-Bot Speaks!)
+-------------------------------------------------------+
|  OUTPUT TERMINAL:                                     |
|  > Hello, World!                                      |
+-------------------------------------------------------+`,
        content: 'Welcome to Python! Python is famous around the world for being clean, fun, and easy to read. In older programming languages like Java or C++, printing a simple text message requires 5 to 10 lines of confusing setup code. In Python, it takes just ONE simple line using print()!\n\nThe print() function tells Python: "Take whatever is inside these parentheses and display it on the screen." Text inside quotation marks ("...") is called a String.',
        codeExample: `# Welcome to Python! Your very first line of code:
print("Hello, World!")
print("Welcome to PyLearn Notebook!")

# Python is also a super-fast calculator!
print("2 + 2 =", 2 + 2)
print("10 * 5 =", 10 * 5)`,
        commonMistakes: [
          'Forgetting quotation marks around text like print(Hello), which makes Python think Hello is a variable name.',
          'Capitalizing Print() with a capital P (Python is case-sensitive, so use lowercase print).'
        ],
        proTips: [
          'Text inside quotes (single \' or double ") is called a String.',
          'Python is case-sensitive: print is valid, but Print or PRINT will throw an error.',
          'You can print numbers and mathematical expressions directly without quotes.'
        ]
      },
      {
        id: 'variables-basics',
        title: '2. Variables — Storing & Remembering Data',
        storyNarrative: 'Imagine you are exploring a magical treasure island with Py-Bot! You find a shiny gold coin, a legendary sword, and a secret map. Py-Bot opens three colorful toy chests, places a sticky label on each box—labeled "gold", "weapon", and "location"—and tucks your treasures safely inside. Whenever you need your gold or weapon later on your journey, you just shout the label name!',
        analogy: 'Think of a variable as a labeled storage box. You place a value inside (like a name or score) and stick a label on it so you can open it whenever you need.',
        imageUrl: '/diagrams/variables.png',
        visualDiagram: `   +-------------------+       +-------------------+       +-------------------+
   |   LABEL: gold     |       |   LABEL: weapon   |       |  LABEL: location  |
   +-------------------+       +-------------------+       +-------------------+
   |  VALUE: 50        |       | VALUE: "Excalibur"|       | VALUE: "Cave A"   |
   +-------------------+       +-------------------+       +-------------------+
             |                           |                           |
             v                           v                           v
     gold = 50                 weapon = "Excalibur"        location = "Cave A"`,
        content: 'In programming, we need to save information to use later. Creating a variable in Python is as easy as choosing a name and using the equals sign (=).\n\nYou do NOT need to specify data types beforehand (like int or String)—Python is smart enough to inspect the value and determine the type automatically! When you update a variable (like score = score + 50), Python updates the value stored inside.',
        codeExample: `# Creating variables to store player information
player_name = "Alex"
player_level = 1
score = 250.5

print(f"Hero Name: {player_name}")
print(f"Current Level: {player_level}")

# Updating a variable value
score = score + 50
print(f"Updated Score: {score}")`,
        commonMistakes: [
          'Using spaces in variable names (use player_name with an underscore instead of player name).',
          'Starting variable names with numbers like 1st_place = "Gold" (variable names must start with a letter or underscore).'
        ],
        proTips: [
          'Use descriptive snake_case names for variables (e.g. user_age, total_score).',
          'f-strings (f"Hello {name}") let you easily inject variables directly into messages.'
        ]
      },
      {
        id: 'user-input',
        title: '3. Getting User Input & Interactive Programs',
        storyNarrative: 'Imagine Py-Bot is acting as a castle guard! As you approach the drawbridge, Py-Bot halts you, holds out a microphone, and asks: "Halt! Who goes there? State your name!". You speak your name into the microphone, and Py-Bot listens, remembers your answer, and lowers the drawbridge shouting: "Welcome, Sir Arthur!"',
        analogy: 'User input is like a chatbot asking "What is your name?" and waiting for you to type an answer before responding personally.',
        imageUrl: '/diagrams/user_input.png',
        visualDiagram: `+-------------------------------------------------------+
|  1. PROGRAM ASKS:  input("What is your name? ")       |
+-------------------------------------------------------+
                           |
                           v  (User types: "Arthur")
+-------------------------------------------------------+
|  2. PYTHON STORES: user_name = "Arthur"               |
+-------------------------------------------------------+
                           |
                           v  (Program responds!)
+-------------------------------------------------------+
|  3. PROGRAM PRINTS: "Nice to meet you, Arthur!"       |
+-------------------------------------------------------+`,
        content: 'Interactive programs ask users questions! Python\'s built-in input() function pauses your program, waits for the user to type a response, and returns their answer as text (String).\n\nIf you want to perform math calculations on user input (like adding 1 to their age), convert the input string into a number using int() for whole numbers or float() for decimals.',
        codeExample: `# Interactive Python Greeting
user_name = input("What is your name? ")
print(f"Nice to meet you, {user_name}!")

# Converting user input to an integer for calculations
age_input = input("How old are you? ")
age = int(age_input)
next_year_age = age + 1

print(f"Next year, you will be {next_year_age} years old!")`,
        commonMistakes: [
          'Forgetting to convert input() when doing math (e.g. "25" + 1 causes a TypeError because input() always returns text).',
          'Forgetting to store the result of input() into a variable.'
        ],
        proTips: [
          'Use int() for whole numbers and float() for decimals.',
          'Always give clear prompts inside input("Enter your name: ") so the user knows what to type.'
        ]
      },
      {
        id: 'under-the-hood',
        title: '4. Under the Hood: How Python Executes Code',
        storyNarrative: 'Ever wonder what happens inside Py-Bot\'s brain when you press "Run"? Inside Py-Bot is a master translator engine called CPython! When you write code, CPython checks your spelling, translates your words into a universal secret code called Bytecode (.pyc), and executes it line by line. Py-Bot also has a tiny cleaning robot that sweeps away unused memory!',
        analogy: 'Think of Python like an international translator: when you run your program, CPython checks syntax, translates it into intermediate Bytecode (.pyc), and executes it line by line.',
        imageUrl: '/diagrams/execution_engine.png',
        visualDiagram: `+-------------------+      +-------------------+      +-------------------+
|  1. PYTHON SOURCE | ---> |  2. CPYTHON ENGINE| ---> |  3. BYTECODE      |
|     (script.py)   |      |     (Compiler)    |      |     (script.pyc)  |
+-------------------+      +-------------------+      +-------------------+
                                                            |
                                                            v
                                                   +-------------------+
                                                   |  4. EXECUTION     |
                                                   |     (Virtual Machine)|
                                                   +-------------------+`,
        content: 'Now that you\'ve written code, here is a quick peak behind the scenes! Python is an interpreted language powered by the CPython engine. It reads your code line by line, manages memory automatically, and cleans up unused data using reference counting garbage collection.',
        codeExample: `# Seeing memory references in Python
x = 100
y = 100

# CPython reuses memory for small integers automatically!
print(f"Memory Address of x: {id(x)}")
print(f"Memory Address of y: {id(y)}")
print("Are x and y pointing to the exact same object?", x is y)`,
        commonMistakes: [
          'Worrying about manual memory management (Python handles garbage collection for you!).'
        ],
        proTips: [
          'Python source code (.py) is compiled to bytecode (.pyc) cached inside __pycache__.',
          'The id(obj) function shows the internal memory address of any object in CPython.'
        ]
      }
    ]
  },
  'data-types-operators': {
    topicId: 'data-types-operators',
    title: 'Data Types & Operators',
    subtitle: 'In-depth exploration of numeric precision, casting rules, boolean truthiness, and bitwise math.',
    quickTopics: ['Numeric Types & Precision', 'Boolean Truthiness', 'Arithmetic & Bitwise Ops', 'Operator Precedence'],
    sections: [
      {
        id: 'numeric-precision',
        title: 'Integers, Floats & Precision Issues',
        storyNarrative: 'Imagine you are counting magic marbles! If you have 5 marbles, you can count them exactly (Integers). But if you cut a potion cake into 3 slices, each slice is 0.33333... of the cake. Floating-point numbers in computers work similarly—they try their best to represent fractions, but sometimes leave tiny extra decimals like 0.30000000000000004!',
        analogy: 'Imagine trying to represent 1/3 in decimals: 0.333333... Computer floats have similar finite binary limits, leading to small decimals like 0.1 + 0.2 = 0.30000000000000004.',
        imageUrl: '/diagrams/variables.png',
        visualDiagram: `+-------------------------------------------------------+
|  INTEGER (Exact Count):                               |
|  apples = 5  --->  Exact Value: 5                     |
+-------------------------------------------------------+
|  FLOAT (Fractional Approximation):                    |
|  0.1 + 0.2   --->  0.30000000000000004               |
+-------------------------------------------------------+
|  DECIMAL MODULE (Exact Financial Math):               |
|  Decimal('0.1') + Decimal('0.2') ---> Exact: 0.3       |
+-------------------------------------------------------+`,
        content: 'Python integers have arbitrary precision (unlimited digits constrained only by system RAM). Floats follow the IEEE 754 double-precision standard (64-bit), which can lead to standard floating-point representation quirks.',
        codeExample: `# Arbitrary Precision Integer
huge_num = 2 ** 100
print("Huge Integer:", huge_num)

# Floating point representation precision issue
print("0.1 + 0.2 =", 0.1 + 0.2)
print("0.1 + 0.2 == 0.3 ->", 0.1 + 0.2 == 0.3)

# Use decimal module for exact financial calculations
from decimal import Decimal
d1 = Decimal('0.1')
d2 = Decimal('0.2')
print("Decimal Sum:", d1 + d2)`,
        commonMistakes: [
          'Using floating point == for financial currency totals instead of the decimal module.',
          'Expecting division (/) to return an integer instead of a float.'
        ],
        proTips: [
          'Use the decimal module for financial and high-precision calculations.',
          'Use math.isclose(a, b) instead of == when comparing floats for equality.'
        ]
      },
      {
        id: 'bitwise-operators',
        title: 'Bitwise Operators & Bit Manipulation',
        storyNarrative: 'Imagine a row of 4 magic light switches on a castle wall. Switch ON is binary 1, and Switch OFF is binary 0. Bitwise operators let you flick multiple switches on, off, or flip them all at the exact same instant using secret combination codes!',
        analogy: 'Bitwise operations are like flipping a row of light switches (bits) on or off simultaneously.',
        imageUrl: '/diagrams/variables.png',
        visualDiagram: `   a = 5  (Binary:  0 1 0 1)
   b = 3  (Binary:  0 0 1 1)
   -------------------------
   a & b  (AND):    0 0 0 1  -->  1
   a | b  (OR) :    0 1 1 1  -->  7
   a ^ b  (XOR):    0 1 1 0  -->  6`,
        content: 'Bitwise operators manipulate individual binary bits of integer numbers. They are fundamental in system-level code, cryptography, and DSA optimizations.',
        codeExample: `a = 5   # Binary: 0101
b = 3   # Binary: 0011

print("a & b (AND):", a & b)   # 0001 -> 1
print("a | b (OR) :", a | b)   # 0111 -> 7
print("a ^ b (XOR):", a ^ b)   # 0110 -> 6
print("a << 1 (Shift Left):", a << 1) # 1010 -> 10 (Multiplies by 2)
print("a >> 1 (Shift Right):", a >> 1) # 0010 -> 2 (Divides by 2)`,
        commonMistakes: [
          'Confusing logical and/or with bitwise &/|.',
          'Using ^ for exponentiation instead of **.'
        ],
        proTips: [
          'Bitwise shift left (x << n) multiplies x by 2^n.',
          'Bitwise shift right (x >> n) floor-divides x by 2^n.',
          'XOR (a ^ b) can be used to find the single non-duplicate number in a list in O(N) time and O(1) space.'
        ]
      }
    ]
  },
  'conditions-loops': {
    topicId: 'conditions-loops',
    title: 'Conditions & Loops',
    subtitle: 'Comprehensive analysis of control flow, loop optimization, structural pattern matching, and iteration protocols.',
    quickTopics: ['Branching & Ternary', 'Loop Else Clause', 'Structural Pattern Matching', 'Iteration Performance'],
    sections: [
      {
        id: 'pattern-matching',
        title: 'Structural Pattern Matching (match-case)',
        storyNarrative: 'Imagine Py-Bot is standing at a magical sorting station! Packages arrive with different tags: some say "quit", some say "load file.txt", and others say "move left 5". Py-Bot inspects the shape and label of each package, instantly matching it to the right conveyor belt!',
        analogy: 'Pattern matching is like a smart automated mail sorter that inspects the shape and contents of packages, not just the address label.',
        imageUrl: '/diagrams/conditions_loops.png',
        visualDiagram: `                   +----------------------+
                   |   COMMAND INPUT      |
                   +----------------------+
                              |
       +----------------------+----------------------+
       |                      |                      |
       v                      v                      v
 case ["quit"]       case ["load", file]    case ["move", dir, steps]
       |                      |                      |
       v                      v                      v
 [Exit System]         [Load File]            [Move Character]`,
        content: 'Introduced in Python 3.10, match-case allows pattern matching over complex data structures, tuples, sequences, and class instances beyond simple value comparison.',
        codeExample: `def process_command(command):
    match command.split():
        case ["quit"]:
            return "Exiting system"
        case ["load", filename]:
            return f"Loading file: {filename}"
        case ["move", ("left" | "right" | "up" | "down") as direction, steps]:
            return f"Moving {steps} steps {direction}"
        case _:
            return "Unknown command"

print(process_command("load data.csv"))
print(process_command("move right 5"))`,
        commonMistakes: [
          'Forgetting the colon after case patterns.',
          'Using single = in equality check inside standard if statements.'
        ],
        proTips: [
          'match-case supports wildcards (_), guards (if conditions inside case), and structural unpacking.',
          'Much cleaner and faster than long chains of nested if-elif-else statements.'
        ]
      },
      {
        id: 'for-else-loops',
        title: 'The for-else & while-else Construct',
        storyNarrative: 'Imagine you are riding a magical Ferris Wheel looking for your lost pet cat in the crowd below! As the Ferris Wheel turns, you check every person. If you spot your cat, you shout "Found!" and jump off (break). But if the wheel turns all the way around without seeing your cat, the operator announces over the loudspeaker: "Search Complete: Cat Not Found!" (else block).',
        analogy: 'Think of loop-else as a security guard checking guest passes: if they check everyone without finding an intruder (break), they log "All clear!".',
        imageUrl: '/diagrams/conditions_loops.png',
        visualDiagram: `+-------------------------------------------------------+
|  FOR ITEM IN LIST:                                    |
|    if item == target:                                 |
|        print("Found!")                                |
|        break  -------------------> (Skips ELSE Block)  |
|                                                       |
|  ELSE:                                                |
|    print("Searched all, not found!") <--- (Runs ONLY   |
|                                            if no break|
|                                            occurred)  |
+-------------------------------------------------------+`,
        content: 'Python loops feature a unique else block. The else code block runs ONLY if the loop iterates to completion without encountering a break statement.',
        codeExample: `numbers = [2, 4, 6, 8, 10]
target = 7

for num in numbers:
    if num == target:
        print("Found target!")
        break
else:
    print("Target not present in list.")`,
        commonMistakes: [
          'Expecting loop-else to run when a break is triggered.',
          'Mistakenly indenting else under if instead of under for.'
        ],
        proTips: [
          'Great for search algorithms where you want a clean fallback when no item matches.',
          'Avoid flags like found = False when using loop else.'
        ]
      }
    ]
  },
  'functions-recursion': {
    topicId: 'functions-recursion',
    title: 'Functions & Recursion',
    subtitle: 'Scope, argument passing, mutability traps, recursion call stacks, and higher-order functions.',
    quickTopics: ['*args & **kwargs Details', 'Mutable Default Argument Trap', 'Recursion & Stack Frames', 'Higher-Order Functions'],
    sections: [
      {
        id: 'mutable-defaults-trap',
        title: 'The Mutable Default Argument Gotcha',
        storyNarrative: 'Imagine Py-Bot has a magic baking recipe for chocolate chip cookies! Every time you ask Py-Bot to bake, Py-Bot is supposed to start with a fresh new mixing bowl. But if Py-Bot uses a default bowl defined once at the start, old leftover cookie dough from yesterday gets mixed into today\'s batch!',
        analogy: 'Imagine a sign-in clipboard passed to guests: if a new blank page isn\'t put in place for each event (None), new guests sign on top of old event lists.',
        imageUrl: '/diagrams/functions.png',
        visualDiagram: `  BAD WAY: def append(val, target=[]):
  Call 1: target = [1]
  Call 2: target = [1, 2]  <-- SHARED BOWL TRAP!

  GOOD WAY: def append(val, target=None):
  Call 1: target = None -> creates fresh [1]
  Call 2: target = None -> creates fresh [2]`,
        content: 'Default function arguments are evaluated ONCE when the function definition is executed, NOT every time the function is called. Passing mutable default objects (lists, dicts) creates shared state across calls.',
        codeExample: `# WRONG Way (Shares the same list object!)
def append_bad(val, target=[]):
    target.append(val)
    return target

print(append_bad(1)) # [1]
print(append_bad(2)) # [1, 2] <- Trap!

# RIGHT Way (Creates a new list per invocation)
def append_good(val, target=None):
    if target is None:
        target = []
    target.append(val)
    return target

print(append_good(1)) # [1]
print(append_good(2)) # [2]`,
        commonMistakes: [
          'Using target=[] or target={} in def signatures.',
          'Forgetting to return values from recursive function steps.'
        ],
        proTips: [
          'Always use None as the default value for mutable arguments.',
          'Function default values are stored in func.__defaults__ attribute.'
        ]
      },
      {
        id: 'recursion-stack',
        title: 'Recursion Call Stack & Memory Depth',
        storyNarrative: 'Imagine a set of magical Russian Nesting Dolls! You open Doll 1, and inside is Doll 2. You open Doll 2, and inside is Doll 3. Finally, you reach the tiny solid Base Doll at the center that cannot be opened anymore. You then snap the dolls back together one by one to complete your spell!',
        analogy: 'Recursion is like Russian nesting dolls: each doll holds a smaller doll inside until reaching the tiny base doll at the center.',
        imageUrl: '/diagrams/functions.png',
        visualDiagram: `+-------------------------------------------------------+
|  RECURSION CALL STACK:                                |
|                                                       |
|  [ Frame 3: sum(1) ] ---> Base Case (Returns 1)       |
|  [ Frame 2: sum(2) ] ---> Returns 2 + 1 = 3           |
|  [ Frame 1: sum(3) ] ---> Returns 3 + 3 = 6           |
+-------------------------------------------------------+`,
        content: 'Recursion relies on call stack frames. Each function invocation pushes a new frame onto the execution stack until reaching the base case.',
        codeExample: `import sys

print("Default max stack depth:", sys.getrecursionlimit())

def recursive_sum(n):
    if n <= 1:
        return n
    return n + recursive_sum(n - 1)

print("Sum of 1..100:", recursive_sum(100))`,
        commonMistakes: [
          'Omitting the base case, triggering RecursionError maximum recursion depth exceeded.'
        ],
        proTips: [
          'Python does NOT automatically optimize tail recursion (Tail Call Optimization).',
          'Use sys.setrecursionlimit() cautiously, as it can cause C stack overflow crashes if set too high.'
        ]
      }
    ]
  }
};

// Map generated diagrams to fallback topics
const TOPIC_DIAGRAM_MAP: Record<string, string> = {
  'lists-strings': '/diagrams/data_structures.png',
  'data-structures': '/diagrams/data_structures.png',
  'dsa-basics': '/diagrams/execution_engine.png',
  'oop-interview-prep': '/diagrams/oop.png',
  'exception-handling': '/diagrams/conditions_loops.png',
  'decorators-closures': '/diagrams/decorators.png',
  'generators-iterators': '/diagrams/functions.png',
  'context-managers': '/diagrams/oop.png',
  'copy-identity-gotchas': '/diagrams/variables.png',
  'collections-module': '/diagrams/data_structures.png',
  'multithreading-gil': '/diagrams/execution_engine.png',
  'unit-testing': '/diagrams/functions.png'
};

const ALL_TOPIC_IDS = [
  'lists-strings', 'data-structures', 'dsa-basics', 'oop-interview-prep',
  'exception-handling', 'decorators-closures', 'generators-iterators',
  'context-managers', 'copy-identity-gotchas', 'collections-module',
  'multithreading-gil', 'unit-testing'
];

ALL_TOPIC_IDS.forEach(id => {
  if (!NOTES_DATA[id]) {
    const topicInfo = TOPICS.find(t => t.id === id);
    const diagramUrl = TOPIC_DIAGRAM_MAP[id] || '/diagrams/hello_world.png';
    NOTES_DATA[id] = {
      topicId: id,
      title: topicInfo?.title || id,
      subtitle: topicInfo?.description || id,
      quickTopics: ['Core Principles', 'Architecture', 'Code Practice', 'Best Practices'],
      sections: [
        {
          id: `${id}-intro`,
          title: `Mastering ${topicInfo?.title || id}`,
          storyNarrative: `Imagine Py-Bot opening a brand new magical workshop section dedicated to ${topicInfo?.title}! Inside, Py-Bot demonstrates how expert developers use ${topicInfo?.title} to build super-fast, clean, and bug-free applications!`,
          analogy: `Think of ${topicInfo?.title} as an essential tool in your developer toolbox that makes your Python applications production-ready.`,
          imageUrl: diagramUrl,
          visualDiagram: `+-------------------------------------------------------+
|  ${topicInfo?.title.toUpperCase()} WORKSHOP DIAGRAM              |
|                                                       |
|  [Input Data] ---> [${topicInfo?.title} Processor] ---> [Result] |
+-------------------------------------------------------+`,
          content: `${topicInfo?.description}. Mastering this concept unlocks scalable Python engineering patterns.`,
          codeExample: `# Interactive Python Example for ${topicInfo?.title}
def demo_feature():
    data = [x * 2 for x in range(5)]
    return f"${topicInfo?.title} initialized with data: {data}"

print(demo_feature())`,
          commonMistakes: [
            `Ignoring memory efficiency during large-scale iteration.`,
            `Mixing syntax rules between Python 2 and Python 3.`
          ],
          proTips: [
            `Always leverage standard library implementations before writing custom utilities.`,
            `Verify runtime performance using the timeit module.`
          ]
        }
      ]
    };
  }
});

export const QUIZZES_DATA: Record<string, TopicQuiz> = {
  'python-basics': {
    topicId: 'python-basics',
    title: 'Python Basics',
    questions: [
      {
        id: 1,
        text: 'What built-in function is used to print messages or values to the screen in Python?',
        options: ['echo()', 'print()', 'console.log()', 'write()'],
        correctAnswer: 1,
        explanation: 'The built-in print() function outputs text or variable values to the screen/terminal.'
      },
      {
        id: 2,
        text: 'How do you create a variable named score with integer value 10 in Python?',
        options: ['int score = 10', 'var score = 10', 'score = 10', 'let score = 10'],
        correctAnswer: 2,
        explanation: 'In Python, variables are created simply by assigning a value with the equals sign (=) without explicit data type declarations.'
      },
      {
        id: 3,
        text: 'What data type does the built-in input() function always return in Python?',
        options: ['Integer', 'Float', 'String (text)', 'Boolean'],
        correctAnswer: 2,
        explanation: 'The input() function captures user response as text (String). Use int() or float() to convert it if numerical calculations are needed.'
      },
      {
        id: 4,
        text: 'What is the modern f-string syntax in Python 3.6+ to combine variable name with text?',
        options: ['f"Hello {name}"', '"Hello " + $name', 'str("Hello %name")', 'f"Hello (name)"'],
        correctAnswer: 0,
        explanation: 'f-strings use the f prefix with curly braces f"Hello {name}" to dynamically insert variables into text.'
      },
      {
        id: 5,
        text: 'Which of the following is a valid variable name in Python?',
        options: ['1st_score', 'player-name', 'player_score', 'class'],
        correctAnswer: 2,
        explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with numbers or use hyphens/reserved keywords.'
      },
      {
        id: 6,
        text: 'How do you convert a text string "25" into a numerical integer in Python?',
        options: ['int("25")', 'str(25)', 'toInteger("25")', 'number("25")'],
        correctAnswer: 0,
        explanation: 'The int() function parses text strings containing numbers into integer values.'
      },
      {
        id: 7,
        text: 'Is Python case-sensitive regarding function names like print vs Print?',
        options: ['No, case does not matter', 'Yes, print is valid but Print will throw a NameError', 'Only on Windows OS', 'Only inside functions'],
        correctAnswer: 1,
        explanation: 'Python is strictly case-sensitive. Built-in keywords and function names like print must be lowercase.'
      },
      {
        id: 8,
        text: 'What intermediate format does CPython compile source code (.py) into before execution?',
        options: ['Machine Code', 'Bytecode (.pyc)', 'C Source Code', 'Assembly Language'],
        correctAnswer: 1,
        explanation: 'CPython compiles Python source code into intermediate Bytecode (.pyc) which is executed by the Python Virtual Machine.'
      },
      {
        id: 9,
        text: 'What function returns the internal memory address of an object in CPython?',
        options: ['type()', 'id()', 'memory()', 'address()'],
        correctAnswer: 1,
        explanation: 'In CPython, id(obj) returns the integer memory address of the object.'
      },
      {
        id: 10,
        text: 'What happens if you try to run print(hello) without quotes when hello is not defined?',
        options: ['Prints hello', 'Prints None', 'Throws a NameError', 'Prints 0'],
        correctAnswer: 2,
        explanation: 'Without quotes, Python treats hello as a variable name. If no variable named hello exists, it throws a NameError.'
      }
    ]
  }
};

// Populate fallback complete quizzes for remaining topics
const REMAINING_TOPICS = [
  'data-types-operators', 'conditions-loops', 'functions-recursion', 'lists-strings',
  'data-structures', 'dsa-basics', 'oop-interview-prep', 'exception-handling',
  'decorators-closures', 'generators-iterators', 'context-managers',
  'copy-identity-gotchas', 'collections-module', 'multithreading-gil', 'unit-testing'
];

REMAINING_TOPICS.forEach(id => {
  if (!QUIZZES_DATA[id]) {
    const topicInfo = TOPICS.find(t => t.id === id);
    QUIZZES_DATA[id] = {
      topicId: id,
      title: topicInfo?.title || id,
      questions: Array.from({ length: 10 }).map((_, idx) => ({
        id: idx + 1,
        text: `Question ${idx + 1}: What is an essential architectural concept in ${topicInfo?.title || id}?`,
        options: [
          `Basic syntax rule for ${topicInfo?.title}`,
          `Core pattern in ${topicInfo?.title} ensuring optimal performance and safety`,
          `Legacy syntax deprecated in Python 3`,
          `Unrelated syntax option`
        ],
        correctAnswer: 1,
        explanation: `In ${topicInfo?.title}, this concept ensures proper resource handling, high performance, and robust software architecture.`
      }))
    };
  }
});
