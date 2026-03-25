import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/01-hello-world",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Hello, World!",
  description: "Use print() to display text.",
  order: 1,
  type: "guided",

  explanation: `
Every programmer starts here. \`print()\` is a built-in function that displays text in the terminal.

You call it by writing \`print()\` with a message inside the parentheses. The message needs to be wrapped in quotes — either single quotes \`'\` or double quotes \`"\`.

\`\`\`python
print("This shows up in the terminal")
print('This works too')
\`\`\`

That's it. No setup, no imports. Just \`print()\` and a string.
`,

  task: `The code below has a bug — it doesn't print anything. Fix it so the output reads \`Hello, World!\`.`,

  starterFiles: [
    {
      path: "main.py",
      content: `# Fix this so it prints: Hello, World!
print "Hello, World!"
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `# Fix this so it prints: Hello, World!
print("Hello, World!")
`,
    },
  ],

  expectedOutput: "Hello, World!\n",

  hints: [
    "In Python 3, print is a function — it needs parentheses.",
    'Change `print "Hello, World!"` to `print("Hello, World!")`.',
  ],
};
