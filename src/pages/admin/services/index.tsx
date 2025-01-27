import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/pages/admin/services/_components/columns";
import { PlusCircle } from "lucide-react";
import ServiceForm from "@/pages/admin/services/_components/services-form";

export type Service = {
  id: string;
  projectName: string;
  serviceName: string;
  description: string;
};

const services: Service[] = [
  {
    id: "1",
    projectName: "E-commerce Platform",
    serviceName: "Frontend Development",
    description: "Develop responsive user interface using React",
  },
  {
    id: "2",
    projectName: "CRM System",
    serviceName: "Backend Development",
    description: "Build RESTful API using Node.js and Express",
  },
  {
    id: "3",
    projectName: "Mobile App",
    serviceName: "UI/UX Design",
    description: "Create intuitive and appealing user interface designs",
  },
  // Add more mock services as needed
];

export default function Services() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              Add Service <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Service</DialogTitle>
            <ServiceForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={services} />
    </div>
  );
}
