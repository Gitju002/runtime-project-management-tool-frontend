import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewTabSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {/* Project Type Description Skeleton */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="h-6 w-40 bg-muted rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-2/3 bg-muted rounded"></div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                  <div>
                    <div className="h-4 w-24 bg-muted rounded"></div>
                    <div className="h-3 w-20 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Progress Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-40 bg-muted rounded"></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="h-28 w-28 bg-muted rounded-full"></div>
          <div className="h-6 w-16 bg-muted rounded"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    </div>
  );
}
