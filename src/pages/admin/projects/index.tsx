import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/table-columns/projects-columns";
import { PlusCircle } from "lucide-react";
import ProjectForm from "@/pages/admin/projects/_components/project-form";
import { useGetAllProjectsQuery } from "@/store/api/project";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // For search
  const [page, setPage] = useState(1); // For pagination
  const [limit, setLimit] = useState(10); // Items per page

  const {
    data: projectData,
    isLoading,
    error,
    refetch,
  } = useGetAllProjectsQuery({
    projectName,
    limit,
    page,
  });

  useEffect(() => {
    refetch();
  }, [projectName, page, limit]);

  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Existing Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                Add Project <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add New Project</DialogTitle>
              <ProjectForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {
          // Loading
          isLoading ? (
            <div>Loading...</div>
          ) : // Error
          error ? (
            <div>Error fetching data</div>
          ) : // Success
          projectData?.data?.projects?.length ? (
            <DataTable
              columns={columns}
              data={projectData?.data?.projects || []}
            />
          ) : (
            <div>No data found</div>
          )
        }
      </div>
    </div>
  );
}
