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

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const formSchema = z.object({
  projectName: z
    .string()
    .min(2, { message: "Project name must be at least 2 characters." }),
  projectDesc: z.string().min(10, {
    message: "Project description must be at least 10 characters.",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  projectPeriod: z.string().min(1, { message: "Project period is required." }),
  clientName: z
    .string()
    .min(2, { message: "Client name must be at least 2 characters." }),
  clientEmail: z.string().email({ message: "Invalid email address." }),
  projectType: z
    .string()
    .min(2, { message: "Project type must be at least 2 characters." }),
  cost: z.number().positive({ message: "Cost must be a positive number." }),
});

export const addProjectSchema = z.object({
  id: z.string(),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectDescription: z.string().min(10, {
    message: "Project description must be at least 10 characters.",
  }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format."),
  projectPeriod: z.string().min(5, {
    message: "Project period must be specified.",
  }),
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  clientEmail: z
    .string()
    .email("Invalid email address.")
    .nonempty("Client email is required."),
  projectType: z.string().min(2, {
    message: "Project type must be specified.",
  }),

  cost: z
    .number()
    .positive("Cost must be a positive number.")
    .max(1_000_000, "Cost cannot exceed 1,000,000."),
});
