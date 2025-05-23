import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetTasksPerProjectQuery } from "@/store/api/analytics";
import { useEffect, useState } from "react";
import { GetAllTaskResponse } from "@/types/types";
import { AnalyticsCardsSkeleton } from "@/components/skeleton/analytics-card-skeleton";

export default function PieChartComponent({
  userName,
  taskdata,
}: {
  userName: string;
  taskdata: GetAllTaskResponse;
}) {
  const [chartData, setChartData] = useState<
    { projectName: string; totalTasks: number; fill: string }[]
  >([]);
  // const [totalvalue, setTotalValue] = useState(54);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  const {
    data: TasksPerProjectdata,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetTasksPerProjectQuery({
    userName,
  });

  useEffect(() => {
    console.log(TasksPerProjectdata);
    if (TasksPerProjectdata) {
      // make a chartConfig object with the data from the API
      const chartConfig = TasksPerProjectdata.data.tasks?.reduce(
        (acc, task) => ({
          ...acc,
          [task.projectName]: {
            label: task.projectName,
            color: `hsl(var(--chart-${Object.keys(acc).length + 1}))`,
          },
        }),
        {} as ChartConfig
      );

      const data = TasksPerProjectdata.data.tasks?.map((task) => ({
        projectName: task.projectName,
        totalTasks: task.totalTasks,
        fill:
          chartConfig[task.projectName as keyof typeof chartConfig]?.color ||
          "hsl(var(--chart-default))",
      }));
      setChartData(data);
      setChartConfig(chartConfig);
    }
  }, [TasksPerProjectdata]);

  useEffect(() => {
    refetch();
  }, [userName]);

  return isLoading || isFetching ? (
    <AnalyticsCardsSkeleton />
  ) : (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Task Distribution</CardTitle>
        <CardDescription>
          Overview of tasks across different projects
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length === 0 || !chartConfig || isError ? (
          <div className="flex items-center justify-center h-48">
            No Data Found
          </div>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto text-nowrap aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="totalTasks"
                  nameKey="projectName"
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="projectName" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
      <CardFooter className="leading-none text-muted-foreground text-sm justify-center">
        {isSuccess && chartData.length > 0 && (
          <div>
            Maximum Tasks accomplished for{" "}
            {
              chartData.reduce((acc, curr) =>
                curr.totalTasks > acc.totalTasks ? curr : acc
              ).projectName
            }
            <span className="font-semibold mx-1">
              {" "}
              ({Math.max(...chartData.map((data) => data.totalTasks))})
            </span>{" "}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
