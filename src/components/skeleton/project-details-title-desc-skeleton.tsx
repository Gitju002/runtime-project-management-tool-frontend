export function TitleDescriptionSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-60 bg-muted rounded"></div>{" "}
      {/* Simulating Title */}
      <div className="h-4 w-80 bg-muted rounded"></div>{" "}
      {/* Simulating Description */}
      <div className="h-4 w-64 bg-muted rounded"></div> {/* Additional line */}
    </div>
  );
}
