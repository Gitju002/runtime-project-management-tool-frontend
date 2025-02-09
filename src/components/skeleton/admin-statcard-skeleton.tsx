import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";
export const StatCardSkeleton = () => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="md:text-lg">
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-end gap-2">
          <Skeleton className="h-16 w-24 bg-gray-300 dark:bg-gray-700" />
        </CardContent>
      </Card>
    </motion.div>
  );
};
