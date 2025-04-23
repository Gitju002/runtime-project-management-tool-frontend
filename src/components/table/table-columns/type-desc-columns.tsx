import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ProjectTypeDesc } from "@/types/types";
import { ProjectDetails } from "./projects-columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialogDeleteTypeDesc } from "@/components/ui/alert-dialog-delete-type-desc";

export const columns: ColumnDef<Partial<ProjectTypeDesc>>[] = [
  {
    accessorKey: "projectTypeDescription",
    header: "Type Description",
  },
  {
    accessorKey: "project",
    header: "Project Name",
    cell: ({ row }) => {
      const projectName =
        typeof row.original.project === "string" ? row.original.project : "N/A";
      return <ProjectDetails projectName={projectName} />;
    },
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <AlertDialogDeleteTypeDesc
                projectTypeDescId={row.original._id || "N/A"}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  row.original.projectTypeDescription || "N/A"
                )
              }
            >
              Copy Type Description
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
