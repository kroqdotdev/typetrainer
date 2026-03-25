import type { LessonDefinition } from "../../../types";

export const lesson: LessonDefinition = {
  id: "python/01-hello-python/05-variables",
  moduleId: "01-hello-python",
  languageId: "python",
  title: "Variables",
  description: "Store and reuse values with names.",
  order: 5,
  type: "guided",

  explanation: `
A variable is a name that holds a value. You create one with \`=\`:

\`\`\`python
age = 25
name = "Alice"
is_student = True
\`\`\`

Variable names can contain letters, numbers, and underscores. They can't start with a number. Python convention is \`snake_case\` — lowercase words separated by underscores.

\`\`\`python
first_name = "Bob"    # good
lastName = "Smith"     # works, but not Pythonic
2nd_place = "silver"   # error — can't start with a number
\`\`\`

Variables can be reassigned at any time:

\`\`\`python
score = 0
score = score + 10
print(score)  # 10
\`\`\`

Python also has shorthand for this:

\`\`\`python
score += 10   # same as score = score + 10
score -= 3    # same as score = score - 3
score *= 2    # same as score = score * 2
\`\`\`
`,

  task: `This program tracks a player's score, but it has several bugs. Fix them so the final score is \`35\`.`,

  starterFiles: [
    {
      path: "main.py",
      content: `# Player starts with 10 points
player_score = 10

# Player completes a quest worth 20 points
player_score = 20

# Player finds a bonus worth 5 points
Player_Score += 5

print("Final score: " + str(player_score))
`,
    },
  ],

  solutionFiles: [
    {
      path: "main.py",
      content: `# Player starts with 10 points
player_score = 10

# Player completes a quest worth 20 points
player_score += 20

# Player finds a bonus worth 5 points
player_score += 5

print("Final score: " + str(player_score))
`,
    },
  ],

  expectedOutput: "Final score: 35\n",

  hints: [
    "The quest line replaces the score instead of adding to it. `= 20` sets it to 20 — you want `+= 20`.",
    "Variable names are case-sensitive. `Player_Score` and `player_score` are different variables.",
    "Fix both: use `+= 20` for the quest, and change `Player_Score` to `player_score` for the bonus.",
  ],
};
