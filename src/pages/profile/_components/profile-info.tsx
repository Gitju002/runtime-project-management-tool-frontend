import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

type ProfileInfoProps = {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  loading: boolean;
  bgColor: string;
  iconColor: string;
};

export default function ProfileInfo({
  icon: Icon,
  label,
  value,
  loading,
  bgColor = "bg-gray-100",
  iconColor = "text-gray-500",
}: ProfileInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <div
        className={`flex-shrink-0 w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
      >
        {Icon ? <Icon className={`h-5 w-5 ${iconColor}`} /> : null}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-blue-500 truncate">{label}</p>
        {loading ? (
          <Skeleton className="h-5 w-[100px] mt-1" />
        ) : (
          <p className="text-sm text-foreground font-semibold truncate">
            {value || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
}
