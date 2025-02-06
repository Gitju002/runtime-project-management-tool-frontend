import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProjectListQuery } from "@/store/api/project";
import { useGetAllUsersQuery } from "@/store/api/user";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

// Type Definitions
interface Stat {
  title: string;
  value: number;
}

// Stats Data
// const stats: Stat[] = [
//   { title: "Total Users", value: 24 },
//   { title: "Initiated Projects", value: 12 },
//   { title: "Ongoing Projects", value: 8 },
//   { title: "Completed Projects", value: 156 },
// ];

// Reusable Stat Card Component
interface StatCardProps {
  title: string;
  targetValue: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, targetValue }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, targetValue, { duration: 2 });
    return () => animation.stop(); // Cleanup on unmount
  }, [count, targetValue]);

  return (
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

// Main Admin Component
const Admin: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const { data: userData } = useGetAllUsersQuery({});

  const { data: projectLists, isLoading: isProjectLoading } =
    useGetProjectListQuery();

  useEffect(() => {
    if (userData) {
      setStats((prev) => [
        ...prev,
        {
          title: "Total Users",
          value: userData?.data.paginationData.totalUsers,
        },
      ]);
    }
  }, [userData]);

  useEffect(() => {
    if (projectLists) {
      setStats((prev) => [
        ...prev,
        {
          title: "Total Projects",
          value: projectLists?.data.length,
        },
      ]);
    }
  }, [projectLists]);

  return (
    <div className="container mx-auto w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl font-bold">
          Welcome to the Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} targetValue={stat.value} />
        ))}
      </div>

      {/* Placeholder for more features */}
      <div className="border-2 border-dashed border-teal-shade/50 min-h-96 w-full bg-slate-100 dark:bg-slate-800/50 rounded-md flex flex-col items-center justify-center mt-6 cursor-not-allowed">
        <span className="text-teal-shade">Placeholder for more content</span>
      </div>
    </div>
  );
};

export default Admin;
