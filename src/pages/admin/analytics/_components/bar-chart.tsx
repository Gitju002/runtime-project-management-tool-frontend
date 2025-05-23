import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { useGetDurationPerProjectQuery } from "@/store/api/analytics";
import { useEffect, useState } from "react";
import { GetAllTaskResponse } from "@/types/types";
import { AnalyticsCardsSkeleton } from "@/components/skeleton/analytics-card-skeleton";

const chartConfig = {
  duration: {
    label: "No. of Hours",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BarChartComponent({
  userName,
  taskdata,
}: {
  userName: string;
  taskdata: GetAllTaskResponse;
}) {
  const [chartData, setChartData] = useState<
    {
      projectName: string;
      duration: number;
    }[]
  >([]);
  const { data, isLoading, isSuccess, isError, refetch, isFetching } =
    useGetDurationPerProjectQuery({ userName });

  useEffect(() => {
    if (data) {
      setChartData(data.data.tasks);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [userName]);
  return isLoading || isFetching ? (
    <AnalyticsCardsSkeleton />
  ) : (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Project Duration Analysis</CardTitle>
        <CardDescription>
          Overview of project duration across different projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 || !chartConfig || isError ? (
          <div className="flex items-center justify-center h-32">
            {isLoading ? "Loading..." : "No data available"}
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="projectName"
                className="capitalize"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 20)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="duration" fill="var(--color-duration)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The most time-consuming project is{" "}
          <span className="text-red-500 capitalize">
            {chartData.length > 0 &&
              chartData.reduce((acc, curr) =>
                curr.duration > acc.duration ? curr : acc
              ).projectName}
          </span>
          <TrendingUp className="h-4 w-4 text-red-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Average project duration is{" "}
          <span className=" font-semibold">
            {Math.round(
              chartData.reduce((acc, curr) => acc + curr.duration, 0) /
                chartData.length
            )}
          </span>{" "}
          Hours
        </div>
      </CardFooter>
    </Card>
  );
}
