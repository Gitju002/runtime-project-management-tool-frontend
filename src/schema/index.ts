import * as z from "zod";

export const addTaskSchema = z.object({
  projectName: z.string().min(2).max(50),
  services: z.string().min(2).max(50),
  purpose: z.string().min(2).max(50),
  startDate: z.string().min(2).max(50),
  finishDate: z.string().min(2).max(50),
  startTime: z.string().min(2).max(50),
  finishTime: z.string().min(2).max(50),
});
