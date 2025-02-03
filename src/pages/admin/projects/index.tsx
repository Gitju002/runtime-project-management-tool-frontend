import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { CustomPagination } from "@/components/ui/custom-pagination";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: projectData,
    isLoading,
    error,
    refetch,
  } = useGetAllProjectsQuery({
    projectName,
    page: currentPage,
    limit,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(projectData);
  useEffect(() => {
    if (projectData) {
      setTotalPages(projectData?.data.paginationData.totalPages);
    }
  }, [projectData]);
  return (
    <div className="container  mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Existing Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                  Add Project <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-background dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
              <DialogTitle>Add New Project</DialogTitle>
              <ProjectForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {
          // Loading
          isLoading ? (
            <div className="flex justify-center items-center h-96">
              <motion.div
                animate={{ opacity: [1, 0.5, 1], rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <img
                  src="/images/hourglass.png"
                  alt="loading..."
                  className="w-14 h-14 md:w-20 md:h-20"
                />
              </motion.div>
            </div>
          ) : // Error
          error ? (
            <div>Error fetching data</div>
          ) : // Success
          projectData?.data?.projects?.length ? (
            <>
              <DataTable
                columns={columns}
                data={projectData?.data?.projects || []}
              />
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div>No data found</div>
          )
        }
      </div>
    </div>
  );
}
