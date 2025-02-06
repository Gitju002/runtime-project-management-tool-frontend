import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "@/components/table/table-columns/projects-columns"; // Updated import
import { PlusCircle } from "lucide-react";
import ProjectForm from "@/pages/admin/projects/_components/project-form";
import { useGetAllProjectsQuery } from "@/store/api/project";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import CustomLoader from "@/components/ui/custom-loader";

export default function Projects() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const projectName = searchParams.get("projectName") || ""; // Reading from URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy")
    ? [searchParams.get("sortBy")!]
    : [];
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // const [paginationLoading, setPaginationLoading] = useState(false);

  const {
    data: projectData,
    isLoading,
    isFetching,
    error,
  } = useGetAllProjectsQuery({
    projectName, // Now taken from URL
    page: currentPage,
    limit,
    sortBy,
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      // clear the page number when searching
      params.delete("page");
      params.set("projectName", value);
    } else {
      params.delete("projectName");
    }

    router.push(`?${params.toString()}`);
  };

  const handleSortClick = useCallback(
    (columnName: string) => {
      const params = new URLSearchParams(searchParams);
      const currentSort = params.get("sortBy");

      if (currentSort === columnName) {
        params.set("sortBy", `-${columnName}`); // Toggle to Descending
      } else if (currentSort === `-${columnName}`) {
        params.delete("sortBy"); // Remove Sorting
      } else {
        params.set("sortBy", columnName); // Apply Ascending
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    if (projectData) {
      handlePageChange(projectData?.data.paginationData.currentPage);
      setTotalPages(projectData?.data.paginationData.totalPages);
      console.log("Total Pages", projectData?.data.paginationData.totalPages);
      console.log("Current Page", projectData?.data.paginationData.currentPage);

      // setPaginationLoading(false);
    }
  }, [projectData]);

  const columns = getColumns(handleSortClick); // Pass the function here

  console.log(isLoading);

  return (
    <div className="container mx-auto w-full py-6">
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
            <DialogContent className="form-bg dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
              <DialogTitle>Add New Project</DialogTitle>
              <ProjectForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Input
            placeholder="Filter by Project Names..."
            onChange={handleProjectChange}
            value={projectName}
          />
        </div>

        {isLoading || isFetching ? (
          <div className="flex justify-center items-center h-96">
            <CustomLoader width={"w-16 md:w-20"} height={"h-16 md:h-20"} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96">
            <img
              src="/images/missing.png"
              alt="No projects found"
              className="w-36 h-36 mb-4"
            />
            <p className="text-lg font-semibold text-gray-600">
              No projects found.
            </p>
            <p className="text-sm text-gray-500">
              Please verify the search criteria and try again.
            </p>
          </div>
        ) : projectData?.data?.projects?.length ? (
          <>
            <DataTable columns={columns} data={projectData.data.projects} />
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
