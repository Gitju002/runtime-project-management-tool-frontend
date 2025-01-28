import { motion } from "framer-motion";

import type { ColumnDef } from "@tanstack/react-table";
import type { AddedProjectType } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<AddedProjectType>[] = [
  {
    accessorKey: "project",
    header: "Project Name",
  },
  {
    accessorKey: "projectDescription",
    header: "Project Description",
    cell: ({ row }) => {
      const [isExpanded, setIsExpanded] = React.useState(false);
      const description = row.original.projectDescription;

      const truncatedDescription =
        description.length > 30
          ? `${description.slice(0, 30)}...`
          : description;

      return (
        <div className="text-wrap items-center gap-1">
          <p className="inline">
            {isExpanded ? description : truncatedDescription}
          </p>
          {description.length > 30 && (
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 cursor-pointer text-xs text-nowrap text-slate-600"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.date), "PPP"),
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
