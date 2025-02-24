"use client"; // Required for client-side rendering

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onEdit?: (data: TData) => void;
}

const DataTable = <TData,>({
  columns,
  data,
  onEdit,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-green-600 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-white">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn("px-6 py-4 capitalize", {
                    "text-red-500": cell.getValue() === "N/A",
                    "text-green-500 font-semibold": cell.getValue() === "$0",
                    "text-lg font-bold text-black/80 dark:text-white/80":
                      cell.column.id === "name" || cell.column.id === "plan",
                    "text-base": cell.column.id !== "name",
                    "text-orange-400": cell.column.id === "expires",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {cell.column.id === "name" && (
                    <div className="flex">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        (${cell.getContext().row.renderValue("price")})
                      </span>
                    </div>
                  )}
                  {cell.column.id === "action" && (
                    <div className="hidden md:flex">
                      <EditIcon
                        color="purple"
                        onClick={() => {
                          const value = cell.getContext().row.original;
                          if (onEdit) onEdit(value);
                        }}
                      />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
