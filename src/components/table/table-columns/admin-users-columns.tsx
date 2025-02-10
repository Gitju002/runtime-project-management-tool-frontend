import type { ColumnDef } from "@tanstack/react-table";
import { ExternalUser } from "@/types/types";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"; // Import ShadCN Tooltip components
import Image from "next/image";

export const UserAnalytics = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("userName", userName);
    router.push(`/admin/analytics?${params.toString()}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer hover:underline" onClick={handleClick}>
          {userName}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to view analytics</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const columns: ColumnDef<ExternalUser>[] = [
  {
    accessorKey: "profilepic",
    header: "Profile Pic",
    cell: ({ row }) => (
      <Image
        src={row.original.profilepic}
        alt={row.original.name}
        width={40}
        height={40}
        className="rounded-full object-cover w-10 h-10"
      />
    ),
  },
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
