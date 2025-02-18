import { useGetProjectListQuery } from "@/store/api/project";
import { useGetAllUsersQuery } from "@/store/api/user";
import { useEffect, useState } from "react";
import StatCard from "@/components/ui/admin-stat-card";
import { StatCardSkeleton } from "@/components/skeleton/admin-statcard-skeleton";
import { Button } from "@/components/ui/button";
import { CircleHelp, FileQuestion, ShieldQuestion } from "lucide-react";
import { startTour } from "@/driver";
import { useRouter } from "next/router";

const Admin: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState<{ title: string; value: number }[]>([]);
  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching,
  } = useGetAllUsersQuery({});
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
        { title: "Total Projects", value: projectLists?.data.length },
      ]);
    }
  }, [projectLists]);

  const isLoading = isUserLoading || isProjectLoading; // ✅ Added loading state

  return (
    <div className="relative container mx-auto w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl font-bold">
          Welcome to the Admin Dashboard
        </h1>
      </div>

      <div
        id="admin_home_statcard"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {isLoading || isFetching
          ? [...Array(2)].map((_, index) => <StatCardSkeleton key={index} />) // ✅ Show skeleton while loading
          : stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                targetValue={stat.value}
                isLoading={isLoading}
              />
            ))}
      </div>

      {/* Placeholder for more features */}
      <div
        id="admin_home_placeholder"
        className="border-2 border-dashed border-teal-shade/50 min-h-96 w-full bg-slate-100 dark:bg-slate-800/50 rounded-md flex flex-col items-center justify-center mt-6 cursor-not-allowed"
      >
        <span className="text-teal-shade">Placeholder for more content</span>
      </div>
      <div className="absolute bottom-12 right-4 flex items-center space-x-2">
        <Button
          onClick={() => startTour(router)}
          className="rounded-full bg-blue-600 hover:bg-blue-600/80 transition-colors duration-200"
          variant={"outline"}
          size={"icon"}
        >
          <CircleHelp size={28} />
        </Button>
      </div>
    </div>
  );
};

export default Admin;
