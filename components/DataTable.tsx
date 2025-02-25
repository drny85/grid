"use client"; // Required for client-side rendering

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { ArrowUpDown, EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead
          className={cn(
            "text-xs text-gray-700 uppercase bg-green-600 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn("px-6 py-3 text-white", {
                    "text-left": header.column.id === "name",
                  })}
                >
                  {header.isPlaceholder ? null : (
                    <Button
                      variant="ghost"
                      className="text-white hover:text-white/90 hover:bg-slate-500"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </Button>
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
                    "text-lg font-bold text-left text-black/80 dark:text-white/80":
                      cell.column.id === "name" || cell.column.id === "plan",
                    "text-base": cell.column.id !== "name",
                    "text-orange-400": cell.column.id === "expires",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}

                  {cell.column.id === "action" && (
                    <div className="hidden md:flex items-center justify-center ">
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
