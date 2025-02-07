import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/types";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "user.name",
    header: "Username",
  },
  {
    accessorKey: "date",
    header: "Date",
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
