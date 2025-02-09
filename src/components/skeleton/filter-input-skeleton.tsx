import { Skeleton } from "../ui/skeleton";

export function FilterInputsSkeleton() {
  return (
    <div className="flex gap-4 justify-between items-center w-full">
      <div className="flex justify-between items-center gap-4 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-10 w-full border border-teal-shade"
          />
        ))}
      </div>
    </div>
  );
}
