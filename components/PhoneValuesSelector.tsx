import React from "react";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { phoneRetailValue } from "@/constants";

const PhoneValuesSelector = () => {
  return (
    <SelectContent defaultValue={"N/A"}>
      <SelectItem value="N/A">N/A</SelectItem>
      <SelectItem value="$0">$0</SelectItem>
      {phoneRetailValue.map((value) => (
        <SelectItem key={value} value={`$${Math.ceil(value / 36)} / 36M`}>
          ${Math.ceil(value / 36)} / 36M
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default PhoneValuesSelector;
