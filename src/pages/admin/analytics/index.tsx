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

// const users = [
//   { value: "snehashis", label: "Snehashis Gharai" },
//   { value: "purbarun", label: "Purbarun Mondal" },
//   { value: "priyansu", label: "Priyansu Chowdhury" },
//   { value: "Abhijit Dinda", label: "Abhijit Dinda" },
//   { value: "abdul", label: "Sayed Abdul" },
// ];

// const projects: TableTask[] = [
//   {
//     slno: 1,
//     date: "2021-09-01",
//     projectName: "Project 1",
//     services: "Service 1",
//     purpose: "Purpose 1",
//     startDate: "2021-09-01",
//     startTime: "10:00 AM",
//     finishDate: "2021-09-01",
//     finishTime: "12:00 PM",
//     status: "Initiated",
//   },
//   {
//     slno: 2,
//     date: "2021-09-01",
//     projectName: "Project 2",
//     services: "Service 2",
//     purpose: "Purpose 1",
//     startDate: "2021-09-01",
//     startTime: "10:00 AM",
//     finishDate: "2021-09-01",
//     finishTime: "12:00 PM",
//     status: "Completed",
//   },
//   {
//     slno: 3,
//     date: "2021-09-01",
//     projectName: "Project 2",
//     services: "Service 3",
//     purpose: "Purpose 3",
//     startDate: "2021-09-01",
//     startTime: "10:00 AM",
//     finishDate: "2021-09-01",
//     finishTime: "12:00 PM",
//     status: "Ongoing",
//   },
// ];

export default function Analytics() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isSuccess: tasksSuccess,
    isError: tasksIsError,
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

  const handleNameChange = (name: string) => {
    setSelectedUser(name);
  };

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
          <h1 className="block w-full text-2xl font-bold">Analytics</h1>
          <div className="w-full">
            <Combobox
              value={selectedUser}
              onChange={handleNameChange}
              data={users}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TaskCompletedComponent userName={selectedUser} />
          <PieChartComponent userName={selectedUser} />
          <div className="col-span-2">
            <BarChartComponent userName={selectedUser} />
          </div>
        </div>
        <h1 className="text-sm md:text-base lg:text-xl font-bold">
          Daily Update Task Table of{" "}
          <span className="dark:text-lime-shade capitalize">
            {users.find((user) => user.value === selectedUser)?.label}
          </span>
        </h1>
        <DataTable columns={columns} data={formattedTasks} />
      </div>
    </div>
  );
}
