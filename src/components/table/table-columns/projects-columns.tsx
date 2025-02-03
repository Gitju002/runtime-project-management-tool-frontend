import type { ColumnDef } from "@tanstack/react-table";
import type { Project } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button";

const ExpandedComponent = ({ data }: { data: string }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const truncatedDescription =
    data.length > 10 ? `${data.slice(0, 10)}...` : data;

  return (
    <div className="text-wrap items-center gap-1">
      <p className="inline">{isExpanded ? data : truncatedDescription}</p>
      {data.length > 10 && (
        <Button
          variant={"link"}
          size={"sm"}
          onClick={() => setIsExpanded(!isExpanded)}
          className=" cursor-pointer text-xs text-nowrap transition-colors duration-300 dark:text-slate-100 text-slate-600 px-0"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "projectDescription",
    header: "Project Description",
    cell: ({ row }) => {
      return <ExpandedComponent data={row.original.projectDescription} />;
    },
  },

  {
    accessorKey: "projectDate",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.projectDate), "PPP"),
  },
  {
    accessorKey: "projectPeriod",
    header: "Project Period",
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "clientEmail",
    header: "Client Email",
  },
  {
    accessorKey: "projectType",
    header: "Project Type",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
];
