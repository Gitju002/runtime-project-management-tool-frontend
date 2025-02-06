"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ExternalUser, User } from "@/types/types";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export const UserAnalytics = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("userName", userName);
    router.push(`/admin/analytics?${params.toString()}`);
  };
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {userName}
    </div>
  );
};

export const columns: ColumnDef<ExternalUser>[] = [
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => <UserAnalytics userName={row.original.name} />,
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
