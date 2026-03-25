import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/06-f-strings",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "f-strings",
  description: "Embed variables directly inside strings.",
  order: 6,
  type: "guided",

  explanation: `
Concatenating strings with \`+\` gets messy fast. f-strings are a cleaner way to embed values inside strings.

Prefix the string with \`f\` and put expressions inside \`{}\`:

\`\`\`python
name = "Alice"
age = 30
print(f"My name is {name} and I'm {age} years old.")
\`\`\`

You can put any expression inside the braces:

\`\`\`python
print(f"2 + 2 = {2 + 2}")
print(f"{'hello'.upper()}")
\`\`\`

f-strings handle type conversion automatically — no need for \`str()\`:

\`\`\`python
count = 42
print(f"Count: {count}")  # just works
\`\`\`

This is the preferred way to format strings in modern Python.
`,

  task: `Convert the messy string concatenation into clean f-strings. The output should stay exactly the same.`,

  starterFiles: [
    {
      path: "main.py",
      content: `city = "Berlin"
temp_celsius = 22
temp_fahrenheit = temp_celsius * 9 / 5 + 32

# Rewrite these using f-strings
line1 = "Weather report for " + city + ":"
line2 = "Temperature: " + str(temp_celsius) + "°C (" + str(temp_fahrenheit) + "°F)"
line3 = "Status: " + ("warm" if temp_celsius > 20 else "cool")

print(line1)
print(line2)
print(line3)
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `city = "Berlin"
temp_celsius = 22
temp_fahrenheit = temp_celsius * 9 / 5 + 32

# Rewrite these using f-strings
line1 = f"Weather report for {city}:"
line2 = f"Temperature: {temp_celsius}°C ({temp_fahrenheit}°F)"
line3 = f"Status: {'warm' if temp_celsius > 20 else 'cool'}"

print(line1)
print(line2)
print(line3)
`,
    },
  ],

  expectedOutput: "Weather report for Berlin:\nTemperature: 22°C (71.6°F)\nStatus: warm\n",

  hints: [
    'Start each string with `f"` and replace the concatenated variables with `{variable_name}`.',
    "For line2, put `temp_celsius` and `temp_fahrenheit` directly in braces — f-strings handle the type conversion.",
    "For line3, you can put the entire ternary expression inside braces: `{'warm' if temp_celsius > 20 else 'cool'}`.",
  ],
};
