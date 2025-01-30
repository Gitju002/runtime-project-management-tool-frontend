import { ColumnDef } from "@tanstack/react-table";
import { TableTask } from "@/types/types";
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<TableTask>[] = [
  {
    accessorKey: "slno",
    header: "SL No.",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.date, // Formats date for better readability
  },
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "services",
    header: "Services",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => row.original.startDate, // Formats start date
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "finishDate",
    header: "Finish Date",
    cell: ({ row }) => row.original.finishDate, // Formats finish date
  },
  {
    accessorKey: "finishTime",
    header: "Finish Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "Initiated"
            ? "initial"
            : row.original.status === "Ongoing"
            ? "ongoing"
            : "success"
        }
      >
        {row.original.status}
      </Badge>
    ), // Adds color coding for status
  },
];
