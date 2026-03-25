import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/04-numbers",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Numbers",
  description: "Integers, floats, and basic arithmetic.",
  order: 4,
  type: "guided",

  explanation: `
Python has two main number types:

- **Integers** (\`int\`) — whole numbers: \`42\`, \`-7\`, \`0\`
- **Floats** (\`float\`) — decimal numbers: \`3.14\`, \`-0.5\`, \`2.0\`

Arithmetic works as you'd expect:

\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333...
print(10 // 3)  # 3  (integer division — rounds down)
print(10 % 3)   # 1  (remainder)
print(10 ** 3)  # 1000  (exponentiation)
\`\`\`

Division with \`/\` always returns a float, even if the result is whole: \`10 / 2\` gives \`5.0\`, not \`5\`.

Use \`//\` when you want integer division.
`,

  task: `The program calculates the total cost of items with tax, but two lines have the wrong operators. Fix them so the output is correct.`,

  starterFiles: [
    {
      path: "main.py",
      content: `price = 25
quantity = 4
tax_rate = 0.08

subtotal = price + quantity  # Should multiply price by quantity
tax = subtotal + tax_rate    # Should multiply subtotal by tax rate
total = subtotal + tax

print("Subtotal: " + str(subtotal))
print("Tax: " + str(tax))
print("Total: " + str(total))
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `price = 25
quantity = 4
tax_rate = 0.08

subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

print("Subtotal: " + str(subtotal))
print("Tax: " + str(tax))
print("Total: " + str(total))
`,
    },
  ],

  expectedOutput: "Subtotal: 100\nTax: 8.0\nTotal: 108.0\n",

  hints: [
    "To get a subtotal, you multiply price by quantity — not add them.",
    "Tax is calculated by multiplying the subtotal by the tax rate.",
    "Change both `+` operators on the subtotal and tax lines to `*`.",
  ],
};
