import {
  GetAllTaskResponse,
  GroupedTasks,
  TableTask,
  Task,
  TaskResponsePerUser,
} from "@/types/types";

export const formatDate = (isoString: string | null): string => {
  if (!isoString) return "Pending";
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const formatTime = (isoString: string | null): string => {
  if (!isoString) return "Pending";
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 (midnight) to 12
  return `${hours}:${minutes} ${ampm}`;
};

export const transformTasks = (
  taskData: GetAllTaskResponse | undefined,
  limit: number
): TableTask[] => {
  const pageNo = taskData?.data?.paginationData.currentPage || 1;
  return (
    taskData?.data?.tasks.map((task, index) => ({
      id: task._id,
      slno: limit * (pageNo - 1) + index + 1,
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

export const groupTasksBySlug = (
  tasksData: TaskResponsePerUser | undefined
): GroupedTasks => {
  if (!tasksData || !tasksData.data) {
    return {};
  }

  return tasksData.data.reduce((acc: GroupedTasks, task: Task) => {
    const { slug, date, project, service, purpose } = task;

    if (!acc[slug]) {
      acc[slug] = {
        slug,
        date,
        projectName: project.projectName,
        service: service.serviceName,
        purpose,
        tasks: [],
      };
    }

    acc[slug].tasks.push(task);
    return acc;
  }, {});
};
