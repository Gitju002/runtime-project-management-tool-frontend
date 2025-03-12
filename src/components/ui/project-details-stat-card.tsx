import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatCardSkeleton } from "../skeleton/project-details-stat-card-skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
  isLoading: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  className,
  isLoading,
}: StatCardProps) {
  return isLoading ? (
    <StatCardSkeleton />
  ) : (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-teal-shade/30 hover:shadow-lg",
        className
      )}
    >
      <CardContent className=" p-6">
        <div className="flex items-center justify-between gap-2 ">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-nowrap">
                {value}
              </h2>
              {description && (
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          </div>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
