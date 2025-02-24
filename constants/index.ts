import { PhoneFormValues } from "@/components/AddPhoneDialog";
import { PricingPlan } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";

export const pricingColumns: ColumnDef<PricingPlan>[] = [
  { header: "Plan", accessorKey: "plan" },
  { header: "1 Line", accessorKey: "1 Line" },
  { header: "2 Lines", accessorKey: "2 Lines" },
  { header: "3 Lines", accessorKey: "3 Lines" },
  { header: "4+ Lines", accessorKey: "4 Lines" },
];

export const deviceColumns: ColumnDef<PhoneFormValues>[] = [
  { header: "Device Name", accessorKey: "name" },
  { header: "Ultimate", accessorKey: "ultimate" },
  { header: "Plus", accessorKey: "plus" },
  { header: "Welcome", accessorKey: "welcome" },
  { header: "Exp Date", accessorKey: "expires" },
  { header: "", accessorKey: "action" },
  { header: "price", accessorKey: "price" },
];

export const phoneRetailValue: number[] = [
  100, 150, 200, 250, 300, 350, 400, 450, 500, 540, 550, 600, 650, 700, 750,
  800,
];
