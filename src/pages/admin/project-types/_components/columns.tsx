"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ProjectType } from "@/pages/admin/project-types/index";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location;
      return location ? (
        <Badge variant="outline">{location}</Badge>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
];
