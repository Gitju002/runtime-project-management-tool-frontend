import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getColumns } from "@/components/table/table-columns/user-columns";
import { DataTable } from "@/components/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "./_components/task-form";
import { Logs, PieChartIcon, PlusCircleIcon } from "lucide-react";
import { format } from "date-fns";
import { useGetTaskByUserIDQuery } from "@/store/api/tasks";
import { transformTasks } from "@/utils/tasksFormatting";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import TaskCompletedComponent from "../admin/analytics/_components/task-completed";
import PieChartComponent from "../admin/analytics/_components/pie-chart";
import BarChartComponent from "../admin/analytics/_components/bar-chart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";
import CustomLoader from "@/components/ui/custom-loader";
import { DataTableSkeleton } from "@/components/skeleton/data-table-skeleton";
import { AnalyticsCardsSkeleton } from "@/components/skeleton/analytics-card-skeleton";

const User = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projectSearch, setProjectSearch] = useState(
    searchParams.get("projectName") || ""
  );
  const [serviceSearch, setServiceSearch] = useState(
    searchParams.get("services") || ""
  );
  const [fromDateSearch, setFromDateSearch] = useState<Date | null>(
    searchParams.get("fromDate")
      ? new Date(searchParams.get("fromDate")!)
      : null
  );
  const [toDateSearch, setToDateSearch] = useState<Date | null>(
    searchParams.get("toDate") ? new Date(searchParams.get("toDate")!) : null
  );

  const sortBy = searchParams.get("sortBy")
    ? [searchParams.get("sortBy")!]
    : [];
  const [isOpened, setIsOpened] = useState(false);
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // API Query with Search Filters
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isFetching,
    isError: tasksIsError,
    isSuccess: tasksSuccess,
  } = useGetTaskByUserIDQuery({
    toDate: searchParams.get("toDate") || "",
    fromDate: searchParams.get("fromDate") || "",
    projectName: searchParams.get("projectName") || "",
    serviceName: searchParams.get("services") || "",
    page: currentPage,
    limit,
    sortBy,
  });

  //console.log("Tasks Data", tasksData);
  useEffect(() => {
    if (tasksData) {
      handlePageChange(tasksData.data.paginationData.currentPage);
      setTotalPages(tasksData?.data.paginationData.totalPages);
    }
  }, [tasksData]);

  const handlePageChange = (page: number) => {
    // setPaginationLoading
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
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
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (projectSearch) {
        params.set("projectName", projectSearch);
      } else {
        params.delete("projectName");
      }
      router.push(`?${params.toString()}`);
    }, 500);
    return () => clearTimeout(delay);
  }, [projectSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (serviceSearch) {
        params.set("services", serviceSearch);
      } else {
        params.delete("services");
      }
      router.push(`?${params.toString()}`);
    }, 1250);
    return () => clearTimeout(delay);
  }, [serviceSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (fromDateSearch) {
        params.set("fromDate", format(new Date(fromDateSearch), "yyyy-MM-dd"));
      } else {
        params.delete("fromDate");
      }
      router.push(`?${params.toString()}`);
    }, 1250);
    return () => clearTimeout(delay);
  }, [fromDateSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (toDateSearch) {
        params.set("toDate", format(new Date(toDateSearch), "yyyy-MM-dd"));
      } else {
        params.delete("toDate");
      }
      router.push(`?${params.toString()}`);
    }, 1250);
    return () => clearTimeout(delay);
  }, [toDateSearch]);
  const columns = getColumns(handleSortClick); // Pass the function here

  const formattedTasks = transformTasks(tasksData, limit);

  const userName = useSelector((state: RootState) => state.userInfo.name);

  // console.log("username ", userName);

  return (
    <div className="container  mx-auto min-h-screen w-full py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          User Analytics Overview{" "}
          <PieChartIcon
            size={20}
            className="inline text-teal-shade dark:text-lime-shade"
          />{" "}
        </h1>
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                Add Task <PlusCircleIcon />
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="form-bg dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
            <DialogTitle className="text-center text-sm border border-gray-200 rounded-md p-2 mt-4">
              Add Task(s) for{" "}
              <span className="text-blue-500">{format(new Date(), "PP")}</span>
            </DialogTitle>
            <TaskForm setIsOpen={setIsOpened} />
          </DialogContent>
        </Dialog>
      </div>
      {tasksData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-2 ">
          <TaskCompletedComponent userName={userName} taskdata={tasksData} />
          <PieChartComponent userName={userName} taskdata={tasksData} />
          <BarChartComponent userName={userName} taskdata={tasksData} />
        </div>
      ) : (
        <div className="flex flex-col items-center border rounded-md justify-center h-96">
          <img
            src="/images/no-analytics.png"
            alt="No projects found"
            className="w-36 h-36 mb-4"
          />
          <p className="text-lg font-semibold text-gray-600">No Data found.</p>
          <p className="text-sm text-gray-500">
            Please add a task to view Analytics.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            User Task Logs{" "}
            <Logs
              size={20}
              className="inline text-teal-shade dark:text-lime-shade"
            />{" "}
          </h1>
        </div>

        <div className="flex gap-4 justify-between items-center w-full">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <Input
              placeholder="Filter by Project Names..."
              onChange={(e) => setProjectSearch(e.target.value)}
              value={projectSearch}
              className="w-full border border-teal-shade dark:bg-slate-800"
            />
            <Input
              placeholder="Filter by Services..."
              onChange={(e) => setServiceSearch(e.target.value)}
              value={serviceSearch}
              className="w-full border border-teal-shade dark:bg-slate-800"
            />
            <DatePicker
              placeholder="Pick From Date"
              value={fromDateSearch}
              onChange={(date) => setFromDateSearch(date || null)}
            />
            <DatePicker
              placeholder="Pick To Date"
              value={toDateSearch}
              onChange={(date) => setToDateSearch(date || null)}
            />
          </div>
        </div>

        <>
          <DataTable
            isLoading={tasksLoading || isFetching}
            columns={columns}
            data={tasksIsError ? [] : formattedTasks}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      </div>
    </div>
  );
};

export default User;
