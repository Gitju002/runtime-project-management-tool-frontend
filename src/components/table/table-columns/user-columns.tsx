import { ColumnDef } from "@tanstack/react-table";
import { TableTask } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Accept handleSortClick as a parameter
export const getColumns = (
  handleSortClick: (columnName: string) => void
): ColumnDef<TableTask>[] => {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy");

  const renderSortIcon = (columnName: string) => {
    if (currentSort === columnName) {
      return <ArrowUp size={16} className="ml-1 text-blue-500" />;
    } else if (currentSort === `-${columnName}`) {
      return <ArrowDown size={16} className="ml-1 text-blue-500" />;
    }
    return <ArrowUp size={16} className="ml-1 text-gray-400" />; // Default inactive state
  };
  return [
    {
      accessorKey: "slno",
      header: () => <div>Sl No.</div>,
    },
    {
      accessorKey: "date",
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSortClick("date")}
        >
          Date
          {renderSortIcon("date")}
        </div>
      ),
      cell: ({ row }) => row.original.date, // Formats date for better readability
    },
    {
      accessorKey: "projectName",
      header: () => <div>Project Name</div>,
    },
    {
      accessorKey: "services",
      header: () => <div>Services</div>,
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
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSortClick("status")}
        >
          Status
          {renderSortIcon("status")}
        </div>
      ),
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
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem>Delete Task</DropdownMenuItem>
    //           <DropdownMenuItem>Edit Task</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];
};
