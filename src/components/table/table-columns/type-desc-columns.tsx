import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ProjectTypeDesc } from "@/types/types";

export const columns: ColumnDef<Partial<ProjectTypeDesc>>[] = [
  {
    accessorKey: "projectTypeDescription",
    header: "Type Description",
  },
  {
    accessorKey: "project",
    header: "Project Name",
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
