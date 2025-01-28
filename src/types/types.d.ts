export type Task = {
  slno: number;
  date: string;
  projectName: string;
  services: string;
  purpose: string;
  startDate: string;
  startTime: string;
  finishDate: string;
  finishTime: string;
  status: "Initiated" | "Ongoing" | "Completed";
};

export type Project = {
  projectName: string;
  projectDesc: string;
  date: string;
  projectPeriod: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  cost: number;
  location?: string;
};

export type Service = {
  serviceName: string;
  cost: number;
};

export type User = {
  email: string;
  password: string;
  username: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: {
    error: string;
  };
};

export type AddedProjectType = {
  id: string;
  project: string;
  projectDescription: string;
  date: string;
  projectPeriod: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  cost: number;
};

export type ProjectListResponse = {
  success: boolean;
  message: string;
  data: string[];
};
