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

const User = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectName = searchParams.get("projectName") || ""; // Reading from URL
  const serviceName = searchParams.get("services") || ""; // Reading from URL
  const sortBy = searchParams.get("sortBy")
    ? [searchParams.get("sortBy")!]
    : [];
  const [isOpened, setIsOpened] = useState(false);
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  // const [paginationLoading, setPaginationLoading] = useState(false);

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isSuccess: tasksSuccess,
    isError: tasksIsError,
    isFetching,
  } = useGetTaskByUserIDQuery({
    toDate: toDate,
    fromDate: fromDate,
    projectName,
    serviceName,
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

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.delete("page");
      params.delete("fromDate");
      params.delete("toDate");
      params.set("projectName", value);
    } else {
      params.delete("projectName");
    }

    router.push(`?${params.toString()}`);
  };

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

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.delete("page");
      params.set("services", value);
    } else {
      params.delete("services");
    }

    router.push(`?${params.toString()}`);
  };

  const columns = getColumns(handleSortClick); // Pass the function here

  const formattedTasks = transformTasks(tasksData, limit);

  const userName = useSelector((state: RootState) => state.userInfo.name);

  console.log("username ", userName);

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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-2 ">
        <TaskCompletedComponent userName={userName} />
        <PieChartComponent userName={userName} />
        <BarChartComponent userName={userName} />
      </div>
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
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="Filter by Project Names..."
              onChange={handleProjectChange}
              value={projectName}
              className="w-full border  border-teal-shade"
            />
            <Input
              placeholder="Filter by Services ..."
              onChange={handleServiceChange}
              value={serviceName}
              className="w-full border  border-teal-shade"
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
                <span className="text-blue-500">
                  {format(new Date(), "PP")}
                </span>
              </DialogTitle>
              <TaskForm setIsOpen={setIsOpened} />
            </DialogContent>
          </Dialog>
        </div>
        {tasksLoading || isFetching ? (
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
        ) : tasksIsError ? (
          <div className="flex flex-col items-center justify-center h-96">
            <img
              src="/images/missing.png"
              alt="No projects found"
              className="w-36 h-36 mb-4"
            />
            <p className="text-lg font-semibold text-gray-600">
              No tasks found.
            </p>
            <p className="text-sm text-gray-500">
              Please verify the search criteria and try again.
            </p>
          </div>
        ) : tasksSuccess ? (
          <>
            <DataTable columns={columns} data={formattedTasks} />
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
