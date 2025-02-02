import type { ColumnDef } from "@tanstack/react-table";
import type { Service } from "@/pages/admin/services/index";

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "id",
    header: "SL No.",
  },
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "serviceName",
    header: "Service Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
