import type { ColumnDef } from "@tanstack/react-table";
import { ExternalUser, User } from "@/types/types";

export const columns: ColumnDef<ExternalUser>[] = [
  {
    accessorKey: "name",
    header: "User Name",
  },
  {
    accessorKey: "office_name",
    header: "Office Name",
  },
  {
    accessorKey: "department_name",
    header: "Department Name",
  },
];
