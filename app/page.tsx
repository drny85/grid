"use client";
import AddPhoneDialog, { PhoneFormValues } from "@/components/AddPhoneDialog";
import { useStore } from "@/store/useStore";
import DataTable from "../components/DataTable";
import { deviceColumns, pricingColumns } from "@/constants";
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { PhoneValue } from "@/typing";
// Define TypeScript interfaces for the data

export default function Home() {
  const { pricingPlans, byodPlans } = useStore();
  const [open, setOpen] = useState(false);
  const { device, setDevice } = useStore();
  const add = useMutation(api.devices.addDevice);
  const devices = useQuery(api.devices.list) as PhoneValue[] | [];
  const updateDevice = useMutation(api.devices.updateDevice);
  const deviceCostsWithTradeIn =
    devices?.filter((device) => device.withTradeIn) || [];
  const deviceCostsNoTradeIn =
    devices?.filter((device) => !device.withTradeIn) || [];

  const onSubmit = async (data: PhoneFormValues) => {
    if (device) {
      await updateDevice({
        id: device._id,
        data: {
          ...data,
        },
      });
      setDevice(null);
      toast.success("Device updated successfully");
    } else {
      if (
        devices?.find(
          (device) =>
            device.name.toLowerCase() === data.name.toLowerCase() &&
            device.withTradeIn === data.withTradeIn
        )
      ) {
        toast.error("Device already exists");
        return;
      }
      add(data);
      setDevice(null);
      setOpen(false);
      toast.success("Device added successfully");
    }
  };

  return (
    <div className="p-6">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Verizon Pricing Plans</h1>
        <ModeToggle />
        <AddPhoneDialog
          open={open}
          setOpen={(value) => {
            setDevice(null);
            setOpen(value);
          }}
          onSubmit={onSubmit}
        />
      </div>
      <div className="flex gap-3 mb-2 items-center justify-center">
        <p className="text-md font-semibold italic">
          Auto Pay & Unlimited Welcome Offer (1 - 3) lines
        </p>{" "}
        <span className="text-orange-500">Expire 03/31</span>
      </div>

      <section className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold mb-3 pl-3">Pricing Plans</h2>
        <DataTable columns={pricingColumns} data={pricingPlans} />
      </section>

      <section className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold mb-3 pl-3">BYOD Plans</h2>
        <DataTable columns={pricingColumns} data={byodPlans} />
      </section>

      <section className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold mb-3 pl-3">
          Device Costs (No Trade-In)
        </h2>
        <DataTable<PhoneValue>
          columns={deviceColumns}
          data={deviceCostsNoTradeIn}
          onEdit={(value: PhoneValue) => {
            setDevice(value);
            setOpen(true);
          }}
        />
      </section>

      <section className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold mb-3 pl-3">
          Device Costs (With Trade-In)
        </h2>
        <DataTable<PhoneValue>
          columns={deviceColumns}
          data={deviceCostsWithTradeIn}
          onEdit={(value: PhoneValue) => {
            setDevice(value);
            console.log("value", value);
            setOpen(true);
          }}
        />
      </section>
    </div>
  );
}
