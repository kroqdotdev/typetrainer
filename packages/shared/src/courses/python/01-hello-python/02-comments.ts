import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/02-comments",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Comments",
  description: "Add notes to your code that Python ignores.",
  order: 2,
  type: "guided",

  explanation: `
Comments let you leave notes in your code. Python ignores them completely — they're for humans reading the code.

A comment starts with \`#\`. Everything after \`#\` on that line is ignored.

\`\`\`python
# This is a comment
print("This runs")  # This part is also a comment
\`\`\`

Use comments to explain *why* something works, not *what* it does. The code itself shows what — comments explain the reasoning.
`,

  task: `The code below has a line that should be a comment, but it's being treated as code and causing an error. Fix it.`,

  starterFiles: [
    {
      path: "main.py",
      content: `print("Step 1: Greet the user")
This line explains what comes next
print("Hello! Welcome to TypeTrainer.")
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `print("Step 1: Greet the user")
# This line explains what comes next
print("Hello! Welcome to TypeTrainer.")
`,
    },
  ],

  expectedOutput: "Step 1: Greet the user\nHello! Welcome to TypeTrainer.\n",

  hints: [
    "Python doesn't know what to do with plain English — it tries to run it as code.",
    "Add `#` at the start of the line to turn it into a comment.",
  ],
};
