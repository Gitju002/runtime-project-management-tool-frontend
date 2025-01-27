"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/pages/admin/project-types/_components/columns";
import { PlusCircle } from "lucide-react";
import ProjectTypeForm from "@/pages/admin/project-types/_components/project-types-form";

export type ProjectType = {
  id: string;
  type: string;
  description: string;
  location: string | null;
};

const projectTypes: ProjectType[] = [
  {
    id: "1",
    type: "Web Development",
    description: "Creation of websites and web applications",
    location: "Remote",
  },
  {
    id: "2",
    type: "Mobile App Development",
    description: "Development of mobile applications for iOS and Android",
    location: "On-site",
  },
  {
    id: "3",
    type: "UI/UX Design",
    description: "Design of user interfaces and user experiences",
    location: null,
  },
  // Add more mock project types as needed
];

export default function ProjectTypes() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Types</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              Add Project Type <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Project Type</DialogTitle>
            <ProjectTypeForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={projectTypes} />
    </div>
  );
}
