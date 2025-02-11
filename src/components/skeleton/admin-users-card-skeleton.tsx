import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30 pb-8 pt-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
