"use client"; // Required for client-side rendering

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the schema for validation using Zod
const phoneSchema = z.object({
  name: z.string().min(1, { message: "Device name is required" }),
  ultimate: z.union([
    z.string().regex(/^\$?\d+(\.\d{1,2})?$/, "Invalid price format"),
    z.literal("N/A"),
  ]),
  plus: z.union([
    z.string().regex(/^\$?\d+(\.\d{1,2})?$/, "Invalid price format"),
    z.literal("N/A"),
  ]),
  welcome: z.union([
    z.string().regex(/^\$?\d+(\.\d{1,2})?$/, "Invalid price format"),
    z.literal("N/A"),
  ]),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;

interface AddPhoneProps {
  onSubmit: (data: PhoneFormValues) => void;
}

const AddPhone: React.FC<AddPhoneProps> = ({ onSubmit }) => {
  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      name: "",
      ultimate: "N/A",
      plus: "N/A",
      welcome: "N/A",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<PhoneFormValues> = (data) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Device Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter device name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ultimate Price */}
        <FormField
          control={form.control}
          name="ultimate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ultimate Price</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="$0">$0</SelectItem>
                  <SelectItem value="$5/36M">$5/36M</SelectItem>
                  <SelectItem value="$6/36M">$6/36M</SelectItem>
                  <SelectItem value="$7/36M">$7/36M</SelectItem>
                  <SelectItem value="$9/36M">$9/36M</SelectItem>
                  <SelectItem value="$10/36M">$10/36M</SelectItem>
                  <SelectItem value="$15/36M">$15/36M</SelectItem>
                  <SelectItem value="$23/36M">$23/36M</SelectItem>
                  <SelectItem value="$29/36M">$29/36M</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Plus Price */}
        <FormField
          control={form.control}
          name="plus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plus Price</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="$0">$0</SelectItem>
                  <SelectItem value="$5/36M">$5/36M</SelectItem>
                  <SelectItem value="$6/36M">$6/36M</SelectItem>
                  <SelectItem value="$7/36M">$7/36M</SelectItem>
                  <SelectItem value="$9/36M">$9/36M</SelectItem>
                  <SelectItem value="$10/36M">$10/36M</SelectItem>
                  <SelectItem value="$15/36M">$15/36M</SelectItem>
                  <SelectItem value="$23/36M">$23/36M</SelectItem>
                  <SelectItem value="$29/36M">$29/36M</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Welcome Price */}
        <FormField
          control={form.control}
          name="welcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Welcome Price</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="$0">$0</SelectItem>
                  <SelectItem value="$5/36M">$5/36M</SelectItem>
                  <SelectItem value="$6/36M">$6/36M</SelectItem>
                  <SelectItem value="$7/36M">$7/36M</SelectItem>
                  <SelectItem value="$9/36M">$9/36M</SelectItem>
                  <SelectItem value="$10/36M">$10/36M</SelectItem>
                  <SelectItem value="$15/36M">$15/36M</SelectItem>
                  <SelectItem value="$23/36M">$23/36M</SelectItem>
                  <SelectItem value="$29/36M">$29/36M</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Add Phone</Button>
      </form>
    </Form>
  );
};

export default AddPhone;
