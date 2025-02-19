import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface UserTaskGroupSkeletonProps {
  index: number;
}

function UserTaskGroupSkeleton({ index }: UserTaskGroupSkeletonProps) {
  return (
    <div>
      <Card
        key={index}
        className="shadow-md dark:shadow-black/20 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 bg-gradient-to-br from-white to-slate-50"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-4 w-48 mt-2" />
          <Skeleton className="h-4 w-32 mt-1" />
        </CardHeader>
        <CardContent className="py-4">
          <ScrollArea className="h-24 pr-4 mt-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 justify-between">
                  <div className="w-full flex flex-row justify-between items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                {index < 2 && <div className="h-4 ml-2 my-1"></div>}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserTaskGroupSkeleton;
