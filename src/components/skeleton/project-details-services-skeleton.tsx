import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesTabSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="h-4 w-32 bg-muted rounded"></CardTitle>
              <div className="h-8 w-8 bg-muted rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 w-full bg-muted rounded mb-2"></div>
              <div className="h-3 w-2/3 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
