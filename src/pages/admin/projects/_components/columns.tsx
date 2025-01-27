"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AddProject } from "@/types/types";
import { format } from "date-fns";

export const columns: ColumnDef<AddProject>[] = [
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "projectDescription",
    header: "Project Description",
    cell: ({ row }) => (
      <p className="truncate w-[80%]">{row.original.projectDescription}</p>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.date), "PPP"),
  },
  {
    accessorKey: "projectPeriod",
    header: "Project Period",
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "clientEmail",
    header: "Client Email",
  },
  {
    accessorKey: "projectType",
    header: "Project Type",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
];
