import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  progress: defineTable({
    tokenIdentifier: v.string(),
    languageId: v.string(),
    lessonId: v.string(),
    completedAt: v.number(),
  })
    .index("by_user", ["tokenIdentifier"])
    .index("by_user_language", ["tokenIdentifier", "languageId"])
    .index("by_user_language_lesson", ["tokenIdentifier", "languageId", "lessonId"]),

  userPreferences: defineTable({
    tokenIdentifier: v.string(),
    currentLanguage: v.optional(v.string()),
    currentLesson: v.optional(v.string()),
    theme: v.optional(v.string()),
  }).index("by_user", ["tokenIdentifier"]),
});
