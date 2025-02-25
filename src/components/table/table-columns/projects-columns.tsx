import type { ColumnDef } from "@tanstack/react-table";
import type { Project } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogDeleteProject } from "@/components/ui/alert-dialog-delete-project";

const ExpandedComponent = ({ data }: { data: string }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const truncatedDescription =
    data.length > 10 ? `${data.slice(0, 10)}...` : data;

  return (
    <div className="text-wrap items-center gap-1">
      <p className="inline">{isExpanded ? data : truncatedDescription}</p>
      {data.length > 10 && (
        <Button
          variant="link"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer text-xs text-nowrap transition-colors duration-300 dark:text-slate-400 text-slate-600 px-0 ml-1"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
};

export const ProjectDetails = ({ projectName }: { projectName: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.set("projectName", projectName);
    router.push(`/admin/projects/project-details?${params.toString()}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer  hover:underline" onClick={handleClick}>
          {projectName}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to view Project Details</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Accept handleSortClick as a parameter
export const getColumns = (
  handleSortClick: (columnName: string) => void
): ColumnDef<Project>[] => {
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
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },

    {
      accessorKey: "projectName",
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSortClick("projectName")}
        >
          Project Name
          {renderSortIcon("projectName")}
        </div>
      ),

      cell: ({ row }) => (
        <ProjectDetails projectName={row.original.projectName} />
      ),
    },

    {
      accessorKey: "projectDescription",
      header: () => <div>Project Description</div>,
      cell: ({ row }) => (
        <ExpandedComponent data={row.original.projectDescription} />
      ),
    },

    {
      accessorKey: "projectDate",
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSortClick("projectDate")}
        >
          Date
          {renderSortIcon("projectDate")}
        </div>
      ),
      cell: ({ row }) => format(new Date(row.original.projectDate), "PPP"),
    },

    {
      accessorKey: "projectPeriod",
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSortClick("projectPeriod")}
        >
          Project Period
          {renderSortIcon("projectPeriod")}
        </div>
      ),
    },

    // {
    //   accessorKey: "clientName",
    //   header: () => (
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={() => handleSortClick("clientName")}
    //     >
    //       Client Name
    //       {renderSortIcon("clientName")}
    //     </div>
    //   ),
    // },

    // {
    //   accessorKey: "clientEmail",
    //   header: () => (
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={() => handleSortClick("clientEmail")}
    //     >
    //       Client Email
    //       {renderSortIcon("clientEmail")}
    //     </div>
    //   ),
    // },

    // {
    //   accessorKey: "projectType",
    //   header: () => (
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={() => handleSortClick("projectType")}
    //     >
    //       Project Type
    //       {renderSortIcon("projectType")}
    //     </div>
    //   ),
    // },

    // {
    //   accessorKey: "cost",
    //   header: () => (
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={() => handleSortClick("cost")}
    //     >
    //       Cost
    //       {renderSortIcon("cost")}
    //     </div>
    //   ),
    // },

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
                <AlertDialogDeleteProject projectId={row.original._id} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.original.projectName)
                }
              >
                Copy Project Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
