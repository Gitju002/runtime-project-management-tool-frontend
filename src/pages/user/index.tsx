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
import {
  Car,
  Grid3X3Icon,
  ListIcon,
  Logs,
  PieChartIcon,
  PlusCircleIcon,
  User2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { useGetAllTaskQuery, useGetTaskByUserIDQuery } from "@/store/api/tasks";
import { groupTasksBySlug, transformTasks } from "@/utils/tasksFormatting";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import TaskCompletedComponent from "../admin/analytics/_components/task-completed";
import PieChartComponent from "../admin/analytics/_components/pie-chart";
import BarChartComponent from "../admin/analytics/_components/bar-chart";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";
import { userTaskTour } from "@/driver";
import TaskGroup from "./_components/task-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupedTasks } from "@/types/types";
import { useGetUserQuery } from "@/store/api/user";
import UserTaskGroupSkeleton from "@/components/skeleton/user-task-group-skeleton";

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
  // const currentPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [isOpened, setIsOpened] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // const userName = useSelector((state: RootState) => state.userInfo.name);

  const { data: userData } = useGetUserQuery();

  // API Query with Search Filters
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isFetching,
    isError: tasksIsError,
    isSuccess: tasksSuccess,
    refetch: refetchTasks,
  } = useGetTaskByUserIDQuery({
    toDate: searchParams.get("toDate") || "",
    fromDate: searchParams.get("fromDate") || "",
    projectName: searchParams.get("projectName") || "",
    serviceName: searchParams.get("services") || "",
    page: currentPage,
    limit,
    sortBy,
  });

  const {
    data: allTasksData,
    isLoading: allTasksLoading,
    isFetching: allTasksFetching,
    isError: allTasksIsError,
    isSuccess: allTasksSuccess,
  } = useGetAllTaskQuery(
    {
      userName: userData?.data.name,
    },
    {
      skip: !userData?.data.name,
    }
  );

  // console.log(allTasksData);

  const groupedTasks: GroupedTasks = groupTasksBySlug(allTasksData);

  // console.log(groupedTasks);

  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  //console.log("Tasks Data", tasksData);

  useEffect(() => {
    if (tasksData) {
      handlePageChange(tasksData.data.paginationData.currentPage);
      setTotalPages(tasksData?.data.paginationData.totalPages);
    }
  }, [tasksData]);

  const handlePageChange = (page: number) => {
    // setPaginationLoading
    // const params = new URLSearchParams(searchParams);
    // params.set("page", page.toString());
    // console.log(params.toString());
    setCurrentPage(page);
    // router.push(`?${params.toString()}`, undefined, {
    //   shallow: true,
    //   scroll: false,
    // });
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

      router.push(`?${params.toString()}`, undefined, {
        shallow: true,
        scroll: false,
      });
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
      params.delete("page");
      router.push(`?${params.toString()}`, undefined, {
        shallow: true,
        scroll: false,
      });
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
      params.delete("page");
      router.push(`?${params.toString()}`, undefined, {
        shallow: true,
        scroll: false,
      });
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
      params.delete("page");
      router.push(`?${params.toString()}`, undefined, {
        shallow: true,
        scroll: false,
      });
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
      params.delete("page");
      router.push(`?${params.toString()}`, undefined, {
        shallow: true,
        scroll: false,
      });
    }, 1250);
    return () => clearTimeout(delay);
  }, [toDateSearch]);

  // useEffect(() => {
  //   refetchTasks();
  // }, []);
  const columns = getColumns(handleSortClick); // Pass the function here

  const formattedTasks = transformTasks(tasksData, limit);

  // console.log("Snehashis");
  const [activeTab, setActiveTab] = useState("all");

  const categorizedTaskGroups = allTasksIsError
    ? []
    : Object.values(groupedTasks).map((group) => {
        const lastTask = group.tasks[0];
        const category =
          lastTask.status === "Completed"
            ? "Completed"
            : lastTask.status === "Ongoing"
            ? "Ongoing"
            : "Initiated";

        return {
          ...group,
          category,
        };
      });

  const filteredTaskGroups = allTasksIsError
    ? []
    : categorizedTaskGroups.filter((group) => {
        const matchesProject =
          !projectSearch ||
          group.projectName.toLowerCase().includes(projectSearch.toLowerCase());

        const matchesService =
          !serviceSearch ||
          group.service.toLowerCase().includes(serviceSearch.toLowerCase());

        // Apply tab filtering
        const matchesTab =
          activeTab === "all" ||
          (activeTab === "ongoing" &&
            (group.category === "Ongoing" || group.category === "Both")) ||
          (activeTab === "completed" &&
            (group.category === "Completed" || group.category === "Both"));

        return matchesProject && matchesService && matchesTab;
      });

  // console.log(allTasksLoading, allTasksFetching);

  return (
    <div className="container  mx-auto min-h-screen w-full py-10">
      <div className="flex gap-2 justify-between items-center mb-6">
        <h1 className="sm:text-sm lg:text-2xl text-nowrap font-semibold">
          User Analytics Overview{" "}
          <PieChartIcon
            size={20}
            className="inline text-teal-shade dark:text-lime-shade"
          />{" "}
        </h1>
        <div className="flex gap-4 items-center">
          {" "}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => userTaskTour(setDisableBtn)}
              className="transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
            >
              Start Tour <Car />
            </Button>
          </motion.div>
          <div>
            <Button
              className="transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
              onClick={() => router.push("/profile")}
            >
              Profile <User2Icon />
            </Button>
          </div>
          <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  id="step_1_addTask"
                  disabled={disableBtn}
                  className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35"
                >
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
      </div>
      {tasksData && userData ? (
        <div
          id="step_2_analytics"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-2 "
        >
          <TaskCompletedComponent
            userName={userData?.data.name}
            taskdata={tasksData}
          />
          <PieChartComponent
            userName={userData?.data.name}
            taskdata={tasksData}
          />
          <BarChartComponent
            userName={userData?.data.name}
            taskdata={tasksData}
          />
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
      {/* {<div className="size-52"></div>} */}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 id="step_3_userLogs" className="text-2xl font-semibold">
            User Task Logs{" "}
            <Logs
              size={20}
              className="inline text-teal-shade dark:text-lime-shade"
            />{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4">
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
        <Tabs defaultValue="Grid View" className="w-full">
          <div className="flex justify-end">
            <TabsList className="">
              <TabsTrigger value="Grid View">
                <Grid3X3Icon className="dark:stroke-lime-shade stroke-teal-shade" />
              </TabsTrigger>
              <TabsTrigger value="List View">
                <ListIcon className="dark:stroke-lime-shade stroke-teal-shade" />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="Grid View">
            <div className="flex flex-wrap gap-4 justify-between items-center w-full">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">
                    All Tasks ({categorizedTaskGroups.length})
                  </TabsTrigger>
                  <TabsTrigger value="ongoing">
                    Ongoing (
                    {
                      categorizedTaskGroups.filter(
                        (group) => group.category === "Ongoing"
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed (
                    {
                      categorizedTaskGroups.filter(
                        (group) => group.category === "Completed"
                      ).length
                    }
                    )
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allTasksLoading || allTasksFetching ? (
                  [1, 2, 3, 4, 5, 6].map((_, index) => (
                    <UserTaskGroupSkeleton index={index} />
                  ))
                ) : filteredTaskGroups.length > 0 ? (
                  filteredTaskGroups.map((group) => (
                    <TaskGroup key={group.slug} group={group} />
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No tasks found.
                  </p>
                )}
              </div>
            </div>{" "}
          </TabsContent>
          <TabsContent value="List View" className="w-full">
            <div
              id="step_4_taskTable"
              className="min-h-[650px] border p-2 rounded-md my-2"
            >
              <DataTable
                isLoading={tasksLoading || isFetching}
                columns={columns}
                data={tasksIsError ? [] : formattedTasks}
              />
            </div>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default User;
