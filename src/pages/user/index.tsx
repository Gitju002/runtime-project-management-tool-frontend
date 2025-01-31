import React, { useState } from "react";
import { columns } from "@/components/table/table-columns/user-columns";
import { DataTable } from "@/components/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "./_components/task-form";
import { PlusCircleIcon } from "lucide-react";
import { format } from "date-fns";
import { useGetTaskByUserIDQuery } from "@/store/api/tasks";
import { transformTasks } from "@/utils/tasksFormatting";
// export const projects: Task[] = [
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

const User = () => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isSuccess: tasksSuccess,
    isError: tasksIsError,
  } = useGetTaskByUserIDQuery();

  console.log("Tasks Data", tasksData);

  const formattedTasks = transformTasks(tasksData?.data.tasks);

  return (
    <div className="container  mx-auto min-h-screen w-full py-10">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">User Page</h1>
          <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                Add Task <PlusCircleIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
              <DialogTitle className="text-center text-sm border border-gray-200 rounded-md p-2 mt-4">
                Add Task(s) for{" "}
                <span className="text-blue-500">
                  {format(new Date(), "PP")}
                </span>
              </DialogTitle>
              <TaskForm setIsOpen={setIsOpened} />
            </DialogContent>
          </Dialog>
        </div>
        {tasksLoading ? (
          <div>Loading...</div>
        ) : tasksIsError ? (
          <div>Error fetching data</div>
        ) : tasksSuccess ? (
          <DataTable columns={columns} data={formattedTasks} />
        ) : null}
        {/* <DataTable columns={columns} data={projects} /> */}
      </div>
    </div>
  );
};

export default User;
