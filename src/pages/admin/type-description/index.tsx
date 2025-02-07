import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
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
import { Input } from "@/components/ui/input";

export default function TypeDescription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [projectSearch, setProjectSearch] = useState(""); // Debounced search state
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: allProjectTypeDesc,
    isLoading,
    isFetching,
    error,
  } = useGetAllProjectTypedescQuery({
    projectName: searchParams.get("projectName") || "",
    page: currentPage,
    limit,
  });

  // Debounced Effect for Search Input (3-second delay)
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (projectSearch) {
        params.delete("page"); // Reset page when searching
        params.set("projectName", projectSearch);
      } else {
        params.delete("projectName");
      }
      router.push(`?${params.toString()}`);
    }, 1250); // 3-second debounce

    return () => clearTimeout(delay);
  }, [projectSearch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (allProjectTypeDesc) {
      setTotalPages(allProjectTypeDesc?.data?.paginationData?.totalPages);
    }
  }, [allProjectTypeDesc]);

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
    <div className="container mx-auto w-full py-6">
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
            <DialogContent className="form-bg dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
              <DialogTitle>Add Type Description</DialogTitle>
              <ProjectTypeForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Input
            placeholder="Search by Project Name..."
            onChange={(e) => setProjectSearch(e.target.value)}
            value={projectSearch}
          />
        </div>

        {isLoading || isFetching ? (
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
        ) : allProjectTypeDesc?.data?.response?.length ? (
          <>
            <DataTable columns={columns} data={formattedTypeDesc} />
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
