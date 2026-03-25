import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/07-input",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "User input",
  description: "Read input with input() and convert types.",
  order: 7,
  type: "guided",

  explanation: `
\`input()\` pauses the program and waits for the user to type something. It always returns a string.

\`\`\`python
name = input("What's your name? ")
print(f"Hello, {name}!")
\`\`\`

Since \`input()\` always returns a string, you need to convert it if you want a number:

\`\`\`python
age_text = input("How old are you? ")
age = int(age_text)        # convert to integer
print(f"Next year you'll be {age + 1}")
\`\`\`

Common conversions:
- \`int("42")\` → \`42\`
- \`float("3.14")\` → \`3.14\`
- \`str(42)\` → \`"42"\`

If the string can't be converted, Python raises an error: \`int("hello")\` crashes.
`,

  task: `This program asks for two numbers and prints their sum, but it's concatenating them as strings instead of adding them. Fix the type conversion.`,

  starterFiles: [
    {
      path: "main.py",
      content: `# For testing, we'll use hardcoded values instead of input()
a = "15"
b = "27"

total = a + b
print(f"The sum of {a} and {b} is {total}")
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `# For testing, we'll use hardcoded values instead of input()
a = "15"
b = "27"

total = int(a) + int(b)
print(f"The sum of {a} and {b} is {total}")
`,
    },
  ],

  expectedOutput: "The sum of 15 and 27 is 42\n",

  hints: [
    '`a` and `b` are strings. `"15" + "27"` gives `"1527"`, not `42`.',
    "Convert both to integers before adding: `int(a) + int(b)`.",
  ],
};
