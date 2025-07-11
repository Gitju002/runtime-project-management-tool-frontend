import { useEffect, useState, useCallback } from "react";
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
import { getColumns } from "@/components/table/table-columns/projects-columns"; // Updated import
import { PlusCircle } from "lucide-react";
import ProjectForm from "@/pages/admin/projects/_components/project-form";
import { useGetAllProjectsQuery } from "@/store/api/project";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { startTour } from "@/driver";

import "driver.js/dist/driver.css";

export default function Projects() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState(""); // Debounced State
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy")
    ? [searchParams.get("sortBy")!]
    : [];
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");

  useEffect(() => {
    startTour(router); // Detects and continues the tour automatically
  }, []);
  const {
    data: projectData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProjectsQuery({
    projectName: searchParams.get("projectName") || "",
    fromDate: searchParams.get("fromDate") || "",
    toDate: searchParams.get("toDate") || "",
    page: currentPage,
    limit,
    sortBy,
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

  const handleFromDateChange = (date: Date | undefined) => {
    let params = new URLSearchParams(searchParams);
    if (!date) {
      params.delete("fromDate");
      router.push(`?${params.toString()}`);
      return;
    }
    // add 1 day to the selected date
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    params.set("fromDate", formattedDate);
    router.push(`?${params.toString()}`);
  };

  const handleDateSelection = (date: Date | undefined) => {
    let params = new URLSearchParams(searchParams);
    if (!date) {
      params.delete("toDate");
      router.push(`?${params.toString()}`);
      return;
    }
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    params.set("toDate", formattedDate);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  // const handlePageChange = (page: number) => {
  //   setPaginationLoading(true);
  //   setCurrentPage(page);
  // };

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
    }
  }, [projectData]);

  console.log(projectData);
  const columns = getColumns(handleSortClick);

  return (
    <div className="container mx-auto w-full py-6">
      <div id="project_page" className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Existing Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  id="add_project"
                  className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35"
                >
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

        <div className="flex max-md:flex-wrap justify-between gap-4 items-center mb-6">
          <Input
            placeholder="Filter by Project Names..."
            onChange={(e) => setProjectSearch(e.target.value)}
            value={projectSearch}
            className="dark:bg-slate-800"
          />
          <DatePicker
            placeholder="Pick From Date"
            value={fromDate ? new Date(fromDate) : null}
            onChange={(date) => handleFromDateChange(date)}
          />
          <DatePicker
            placeholder="Pick To Date"
            value={toDate ? new Date(toDate) : null}
            onChange={(date) => handleDateSelection(date)}
          />
        </div>

        <>
          <div id="project_table" className="min-h-[550px]  rounded-md">
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={isError ? [] : projectData?.data?.projects || []}
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
