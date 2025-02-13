"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export const category = [
  {
    value: "brinzales",
    label: "Brinzales (< 2,5 cm y altura ≥ 0,3m)",
  },
  {
    value: "latizales",
    label: "Latizales (10 cm > DAP ≥ 2,5 cm)",
  },
  {
    value: "fustales_pequenos",
    label: "Fustales (30 cm > DAP ≥ 10 cm)",
  },
  {
    value: "futales_grandes",
    label: "Fustales Grandes (DAP ≥ 30 cm)",
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por nombre de usuario..."
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("categoria") && (
          <DataTableFacetedFilter
            column={table.getColumn("categoria")}
            title="Categoría"
            options={category}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}