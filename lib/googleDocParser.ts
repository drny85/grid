import axios from "axios";

// Define TypeScript interfaces for the parsed data
interface PricingPlan {
  plan: string;
  prices: { [key: string]: string };
}

interface DeviceCost {
  device: string;
  ultimate: string;
  plus: string;
  welcome: string;
}

export const fetchAndParseGoogleSheet = async (): Promise<{
  pricingPlans: PricingPlan[];
  byodPlans: PricingPlan[];
  deviceCostsNoTradeIn: DeviceCost[];
  deviceCostsWithTradeIn: DeviceCost[];
}> => {
  try {
    // Replace with your Google Sheet's published CSV URL
    // const url =
    //   "https://docs.google.com/spreadsheets/d/1UKfio1s4ItIyE2Mx11kBIIGOPHE4OLvogiuzEn0OJrg/edit?usp=sharing";
    const docId = "1UKfio1s4ItIyE2Mx11kBIIGOPHE4OLvogiuzEn0OJrg";
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${docId}/export?format=csv`
    );
    const text = response.data;

    // Split the content into rows
    const rows = text.split("\n").filter((row: string) => row.trim());
    const data = rows.map((row: string) => row.split(","));

    // Helper function to parse pricing plans
    const parsePricingPlans = (
      sectionStart: number,
      sectionEnd: number
    ): PricingPlan[] => {
      const headers = data[sectionStart].map((header: string) =>
        header.trim().replace(/[*]/g, "")
      ); // Remove asterisks
      const plans: PricingPlan[] = [];

      for (let i = sectionStart + 1; i < sectionEnd; i++) {
        const values = data[i].map((value: string) => value.trim());
        const plan: PricingPlan = {
          plan: values[0],
          prices: {},
        };

        for (let j = 1; j < headers.length; j++) {
          plan.prices[headers[j]] = values[j] || "NA"; // Use headers to map values
        }

        if (plan.plan) plans.push(plan);
      }

      return plans;
    };

    // Helper function to parse device costs
    const parseDeviceCosts = (
      sectionStart: number,
      sectionEnd: number
    ): DeviceCost[] => {
      const headers = data[sectionStart].map((header: string) =>
        header.trim().replace(/[*]/g, "")
      ); // Remove asterisks
      const devices: DeviceCost[] = [];

      for (let i = sectionStart + 1; i < sectionEnd; i++) {
        const values = data[i].map((value: string) => value.trim());
        const device: DeviceCost = {
          device: "",
          ultimate: "NA",
          plus: "NA",
          welcome: "NA",
        };

        // Map values to headers dynamically
        headers.forEach((header: string, index: number) => {
          if (header.toLowerCase().includes("device")) {
            device.device = values[index] || "Unknown";
          } else if (header.toLowerCase().includes("ultimate")) {
            device.ultimate = values[index] || "NA";
          } else if (header.toLowerCase().includes("plus")) {
            device.plus = values[index] || "NA";
          } else if (header.toLowerCase().includes("welcome")) {
            device.welcome = values[index] || "NA";
          }
        });

        if (device.device) devices.push(device);
      }

      return devices;
    };

    // Identify sections in the sheet
    const pricingPlansSection = parsePricingPlans(1, 5); // Rows for "Pricing Plans"
    const byodPlansSection = parsePricingPlans(8, 12); // Rows for "BYOD Plans"
    const deviceCostsNoTradeInSection = parseDeviceCosts(16, 29); // Rows for "NO Trade IN"
    const deviceCostsWithTradeInSection = parseDeviceCosts(32, 45); // Rows for "With Trade IN"

    return {
      pricingPlans: pricingPlansSection,
      byodPlans: byodPlansSection,
      deviceCostsNoTradeIn: deviceCostsNoTradeInSection,
      deviceCostsWithTradeIn: deviceCostsWithTradeInSection,
    };
  } catch (err) {
    console.error("Error fetching or parsing Google Sheet:", err);
    throw err;
  }
};
