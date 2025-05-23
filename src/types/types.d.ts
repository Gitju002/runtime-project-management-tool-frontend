export type TableTask = {
  id: string;
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
    error?: string;
    token: string;
    user: {
      name: string;
      role: string;
    };
  };
};

export type AddedProjectType = {
  projectName: string;
  projectDescription: string;
  projectDate: string;
  projectPeriod: number;
  clientName: string;
  clientEmail: string;
  projectType?: string;
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
  services?: string[];
  projectTypeDesc?: string[];
};

export type ProjectTypeDesc = {
  _id: string;
  project: string | Project;
  projectTypeDescription: string;
  location: string;
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
  slug: string;
};

export type GroupedTasks = Record<
  string,
  {
    slug: string;
    date: string;
    projectName: string;
    service: string;
    purpose: string;
    tasks: Task[];
  }
>;

export type User = {
  _id: string;
  externalId: number;
  date_of_joining: string;
  role_id: number;
  role_name: string;
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
  profilepic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ExternalUser = {
  id: number;
  name: string;
  role_id: number;
  role_name: string;
  mobile: string | null;
  office_name: string;
  department_name: string;
  profilepic: string;
  user_status: string;
};

export type CreateTaskPayload = {
  date: string;
  finishDate?: string;
  finishTime?: string;
  project: string;
  purpose: string;
  service: string;
  startDate: string;
  startTime: string;
  status: "Initiated" | "Ongoing" | "Completed";
};
export type CreateServicePayload = {
  project: string;
  serviceName: string;
  serviceDescription: string;
};

export type UserPayload = {
  email: string;
  password: string;
};
export type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  totalUsers: number;
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

export type GetAllProjectsQueryParams = {
  toDate?: string;
  fromDate?: string;
  projectName?: string;
  userName?: string;
  serviceName?: string;
  location?: string;
  userName?: string;
  limit?: number;
  page?: number;
  sortBy?: string[];
};

export type getDurationAnalyticsResponse = {
  success: boolean;
  message: string;
  data: {
    project: {
      projectName?: string;
      startDate?: string;
      endDate?: string;
      remainingDays?: number;
      exceededDays?: number;
    };
  };
};

export type getNoOfUsersByProjectResponse = {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
  };
};

export type GetAllTaskResponse = {
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
    paginationData: PaginationData;
  };
};
export type GetUserResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    externalId: number;
    date_of_joining: string;
    role_id: number;
    role_name: string;
    office_id: number;
    office_name: string;
    department_id: number;
    department_name: string;
    designation: string;
    email: string;
    name: string;
    dob: string;
    gender: number;
    mobile: number;
    profilepic: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
export type TaskResponsePerUser = {
  success: boolean;
  message: string;
  data: Task[];
};

export type GetAllProjectResponse = {
  success: boolean;
  message: string;
  data: {
    projects: Project[];
    paginationData: PaginationData;
  };
};

export type GetAllServiceResponse = {
  success: boolean;
  message: string;
  data: {
    services: Service[];
    paginationData: PaginationData;
  };
};

export type GetAllTypeDescResponse = {
  success: boolean;
  message: string;
  data: {
    response: ProjectTypeDesc[];
    paginationData: PaginationData;
  };
};

export type GetAllUserResponse = {
  success: boolean;
  message: string;
  data: {
    users: ExternalUser[];
    paginationData: PaginationData;
  };
};

export type GetAllUsersListResponse = {
  success: boolean;
  message: string;
  data: {
    label: string;
    value: string;
  }[];
};
interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

export type CreateServiceResponse = {
  success: boolean;
  message: string;
  data?: Service;
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: {
    name: string;
    role: string;
  };
};

export interface TaskStatus {
  status: "Ongoing" | "Initiated" | "Completed"; // Task statuses
  count: number; // Number of tasks in this status
  fill: string; // CSS variable for color
}

export interface TaskStatusData {
  tasks: TaskStatus[]; // Array of task statuses
  totalTasks: number; // Total number of tasks
}

export interface TaskStatusResponse {
  success: boolean; // Request status
  message: string; // Success message
  data: TaskStatusData; // Response data
}

export interface TasksPerProject {
  success: boolean; // Request status
  message: string; // Success message
  data: {
    tasks: {
      projectName: string; // Project name
      totalTasks: number; // Total number of tasks
    }[];
    total: string;
  };
}

export interface TasksDuration {
  success: boolean; // Request status
  message: string; // Success message
  data: {
    tasks: {
      projectName: string; // Project name
      duration: number; // Total duration of tasks
    }[];
  };
}
export type FormattedService = {
  // id: string;
  _id: string;
  projectName: string;
  serviceName: string;
  description: string;
};
