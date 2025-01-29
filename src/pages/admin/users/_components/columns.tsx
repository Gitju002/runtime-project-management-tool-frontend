"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
