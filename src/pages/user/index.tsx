import React from "react";
import { columns } from "@/pages/user/_components/columns";
import { DataTable } from "@/components/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "./_components/task-form";
import { Task } from "@/types/types";
import { PlusCircleIcon } from "lucide-react";
import { format } from "date-fns";
export const projects: Task[] = [
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

const User = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">User Page</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Add Task <PlusCircleIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-center text-sm border border-gray-200 rounded-md p-2 mt-4">
            Add Task(s) for{" "}
            <span className="text-blue-500">{format(new Date(), "PP")}</span>
          </DialogTitle>
          <TaskForm />
        </DialogContent>
      </Dialog>

      <DataTable columns={columns} data={projects} />
    </>
  );
};

export default User;
