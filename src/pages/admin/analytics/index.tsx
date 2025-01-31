import { Combobox } from "@/components/ui/combo-box";
import React, { useState } from "react";
import PieChartComponent from "./_components/pie-chart";
import BarChartComponent from "./_components/bar-chart";
import TaskCompletedComponent from "./_components/task-completed";
import { DataTable } from "@/components/table/data-table";
import { TableTask } from "@/types/types";
import { columns } from "../../../components/table/table-columns/analytics-columns";

const users = [
  { value: "snehashis", label: "Snehashis Gharai" },
  { value: "purbarun", label: "Purbarun Mondal" },
  { value: "priyansu", label: "Priyansu Chowdhury" },
  { value: "abhijit", label: "Abhijit Dinda" },
  { value: "abdul", label: "Sayed Abdul" },
];

const projects: TableTask[] = [
  {
    slno: 1,
    date: "2021-09-01",
    projectName: "Project 1",
    services: "Service 1",
    purpose: "Purpose 1",
    startDate: "2021-09-01",
    startTime: "10:00 AM",
    finishDate: "2021-09-01",
    finishTime: "12:00 PM",
    status: "Initiated",
  },
  {
    slno: 2,
    date: "2021-09-01",
    projectName: "Project 2",
    services: "Service 2",
    purpose: "Purpose 1",
    startDate: "2021-09-01",
    startTime: "10:00 AM",
    finishDate: "2021-09-01",
    finishTime: "12:00 PM",
    status: "Completed",
  },
  {
    slno: 3,
    date: "2021-09-01",
    projectName: "Project 2",
    services: "Service 3",
    purpose: "Purpose 3",
    startDate: "2021-09-01",
    startTime: "10:00 AM",
    finishDate: "2021-09-01",
    finishTime: "12:00 PM",
    status: "Ongoing",
  },
];

export default function Analytics() {
  const [selectedUser, setSelectedUser] = useState(users[0]?.value || "");

  return (
    <div className="container mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="block w-full text-2xl font-bold">Analytics</h1>
          <div className="w-full">
            <Combobox
              value={selectedUser}
              onChange={setSelectedUser}
              data={users}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <TaskCompletedComponent />
          <PieChartComponent />
          <BarChartComponent />
        </div>
        <h1 className="text-sm md:text-base lg:text-xl font-bold">
          Daily Update Task Table of{" "}
          <span className="dark:text-lime-shade capitalize">
            {users.find((user) => user.value === selectedUser)?.label}
          </span>
        </h1>
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
}
