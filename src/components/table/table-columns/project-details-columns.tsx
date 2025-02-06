import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GetAllTaskResponse } from "@/types/types";

export const columns: ColumnDef<GetAllTaskResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "service",
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
