import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardSkeletonProps {
  className?: string;
}

export function StatCardSkeleton({ className }: StatCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-teal-shade/30 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-muted rounded"></div>
              <div className="h-4 w-12 bg-muted rounded"></div>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <div className="h-8 w-8 bg-muted rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
