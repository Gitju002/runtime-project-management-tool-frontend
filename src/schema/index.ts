import * as z from "zod";

export const addTaskSchema = z
  .object({
    projectName: z
      .string()
      .min(2, {
        message: "Please enter a valid project name",
      })
      .max(50, {
        message: "Project name must not exceed 50 characters",
      }),
    services: z
      .string()
      .min(2, {
        message: "Please enter a valid service",
      })
      .max(50, {
        message: "Service must not exceed 50 characters",
      }),
    purpose: z
      .string()
      .min(2, {
        message: "Please enter a valid purpose",
      })
      .max(50, {
        message: "Purpose must not exceed 50 characters",
      }),
    startDate: z.string(), // Keep as string here
    finishDate: z.string(), // Keep as string here
    startTime: z.string({
      message: "Please select a valid start time (HH:MM format)",
    }),
    finishTime: z.string({
      message: "Please select a valid finish time (HH:MM format)",
    }),
    status: z.enum(["Initiated", "Ongoing", "Completed"]),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const finishDate = new Date(data.finishDate);
      return startDate <= finishDate;
    },
    {
      message: "Finish date must be greater than or equal to start date",
      path: ["finishDate"], // Highlight finishDate in error
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const finishDate = new Date(data.finishDate);

      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [finishHour, finishMinute] = data.finishTime.split(":").map(Number);

      return (
        startDate < finishDate ||
        (startDate.getTime() === finishDate.getTime() &&
          (finishHour > startHour ||
            (finishHour === startHour && finishMinute > startMinute)))
      );
    },
    {
      message: "Finish time must be greater than start time on the same date",
      path: ["finishTime"], // Highlight finishTime in error
    }
  );
