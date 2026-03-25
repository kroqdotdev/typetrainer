import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/03-strings",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Strings",
  description: "Work with text — Python's string type.",
  order: 3,
  type: "guided",

  explanation: `
A string is text. You create one by wrapping characters in quotes:

\`\`\`python
name = "Alice"
greeting = 'Hello'
\`\`\`

Single or double quotes both work. Pick one and be consistent.

You can combine strings with \`+\`:

\`\`\`python
full = "Hello" + " " + "World"
print(full)  # Hello World
\`\`\`

You can also repeat them with \`*\`:

\`\`\`python
print("ha" * 3)  # hahaha
\`\`\`

Strings have a length. Use \`len()\` to find it:

\`\`\`python
print(len("Python"))  # 6
\`\`\`
`,

  task: `The program should print \`Hello, Alice! Your name has 5 letters.\` but the string concatenation is broken. Fix it.`,

  starterFiles: [
    {
      path: "main.py",
      content: `name = "Alice"
name_length = len(name)

# Fix the line below — it should combine the parts into one message
message = "Hello, " + name + " Your name has " + name_length + " letters."
print(message)
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `name = "Alice"
name_length = len(name)

# Fix the line below — it should combine the parts into one message
message = "Hello, " + name + "! Your name has " + str(name_length) + " letters."
print(message)
`,
    },
  ],

  expectedOutput: "Hello, Alice! Your name has 5 letters.\n",

  hints: [
    "Python can't concatenate a string and an integer with `+` — you need to convert the integer first.",
    "Use `str()` to convert a number to a string: `str(name_length)`.",
    "There's also a missing `!` after the name. Check the expected output carefully.",
  ],
};
