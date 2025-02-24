import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const deviceSchema = v.object({
  name: v.string(),
  price: v.string(),
  ultimate: v.string(),
  plus: v.string(),
  welcome: v.string(),
  expires: v.string(),
  withTradeIn: v.boolean(),
});
export const addDevice = mutation({
  args: deviceSchema,
  handler: async (ctx, args) => {
    await ctx.db.insert("device", args);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("device").collect();
  },
});

export const get = query({
  args: {
    id: v.optional(v.id("device")),
  },
  handler: async (ctx, args) => {
    if (!args.id) {
      return null;
    }
    return await ctx.db.get(args.id);
  },
});

export const updateDevice = mutation({
  args: {
    id: v.id("device"),
    data: deviceSchema,
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.data);
  },
});
export const deleteDevice = mutation({
  args: {
    id: v.id("device"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
