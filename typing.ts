import { PhoneFormValues } from "./components/AddPhoneDialog";
import { Id } from "./convex/_generated/dataModel";

export interface PricingPlan {
  plan: string;
  "1 Line": string;
  "2 Lines": string;
  "3 Lines": string;
  "4 Lines": string;
}

export type PhoneValue = PhoneFormValues & { _id: Id<"device"> };
