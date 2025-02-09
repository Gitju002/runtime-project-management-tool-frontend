import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-96 w-full rounded-md" />
      ))}
    </>
  );
}
