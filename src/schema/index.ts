import * as z from "zod";

export const addTaskSchema = z
  .object({
    date: z.string(),
    project: z
      .string()
      .min(2, {
        message: "Please enter a valid project name",
      })
      .max(50, {
        message: "Project name must not exceed 50 characters",
      }),
    service: z
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
      .max(10000, {
        message: "Purpose must not exceed 50 characters",
      }),
    startDate: z.string(),
    finishDate: z.string(),
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Please select a valid start time",
    }),
    finishTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Please select a valid finish time",
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
      path: ["finishDate"],
    }
  );
// .refine(
//   (data) => {
//     const startDate = new Date(data.startDate);
//     const finishDate = new Date(data.finishDate);

//     const [startHour, startMinute] = data.startTime.split(":").map(Number);
//     const [finishHour, finishMinute] = data.finishTime.split(":").map(Number);

//     return (
//       startDate.getTime() === finishDate.getTime() &&
//       data.startTime < data.finishTime
//     );
//   },
//   {
//     message: "Finish time must be greater than start time on the same date",
//     path: ["finishTime"],
//   }
// );

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

// export const formSchema = z.object({
//   projectName: z
//     .string()
//     .min(2, { message: "Project name must be at least 2 characters." }),
//   projectDesc: z.string().min(10, {
//     message: "Project description must be at least 10 characters.",
//   }),
//   date: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format.",
//   }),
//   projectPeriod: z.number().min(1, { message: "Project period is required." }),
//   clientName: z
//     .string()
//     .min(2, { message: "Client name must be at least 2 characters." }),
//   clientEmail: z.string().email({ message: "Invalid email address." }),
//   projectType: z
//     .string()
//     .min(2, { message: "Project type must be at least 2 characters." }),
//   cost: z.number().positive({ message: "Cost must be a positive number." }),
// });

export const addProjectSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectDescription: z.string().min(10, {
    message: "Project description must be at least 10 characters.",
  }),
  projectDate: z.string({
    message: "Project date must be a string",
  }),
  projectPeriod: z.number().min(2, {
    message: "Project period must be specified.",
  }),
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  clientEmail: z
    .string()
    .email("Invalid email address.")
    .nonempty("Client email is required."),
  // projectType: z
  //   .string()
  //   .min(2, {
  //     message: "Project type must be specified.",
  //   })
  //   .optional(),

  cost: z.number().positive("Cost must be a positive number."),
});
