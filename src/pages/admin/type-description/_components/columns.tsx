"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ProjectType } from "@/pages/admin/type-description/index";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "description",
    header: "Type Description",
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
