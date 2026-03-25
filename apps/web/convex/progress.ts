import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {
    languageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    if (args.languageId) {
      return ctx.db
        .query("progress")
        .withIndex("by_user_language", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier).eq("languageId", args.languageId!),
        )
        .collect();
    }

    return ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .collect();
  },
});

export const complete = mutation({
  args: {
    languageId: v.string(),
    lessonId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_language", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier).eq("languageId", args.languageId),
      )
      .filter((q) => q.eq(q.field("lessonId"), args.lessonId))
      .first();

    if (existing) return existing._id;

    return ctx.db.insert("progress", {
      tokenIdentifier: identity.tokenIdentifier,
      languageId: args.languageId,
      lessonId: args.lessonId,
      completedAt: Date.now(),
    });
  },
});
