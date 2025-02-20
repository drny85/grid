import React from "react";
import DataTable from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define TypeScript interfaces for the data
interface PricingPlan {
  plan: string;
  "1 Line": string;
  "2 Lines": string;
  "3 Lines": string;
  "4 Lines": string;
  "5 Lines": string;
}

interface DeviceCost {
  device: string;
  ultimate: string;
  plus: string;
  welcome: string;
}

const pricingPlans: PricingPlan[] = [
  {
    plan: "Ultimate",
    "1 Line": "$80",
    "2 Lines": "$70",
    "3 Lines": "$55",
    "4 Lines": "$45",
    "5 Lines": "NA",
  },
  {
    plan: "Plus",
    "1 Line": "$70",
    "2 Lines": "$60",
    "3 Lines": "$45",
    "4 Lines": "$35",
    "5 Lines": "NA",
  },
  {
    plan: "Welcome",
    "1 Line": "$50",
    "2 Lines": "$42.50",
    "3 Lines": "$28.34",
    "4 Lines": "$25",
    "5 Lines": "NA",
  },
];

const byodPlans: PricingPlan[] = [
  {
    plan: "Ultimate",
    "1 Line": "$65",
    "2 Lines": "$55",
    "3 Lines": "$40",
    "4 Lines": "$30",
    "5 Lines": "NA",
  },
  {
    plan: "Plus",
    "1 Line": "$60",
    "2 Lines": "$50",
    "3 Lines": "$35",
    "4 Lines": "$25",
    "5 Lines": "NA",
  },
  {
    plan: "Welcome",
    "1 Line": "$40",
    "2 Lines": "$32.50",
    "3 Lines": "$18.34",
    "4 Lines": "$15",
    "5 Lines": "NA",
  },
];

const deviceCostsNoTradeIn: DeviceCost[] = [
  { device: "iPhone 16", ultimate: "Free", plus: "Free", welcome: "$5/36M" },
  { device: "16 Plus", ultimate: "Free", plus: "$5/36M", welcome: "$10/36M" },
  {
    device: "iPhone 16 Pro",
    ultimate: "Free",
    plus: "$5/36M",
    welcome: "$10/36M",
  },
  {
    device: "16 Pro Max",
    ultimate: "$5/36M",
    plus: "$10/36M",
    welcome: "$15/36M",
  },
  { device: "iPhone 15", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "15 Plus", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "S25", ultimate: "Free", plus: "Free", welcome: "$5/36M" },
  { device: "S25+", ultimate: "Free", plus: "$5/36M", welcome: "$10/36M" },
  {
    device: "S25 Ultra",
    ultimate: "$5/36M",
    plus: "$10/36M",
    welcome: "$15/36M",
  },
  {
    device: "Pixel 9 Pro",
    ultimate: "Free",
    plus: "$5/36M",
    welcome: "$10/36M",
  },
  {
    device: "Pixel 9 Pro XL",
    ultimate: "$5/36M",
    plus: "$10/36M",
    welcome: "$15/36M",
  },
];

const deviceCostsWithTradeIn: DeviceCost[] = [
  { device: "iPhone 16", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "16 Plus", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "16 Pro", ultimate: "Free", plus: "Free", welcome: "Free" },
  {
    device: "16 Pro Max",
    ultimate: "$6/36M",
    plus: "$6/36M",
    welcome: "$6/36M",
  },
  { device: "S25", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "S25+", ultimate: "Free", plus: "Free", welcome: "Free" },
  {
    device: "S25 Ultra",
    ultimate: "$9/36M",
    plus: "$9/36M",
    welcome: "$9/36M",
  },
  { device: "Z Flip6", ultimate: "$7/36M", plus: "$7/36M", welcome: "$7/36M" },
  {
    device: "Z Fold6",
    ultimate: "$29/36M",
    plus: "$29/36M",
    welcome: "$29/36M",
  },
  { device: "Pixel 9", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "9 Pro", ultimate: "Free", plus: "Free", welcome: "Free" },
  { device: "9 Pro XL", ultimate: "$6/36M", plus: "$6/36M", welcome: "$6/36M" },
  {
    device: "9 Pro Fold",
    ultimate: "$23/36M",
    plus: "$23/36M",
    welcome: "$23/36M",
  },
];

export default function Home() {
  const pricingColumns: ColumnDef<PricingPlan>[] = [
    { header: "Plan", accessorKey: "plan" },
    { header: "1 Line", accessorKey: "1 Line" },
    { header: "2 Lines", accessorKey: "2 Lines" },
    { header: "3 Lines", accessorKey: "3 Lines" },
    { header: "4+ Lines", accessorKey: "4 Lines" },
  ];

  const deviceColumns: ColumnDef<DeviceCost>[] = [
    { header: "Device", accessorKey: "device" },
    { header: "Ultimate", accessorKey: "ultimate" },
    { header: "Plus", accessorKey: "plus" },
    { header: "Welcome", accessorKey: "welcome" },
  ];

  return (
    <div className="p-6">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Verizon Pricing Plans</h1>
        <Link href={"/add-phone"}>
          <Button>Add New Phone</Button>
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pricing Plans</h2>
        <DataTable columns={pricingColumns} data={pricingPlans} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">BYOD Plans</h2>
        <DataTable columns={pricingColumns} data={byodPlans} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Device Costs (No Trade-In)
        </h2>
        <DataTable columns={deviceColumns} data={deviceCostsNoTradeIn} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Device Costs (With Trade-In)
        </h2>
        <DataTable columns={deviceColumns} data={deviceCostsWithTradeIn} />
      </section>
    </div>
  );
}
