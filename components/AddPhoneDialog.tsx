"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import PhoneValuesSelector from "./PhoneValuesSelector";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
// ... other imports remain the same ...

// Schema definition remains the same
const phoneSchema = z.object({
  name: z.string().min(1, { message: "Device name is required" }),
  price: z.string().min(3, { message: "Device name is required" }),
  ultimate: z.union([z.string(), z.literal("N/A")]),
  plus: z.union([z.string(), z.literal("N/A")]),
  welcome: z.union([z.string(), z.literal("N/A")]),
  expires: z.string(),
  withTradeIn: z.boolean().default(false),
});
export type PhoneFormValues = z.infer<typeof phoneSchema>;

type AddPhoneDialogProps = {
  onSubmit: (data: PhoneFormValues) => void;
  open: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

const AddPhoneDialog: React.FC<AddPhoneDialogProps> = ({
  onSubmit,
  open,
  setOpen,
  trigger,
}) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const device = useStore((s) => s.device);
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      name: device?.name || "",
      price: device?.price || "",
      ultimate: device?.ultimate || "N/A",
      plus: device?.plus || "N/A",
      welcome: device?.welcome || "N/A",
      expires: device?.expires || format(new Date(), "MM-dd"),
      withTradeIn: device?.withTradeIn || false,
    },
  });

  const handleSubmit: SubmitHandler<PhoneFormValues> = (data) => {
    onSubmit({
      ...data,
    });
    form.reset();
    if (setOpen) setOpen(false);
  };

  useEffect(() => {
    if (device) {
      form.setValue("name", device.name);
      form.setValue("price", device.price);
      form.setValue("ultimate", device.ultimate);
      form.setValue("plus", device.plus);
      form.setValue("welcome", device.welcome);
      form.setValue("expires", device.expires);
      form.setValue("withTradeIn", device.withTradeIn);
    } else {
      form.reset();
    }
  }, [device, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            onClick={() => {
              if (!open) {
                form.reset();
              }
            }}
            variant="default"
          >
            Add New Phone
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Add New Phone</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Device Name */}
            <FormField
              control={form.control}
              name="withTradeIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">
                    With Trade-in
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter device name"
                      {...field}
                      className="capitalize"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Retail Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$999.99"
                      {...field}
                      className="capitalize"
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter price" />
                      </SelectTrigger>
                    </FormControl>
                    <PhoneValuesSelector />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter price" />
                      </SelectTrigger>
                    </FormControl>
                    <PhoneValuesSelector />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter price" />
                      </SelectTrigger>
                    </FormControl>
                    <PhoneValuesSelector />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expires"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover open={calendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          onClick={() => setCalendarOpen(true)}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(format(date!, "MM-dd"));
                          setCalendarOpen(false);
                        }}
                        // disabled={(date) =>
                        //   date < new Date() || date > new Date("2025-01-01")
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button className="w-full my-2" type="submit">
              {device ? "Update Phone" : "Add Phone"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhoneDialog;
