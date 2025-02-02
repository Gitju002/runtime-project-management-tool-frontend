export type TableTask = {
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

export type UserResponse = {
  success: boolean;
  message: string;
  data: {
    error: string;
    token: string;
    user: {
      name: string;
      role: string;
    };
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

export type Service = {
  _id: string;
  project: string | Project;
  serviceName: string;
  serviceDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Project = {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectDate: string;
  projectPeriod: number;
  clientName: string;
  clientEmail: string;
  projectType: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Task = {
  _id: string;
  creator_role: string;
  creator_id: User;
  date: string;
  user: User;
  project: Project;
  service: Service;
  purpose: string;
  startDate: string;
  startTime: string;
  finishDate: string;
  finishTime: string;
  status: "Initiated" | "Ongoing" | "Completed";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
  _id: string;
  externalId: number;
  roleId: number;
  roleName: string;
  officeId: number;
  officeName: string;
  departmentId: number;
  departmentName: string;
  designation: string;
  email: string;
  name: string;
  dob: string;
  gender: number;
  mobile: number;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CreateTaskPayload = {
  date: string;
  finishDate: string;
  finishTime: string;
  project: string;
  purpose: string;
  service: string;
  startDate: string;
  startTime: string;
  status: "Initiated" | "Ongoing" | "Completed";
};

export type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
};

export type TaskResponse = {
  success: boolean;
  message: string;
  data: Task;
};

export type ProjectListResponse = {
  success: boolean;
  message: string;
  data: string[];
};

export type ServiceResponse = {
  success: boolean;
  message: string;
  data: Service[];
};

export type GetAllTaskResponse = {
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
    paginationData: PaginationData;
  };
};

export type GetAllProjectsQueryParams = {
  projectName?: string;
  limit?: number;
  page?: number;
};

export type GetAllProjectResponse = {
  success: boolean;
  message: string;
  data: {
    projects: Project[];
    paginationData: PaginationData;
  };
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: {
    name: string;
    role: string;
  };
};
