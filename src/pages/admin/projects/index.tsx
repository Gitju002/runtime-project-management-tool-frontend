import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/pages/admin/projects/_components/columns";
import { PlusCircle } from "lucide-react";
import ProjectForm from "@/pages/admin/projects/_components/project-form";
import { AddedProjectType } from "@/types/types";

const projects: AddedProjectType[] = [
  {
    id: "1",
    date: "2023-05-01",
    project: "Website Redesign",
    projectType: "Web Development",
    projectDescription:
      "Redesigning the website for better user experience.Redesigning the website for better user experience.Redesigning the website for better user experience.Redesigning the website for better user experience.Redesigning the website for better user experience.Redesigning the website for better user experience.Redesigning the website for better user experience.",
    projectPeriod: "2 months",
    clientName: "John Doe",
    clientEmail: "abc@gmail.com",
    cost: 2000,
  },
];

export default function Projects() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container  mx-auto min-h-screen w-full   py-10 ">
      <div className="grid grid-cols-1  gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Existing Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                Add Project <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add New Project</DialogTitle>
              <ProjectForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
}
