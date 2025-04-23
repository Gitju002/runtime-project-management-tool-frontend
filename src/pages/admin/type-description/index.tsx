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
import { startTour } from "@/driver";
import { GetAllTypeDescResponse, ProjectTypeDesc } from "@/types/types";

export default function TypeDescription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [projectSearch, setProjectSearch] = useState(""); // Debounced search state
  const [locationSearch, setLocationSearch] = useState(""); // Debounced search state
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: allProjectTypeDesc,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProjectTypedescQuery({
    projectName: searchParams.get("projectName") || "",
    location: searchParams.get("location") || "",
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
    }, 500); // 3-second debounce

    return () => clearTimeout(delay);
  }, [projectSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (locationSearch) {
        params.delete("page"); // Reset page when searching
        params.set("location", locationSearch);
      } else {
        params.delete("location");
      }
      router.push(`?${params.toString()}`);
    }, 500); // 3-second debounce

    return () => clearTimeout(delay);
  }, [locationSearch]);

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

  useEffect(() => {
    startTour(router);
  });

  const formattedTypeDesc =
    allProjectTypeDesc?.data?.response?.map((projectType) => ({
      project:
        typeof projectType.project === "string"
          ? projectType.project
          : projectType.project.projectName,
      projectTypeDescription: projectType.projectTypeDescription,
      location: projectType.location,
      _id: projectType._id,
    })) || [];

  return (
    <div className="container mx-auto w-full py-6">
      <div id="type_description_page" className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Types Description</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  id="add_TypeDesc"
                  className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35"
                >
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
        <div className=" flex justify-between gap-6 items-center mb-6">
          <Input
            placeholder="Search by Project Name..."
            onChange={(e) => setProjectSearch(e.target.value)}
            value={projectSearch}
            className="dark:bg-slate-800"
          />
          <Input
            placeholder="Search by Location..."
            onChange={(e) => setLocationSearch(e.target.value)}
            value={locationSearch}
            className="dark:bg-slate-800"
          />
        </div>
        <>
          <div id="typeDescTable" className="min-h-[550px] rounded-md">
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={isError ? [] : formattedTypeDesc || []}
            />
          </div>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      </div>
    </div>
  );
}
