import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();
  },
});

export const set = mutation({
  args: {
    currentLanguage: v.optional(v.string()),
    currentLesson: v.optional(v.string()),
    theme: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (existing) {
      return ctx.db.patch(existing._id, args);
    }

    return ctx.db.insert("userPreferences", {
      tokenIdentifier: identity.tokenIdentifier,
      ...args,
    });
  },
});
