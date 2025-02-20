"use client";
import AddPhoneDialog from "@/components/AddPhoneDialog";
import { useStore } from "@/store/useStore";
import DataTable from "../components/DataTable";
import { deviceColumns, pricingColumns } from "@/constants";
import { useState } from "react";

// Define TypeScript interfaces for the data

export default function Home() {
  const {
    pricingPlans,
    byodPlans,
    deviceCostsNoTradeIn,
    deviceCostsWithTradeIn,
    currentDevice,
    setCurrentDevice,
    updateDevice,
    addDevice,
  } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Verizon Pricing Plans</h1>
        <AddPhoneDialog
          open={open}
          device={currentDevice}
          setOpen={setOpen}
          onSubmit={(data) => {
            if (currentDevice) {
              if (currentDevice.withTradeIn) {
                const findex = deviceCostsWithTradeIn.findIndex(
                  (device) => device.name === currentDevice.name
                );
                if (findex !== -1) {
                  const updatedDevice = (deviceCostsWithTradeIn[findex] = data);
                  updateDevice(updatedDevice, findex, data.withTradeIn);
                }
              } else {
                const findex = deviceCostsNoTradeIn.findIndex(
                  (device) => device.name === currentDevice.name
                );
                if (findex !== -1) {
                  deviceCostsNoTradeIn[findex] = data;
                  const updatedDevice = (deviceCostsWithTradeIn[findex] = data);
                  updateDevice(updatedDevice, findex, data.withTradeIn);
                }
              }
            } else {
              addDevice(data);
              setCurrentDevice(null);
              setOpen(false);
            }
          }}
        />
      </div>
      <div className="flex gap-3 mb-2">
        <p className="text-md font-semibold italic">
          With Unlimited Welcome Offer (1 - 3) lines
        </p>{" "}
        <span className="text-orange-500">Expire 03/31</span>
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
        <DataTable
          columns={deviceColumns}
          data={deviceCostsNoTradeIn}
          onEdit={(value) => {
            setCurrentDevice(value);
            setOpen(true);
          }}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Device Costs (With Trade-In)
        </h2>
        <DataTable
          columns={deviceColumns}
          data={deviceCostsWithTradeIn}
          onEdit={(value) => {
            setCurrentDevice(value);
            setOpen(true);
          }}
        />
      </section>
    </div>
  );
}
