import { Combobox } from "@/components/ui/combo-box";
import React, { useEffect, useState } from "react";
import PieChartComponent from "./_components/pie-chart";
import BarChartComponent from "./_components/bar-chart";
import TaskCompletedComponent from "./_components/task-completed";
import { DataTable } from "@/components/table/data-table";
import { TableTask } from "@/types/types";
import { columns } from "../../../components/table/table-columns/analytics-columns";
import { useGetTaskByUserIDQuery } from "@/store/api/tasks";
import { transformTasks } from "@/utils/tasksFormatting";
import { useGetUsersListQuery } from "@/store/api/user";
import { useSearchParams } from "next/navigation";
import { AnalyticsCardsSkeleton } from "@/components/skeleton/analytics-card-skeleton";

export default function Analytics() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const userName = params.get("userName");
    if (userName) {
      setSelectedUser(userName);
    }
  }, [searchParams]);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isSuccess: tasksSuccess,
    isError: tasksIsError,
    isFetching,
  } = useGetTaskByUserIDQuery({
    page: currentPage,
    limit,
    userName: selectedUser,
  });

  const {
    data: usersData,
    isLoading: usersLoading,
    isSuccess: usersSuccess,
    isError: usersIsError,
  } = useGetUsersListQuery();

  // const handleNameChange = (name: string) => {
  //   setSelectedUser(name);
  // };

  useEffect(() => {
    if (tasksData) {
      setTotalPages(tasksData?.data.paginationData.totalPages);
    }
  }, [tasksData]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.data);
    }
  }, [usersData]);

  // console.log("Tasks Data", tasksData);

  const formattedTasks = tasksIsError ? [] : transformTasks(tasksData, limit);
  return (
    <div className="container mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="block w-full text-2xl font-bold">
            Analytics of{" "}
            <span className="text-teal-shade dark:text-lime-shade">
              {selectedUser}
            </span>
          </h1>

          {/* <div className="w-full">
            <Combobox
              value={selectedUser}
              onChange={handleNameChange}
              data={users}
            />
          </div> */}
        </div>
        {tasksData && selectedUser ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-2 ">
            <TaskCompletedComponent
              userName={selectedUser}
              taskdata={tasksData}
            />
            <PieChartComponent userName={selectedUser} taskdata={tasksData} />
            <BarChartComponent userName={selectedUser} taskdata={tasksData} />
          </div>
        ) : (
          <div className="flex flex-col items-center border rounded-md justify-center h-96">
            <img
              src="/images/no-analytics.png"
              alt="No projects found"
              className="w-36 h-36 mb-4"
            />
            <p className="text-lg font-semibold text-gray-600">
              No Data found.
            </p>
            <p className="text-sm text-gray-500">
              Please add a task to view Analytics.
            </p>
          </div>
        )}
        <h1 className="text-sm md:text-base lg:text-xl font-bold">
          Daily Update Task Table of{" "}
          <span className="dark:text-lime-shade capitalize">
            {users.find((user) => user.value === selectedUser)?.label}
          </span>
        </h1>
        <DataTable
          columns={columns}
          isLoading={tasksLoading || isFetching}
          data={formattedTasks}
        />
      </div>
    </div>
  );
}
