import { PhoneFormValues } from "@/components/AddPhoneDialog";

import { PhoneValue, PricingPlan } from "@/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DeviceCost = PhoneFormValues;
interface PricingStore {
  device: PhoneValue | null;
  setDevice: (device: PhoneValue | null) => void;
  pricingPlans: PricingPlan[];
  byodPlans: PricingPlan[];
  deviceCostsNoTradeIn: PhoneFormValues[];
  deviceCostsWithTradeIn: PhoneFormValues[];
  addDevice: (name: DeviceCost) => void;
  updateDevice: (
    device: DeviceCost,
    index: number,
    withTradeIn: boolean
  ) => void;
  removeDevice: (index: number, withTradeIn: boolean) => void;
}

export const useStore = create<PricingStore>()(
  persist(
    (set) => ({
      device: null,
      setDevice: (device: PhoneValue | null) => set({ device }),
      pricingPlans: [
        {
          plan: "Ultimate",
          "1 Line": "$90",
          "2 Lines": "$80",
          "3 Lines": "$65",
          "4 Lines": "$55",
        },
        {
          plan: "Plus",
          "1 Line": "$80",
          "2 Lines": "$70",
          "3 Lines": "$55",
          "4 Lines": "$45",
        },
        {
          plan: "Welcome",
          "1 Line": "$55",
          "2 Lines": "$47.50",
          "3 Lines": "$33.34",
          "4 Lines": "$30",
        },
      ],
      byodPlans: [
        {
          plan: "Ultimate",
          "1 Line": "$75",
          "2 Lines": "$65",
          "3 Lines": "$50",
          "4 Lines": "$40",
        },
        {
          plan: "Plus",
          "1 Line": "$70",
          "2 Lines": "$60",
          "3 Lines": "$45",
          "4 Lines": "$35",
        },
        {
          plan: "Welcome",
          "1 Line": "$45",
          "2 Lines": "$37.50",
          "3 Lines": "$23.34",
          "4 Lines": "$20",
        },
      ],
      deviceCostsNoTradeIn: [],
      deviceCostsWithTradeIn: [],
      addDevice: (device: DeviceCost) =>
        set((state) => ({
          ...(device.withTradeIn
            ? {
                deviceCostsWithTradeIn: [
                  ...state.deviceCostsWithTradeIn,
                  device,
                ],
              }
            : {
                deviceCostsNoTradeIn: [...state.deviceCostsNoTradeIn, device],
              }),
        })),
      updateDevice: (device: DeviceCost, index: number, withTradeIn: boolean) =>
        set((state) => ({
          ...(withTradeIn
            ? {
                deviceCostsWithTradeIn: state.deviceCostsWithTradeIn.map(
                  (item, i) => (i === index ? device : item)
                ),
              }
            : {
                deviceCostsNoTradeIn: state.deviceCostsNoTradeIn.map(
                  (item, i) => (i === index ? device : item)
                ),
              }),
        })),
      removeDevice: (index: number, withTradeIn: boolean) =>
        set((state) => ({
          ...(withTradeIn
            ? {
                deviceCostsWithTradeIn: state.deviceCostsWithTradeIn.filter(
                  (_, i) => i !== index
                ),
              }
            : {
                deviceCostsNoTradeIn: state.deviceCostsNoTradeIn.filter(
                  (_, i) => i !== index
                ),
              }),
        })),
    }),
    {
      name: "pricing-storage",
    }
  )
);
