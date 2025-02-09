import { StatCardSkeleton } from "@/components/skeleton/admin-statcard-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface StatCardProps {
  title: string;
  targetValue: number;
  isLoading: boolean; // ✅ Added isLoading as a prop
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  targetValue,
  isLoading,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (!isLoading) {
      const animation = animate(count, targetValue, { duration: 2 });
      return () => animation.stop();
    }
  }, [count, targetValue, isLoading]);

  return isLoading ? (
    <StatCardSkeleton />
  ) : (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="md:text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-end gap-2">
          <motion.h1 className="text-end text-6xl font-semibold dark:text-lime-shade">
            {rounded}
          </motion.h1>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
