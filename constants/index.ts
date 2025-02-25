import { PhoneValue, PricingPlan } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";

export const pricingColumns: ColumnDef<PricingPlan>[] = [
  { header: "Plan", accessorKey: "plan" },
  { header: "1 Line", accessorKey: "1 Line" },
  { header: "2 Lines", accessorKey: "2 Lines" },
  { header: "3 Lines", accessorKey: "3 Lines" },
  { header: "4+ Lines", accessorKey: "4 Lines" },
];

export const deviceColumns: ColumnDef<PhoneValue>[] = [
  {
    accessorKey: "name",
    header: "Device",
    accessorFn: (row) => row.name || "N/A",
  },
  {
    accessorKey: "ultimate",
    header: "Ultimate",
    accessorFn: (row) => row.ultimate || "N/A",
  },
  {
    accessorKey: "plus",
    header: "Plus",
    accessorFn: (row) => row.plus || "N/A",
  },
  {
    accessorKey: "welcome",
    header: "Welcome",
    accessorFn: (row) => row.welcome || "N/A",
  },
  {
    accessorKey: "expires",
    header: "Expires",
    accessorFn: (row) => row.expires || "N/A",
  },

  {
    id: "action",
    header: "Action",
    cell: () => null, // This will be handled by the DataTable component
  },
];

export const phoneRetailValue: number[] = [
  100, 150, 200, 250, 300, 350, 400, 450, 500, 540, 550, 600, 650, 700, 750,
  800,
];
