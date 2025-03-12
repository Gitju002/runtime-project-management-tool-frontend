import type { ColumnDef } from "@tanstack/react-table";
import type { Service } from "@/pages/admin/services/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialogDeleteService } from "@/components/ui/alert-dialog-delete-service";

export const columns: ColumnDef<Service>[] = [
  // {
  //   accessorKey: "id",
  //   header: "SL No.",
  // },
  {
    accessorKey: "serviceName",
    header: "Service Name",
  },
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
              <AlertDialogDeleteService serviceId={row.original._id} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.serviceName)
              }
            >
              Copy Service Name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
