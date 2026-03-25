# Python Course System Design

## Overview

TypeTrainer teaches Python through an in-browser IDE where users fix, complete, and write real code. Lessons progress from "fix this one line" to "build a CLI tool from scratch." Python runs client-side via Pyodide (WebAssembly). All course content lives as TypeScript in the codebase.

## Lesson types

**Guided** — The user receives broken or incomplete code and a specific task: "fix the bug," "complete the function," "make the tests pass." Starter files have TODOs, bugs, or missing pieces. Hints point toward the fix with increasing specificity.

**Challenge** — Appears after a group of guided lessons. The user gets a prompt and an empty (or minimal) editor. The task is open-ended: "Write a program that does X." Validation runs test assertions against their code. Hints are broader ("think about edge cases") rather than line-specific.

## Lesson data model

```ts
type LessonDefinition = {
  id: string;                      // "python/01-hello-python/01-hello-world"
  moduleId: string;                // "01-hello-python"
  languageId: "python";
  title: string;
  description: string;
  order: number;
  type: "guided" | "challenge";

  explanation: string;             // markdown — teaches the concept
  task: string;                    // markdown — what the user must do

  starterFiles: FileDefinition[];
  solutionFiles: FileDefinition[];

  expectedOutput?: string;         // match stdout exactly
  testFile?: FileDefinition;       // runs assertions

  hints: string[];                 // progressive, revealed one at a time
};

type FileDefinition = {
  path: string;        // "main.py", "utils.py", "tests/test_main.py"
  content: string;
  readOnly?: boolean;  // user can't edit (test files, provided imports)
};
```

## Editor and execution

The lesson page splits into two panels. Left: explanation and task (markdown). Right: the IDE.

### IDE layout

```
┌──────────────────────────────────────────────────┐
│ [file tree]  │  [tab bar: main.py]        [Run ▶]│
│              │                                    │
│  📄 main.py  │  (editor — CodeMirror 6)           │
│              │                                    │
│              │                                    │
│              ├────────────────────────────────────│
│              │  (output / terminal)               │
└──────────────────────────────────────────────────┘
```

- **File tree** — always visible, even for single-file lessons. Establishes the pattern for multi-file lessons later. Clicking a file opens it in a tab. Read-only files show a lock icon.
- **Tab bar** — shows open files. Active file highlighted.
- **Toolbar** — Run (Ctrl+Enter), Reset (restore starter code), autocomplete toggle, hints dropdown.
- **Output panel** — terminal-style. Shows stdout, stderr, and pass/fail status.

### Autocomplete

Off by default. A toggle in the toolbar enables CodeMirror's completion extension with Python keywords, builtins, and symbols defined in the current file. No LSP — static analysis only.

### Execution flow

1. User clicks Run or presses Ctrl+Enter.
2. All files write to Pyodide's virtual filesystem.
3. If the lesson has `expectedOutput`: run `main.py`, compare stdout.
4. If the lesson has `testFile`: run the test file, parse pass/fail.
5. Display results in the output panel.
6. On success: mark lesson complete via Convex, show "Next lesson" prompt.

### Mobile

Two-panel layout stacks vertically on small screens. Explanation on top, editor below. Functional on tablets, limited on phones.

## Curriculum

10 learning modules plus a capstone. Each module follows a rhythm: intro lessons (one concept each), practice lessons (combine recent concepts), then a challenge. Never more than one new concept per lesson.

| # | Module | Lessons | Concepts |
|---|--------|---------|----------|
| 1 | Hello Python | 8 | `print`, comments, strings, numbers, variables, f-strings, `input()`, type conversion |
| 2 | Making decisions | 8 | `if`/`elif`/`else`, comparison, `and`/`or`/`not`, nesting, truthiness |
| 3 | Loops | 9 | `while`, `for`, `range()`, `break`/`continue`, nested loops, loop patterns |
| 4 | Collections | 10 | Lists, indexing, slicing, list methods, tuples, dictionaries, sets, iteration, list comprehensions |
| 5 | Functions | 9 | Defining, calling, parameters, return, default args, scope, `*args`/`**kwargs`, docstrings |
| 6 | Strings & files | 8 | String methods, splitting/joining, formatting, reading files, writing files, CSV parsing |
| 7 | Error handling | 7 | Exceptions, `try`/`except`, exception types, `raise`, `finally`, validation patterns |
| 8 | Modules & structure | 8 | Imports, `__name__`, multi-file projects, standard library (`json`, `math`, `random`, `os.path`) |
| 9 | Classes | 10 | Classes, `__init__`, methods, `self`, inheritance, dunder methods, properties, dataclasses |
| 10 | Intermediate patterns | 9 | Decorators, generators, context managers, lambda, `map`/`filter`, type hints, comprehension patterns |
| 11 | Capstone projects | 4 | CLI tool, text adventure, data processor, API client (mocked HTTP) |

~90 lessons. Each guided lesson takes 2-5 minutes. Challenges take 5-15 minutes. A motivated beginner completes the course in 15-25 hours.

## Completion and progress

When code passes validation:

1. `progress.complete` Convex mutation writes the lesson ID (if signed in).
2. Output panel shows green success and a "Next lesson" button.
3. Module progress updates — lesson list shows checkmarks, module card shows "5/8 completed."

Challenge validation requires all test assertions to pass. No partial credit. The user sees which tests failed and keeps working.

### Hints

Free to use, no penalty. Ordered from vague to specific:

- Guided: "Look at the return value" → "It returns a string, not an int" → "Use `int()` on line 7"
- Challenge: "Think about empty string edge cases" → "What happens when the input has no spaces?"

### Solution reveal

Available on all lesson types. Shows full working code in a diff view against the user's current code. Challenges show a "Try the hints first" confirmation before revealing.

## File storage

```
packages/shared/src/courses/python/
  index.ts
  01-hello-python/
    index.ts
    meta.ts              # { id, title, description, order }
    01-hello-world.ts
    02-comments.ts
    ...
    08-challenge.ts
  02-making-decisions/
    index.ts
    meta.ts
    01-if-statements.ts
    ...
```

Content is code — versioned in git, reviewed in PRs. No database, no CMS.

## Tech decisions

- **Editor**: CodeMirror 6 (lightweight, extensible, mobile-friendly)
- **Execution**: Pyodide (Python in WebAssembly, runs client-side, no server cost)
- **Content**: Static TypeScript files in the monorepo shared package
- **Progress**: Convex `progress` table (already exists in schema)
