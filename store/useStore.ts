import { PhoneFormValues } from "@/components/AddPhoneDialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PricingPlan {
  plan: string;
  "1 Line": string;
  "2 Lines": string;
  "3 Lines": string;
  "4 Lines": string;
  "5 Lines": string;
}

type DeviceCost = PhoneFormValues;
interface PricingStore {
  currentDevice: PhoneFormValues | null;
  setCurrentDevice: (device: PhoneFormValues | null) => void;
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
      currentDevice: null,
      setCurrentDevice: (device: PhoneFormValues | null) =>
        set({ currentDevice: device }),
      pricingPlans: [
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
      ],
      byodPlans: [
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
