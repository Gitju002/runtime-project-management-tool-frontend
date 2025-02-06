export interface Project {
  name: string;
  date: string;
  description: string;
  period: string;
  clientName: string;
  clientEmail: string;
  cost: number;
  services: Service[];
  type: string;
  typeDescription: string;
  location: string;
}

export interface Service {
  name: string;
  description: string;
}

// export interface Task {
//   id: string;
//   username: string;
//   date: string;
//   service: string;
//   purpose: string;
//   status: "pending" | "in-progress" | "completed";
// }
