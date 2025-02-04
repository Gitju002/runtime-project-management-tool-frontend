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
import { columns } from "@/components/table/table-columns/type-desc-columns";
import { PlusCircle } from "lucide-react";
import ProjectTypeForm from "@/pages/admin/type-description/_components/type-desc-form";
import { useGetAllProjectTypedescQuery } from "@/store/api/projectTypeDesc";
import { CustomPagination } from "@/components/ui/custom-pagination";

export default function TypeDescription() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [paginationLoading, setPaginationLoading] = useState(false);

  const handlePageChange = (page: number) => {
    setPaginationLoading(true);
    setCurrentPage(page);
  };

  const {
    data: allProjectTypeDesc,
    isLoading,
    isSuccess,
    error,
  } = useGetAllProjectTypedescQuery({
    projectName,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if (allProjectTypeDesc) {
      setPaginationLoading(false);
      setTotalPages(allProjectTypeDesc?.data?.paginationData?.totalPages);
    }
  }, [allProjectTypeDesc]);

  console.log(allProjectTypeDesc);

  const formattedTypeDesc =
    allProjectTypeDesc?.data?.response?.map((projectType) => ({
      project:
        typeof projectType.project === "string"
          ? projectType.project
          : projectType.project.projectName,
      projectTypeDescription: projectType.projectTypeDescription,
      location: projectType.location,
    })) || [];

  return (
    <div className="container  mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Types Description</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                  Add Type Description <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Type Description</DialogTitle>
              <ProjectTypeForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {isLoading || paginationLoading ? (
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
        ) : error ? (
          <div>Error fetching data</div>
        ) : (
          <>
            <DataTable columns={columns} data={formattedTypeDesc} />
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
