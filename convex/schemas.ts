import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  device: defineTable({
    name: v.string(),
    price: v.string(),
    ultimate: v.string(),
    plus: v.string(),
    welcome: v.string(),
    expires: v.string(),
    withTradeIn: v.boolean(),
  }),
});
