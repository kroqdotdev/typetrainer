import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/08-challenge",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Challenge: Introduce yourself",
  description: "Put it all together — variables, f-strings, and arithmetic.",
  order: 8,
  type: "challenge",

  explanation: `
Time to use what you've learned. This challenge tests variables, strings, f-strings, numbers, and type conversion.

There's no starter code — write it from scratch.
`,

  task: `Write a program that creates variables for a person's info and prints a formatted summary.

Your program must output **exactly** this:

\`\`\`
Name: Ada Lovelace
Age: 28
Profession: Mathematician
Years until retirement: 37
Fun fact: Ada is 28 years old and has been alive for approximately 10220 days.
\`\`\`

Requirements:
- Store the name, age, and profession in variables
- Calculate years until retirement (retirement age is 65)
- Calculate approximate days alive (age × 365)
- Use f-strings for all print statements`,

  starterFiles: [
    {
      path: "main.py",
      content: `# Write your solution here
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `name = "Ada Lovelace"
age = 28
profession = "Mathematician"

years_until_retirement = 65 - age
days_alive = age * 365

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Profession: {profession}")
print(f"Years until retirement: {years_until_retirement}")
print(f"Fun fact: Ada is {age} years old and has been alive for approximately {days_alive} days.")
`,
    },
  ],

  expectedOutput: `Name: Ada Lovelace
Age: 28
Profession: Mathematician
Years until retirement: 37
Fun fact: Ada is 28 years old and has been alive for approximately 10220 days.
`,

  hints: [
    "Start by creating three variables: `name`, `age`, and `profession` with the values from the expected output.",
    "Retirement is at 65. Subtract the current age to get years remaining.",
    "Approximate days alive is just `age * 365` — don't overthink it.",
    "Use f-strings for each print line. Match the expected output exactly — punctuation, spacing, everything.",
  ],
};
