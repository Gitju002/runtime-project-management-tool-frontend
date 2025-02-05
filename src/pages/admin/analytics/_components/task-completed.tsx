import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetTasksPerStatusQuery } from "@/store/api/analytics";
import { TaskStatus } from "@/types/types";

const chart_Data: TaskStatus[] = [
  { status: "Completed", count: 2, fill: "var(--color-Completed)" },
  { status: "Ongoing", count: 3, fill: "var(--color-Ongoing)" },
  { status: "Initiated", count: 5, fill: "var(--color-Initiated)" },
];

const chartConfig = {
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  Ongoing: {
    label: "Ongoing",
    color: "hsl(var(--chart-3))",
  },
  Initiated: {
    label: "Inititated",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TaskCompletedComponent({
  userName,
}: {
  userName: string;
}) {
  const [chartData, setChartData] = React.useState<TaskStatus[]>(chart_Data);
  const [totalvalue, setTotalValue] = React.useState(50);
  const {
    data: taskAnalyticsData,
    isError,
    isLoading,
    isSuccess,
  } = useGetTasksPerStatusQuery({
    userName,
  });

  React.useEffect(() => {
    if (taskAnalyticsData) {
      const data = taskAnalyticsData.data.tasks.map((task) => ({
        status: task.status,
        count: task.count,
        fill: chartConfig[task.status].color,
      }));
      setChartData(data);
      setTotalValue(taskAnalyticsData.data.totalTasks);
    }
  }, [taskAnalyticsData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Completion Stats </CardTitle>
        <CardDescription>Overview of task completion status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isSuccess && chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalvalue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Tasks
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-48">
            No Data Found
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {isSuccess && chartData.length > 0 ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              <span>
                <span style={{ color: chartConfig.Initiated.color }}>
                  {chartData.find((data) => data.status === "Initiated")?.count}{" "}
                  Initiated
                </span>
                ,{" "}
                <span style={{ color: chartConfig.Ongoing.color }}>
                  {chartData.find((data) => data.status === "Ongoing")?.count}{" "}
                  Ongoing
                </span>{" "}
                and{" "}
                <span style={{ color: chartConfig.Completed.color }}>
                  {chartData.find((data) => data.status === "Completed")?.count}{" "}
                  Completed tasks
                </span>
              </span>
            </div>
            <div className="leading-none text-muted-foreground">
              Monitor the progress and ensure timely completion of tasks.
            </div>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
}
