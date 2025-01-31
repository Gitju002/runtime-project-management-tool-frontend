import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/table-columns/type-desc-columns";
import { PlusCircle } from "lucide-react";
import ProjectTypeForm from "@/pages/admin/type-description/_components/type-desc-form";

export type ProjectType = {
  id: string;
  projectName: string;
  description: string;
  location: string | null;
};

const projectTypes: ProjectType[] = [
  {
    id: "1",
    projectName: "Web Development",
    description: "Creation of websites and web applications",
    location: "Remote",
  },
  {
    id: "2",
    projectName: "Mobile App Development",
    description: "Development of mobile applications for iOS and Android",
    location: "On-site",
  },
  {
    id: "3",
    projectName: "UI/UX Design",
    description: "Design of user interfaces and user experiences",
    location: null,
  },
  // Add more mock project types as needed
];

export default function TypeDescription() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Types Description</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                Add Type Description <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Type Description</DialogTitle>
              <ProjectTypeForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable columns={columns} data={projectTypes} />
      </div>
    </div>
  );
}
