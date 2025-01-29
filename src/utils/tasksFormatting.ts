import { TableTask, Task } from "@/types/types";

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 (midnight) to 12
  return `${hours}:${minutes} ${ampm}`;
};

export const transformTasks = (tasks?: Task[]): TableTask[] => {
  return (
    tasks?.map((task, index) => ({
      slno: index + 1,
      date: formatDate(task.date),
      projectName: task.project.projectName,
      services: task.service.serviceName,
      purpose: task.purpose,
      startDate: formatDate(task.startDate),
      startTime: formatTime(task.startTime),
      finishDate: formatDate(task.finishDate),
      finishTime: formatTime(task.finishTime),
      status: task.status as "Initiated" | "Ongoing" | "Completed",
    })) || []
  );
};
