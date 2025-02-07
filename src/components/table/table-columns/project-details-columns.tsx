import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/types";
import { format } from "date-fns";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "user.name",
    id: "Username",
    header: "Username",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.date), "PPP"),
  },
  {
    accessorKey: "service.serviceName",
    header: "Service",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }: { row: { original: GetAllTaskResponse } }) => (
  //     <Badge
  //       variant={
  //         row.original.status === "Initiated"
  //           ? "initial"
  //           : row.original.status === "Ongoing"
  //           ? "ongoing"
  //           : "success"
  //       }
  //     >
  //       {row.original.status}
  //     </Badge>
  //   ),
  // },
];
