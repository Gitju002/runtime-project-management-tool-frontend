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
const chartData = [
  { projectName: "cosmos", duration: 10 },
  { projectName: "jaro", duration: 20 },
  { projectName: "invespy", duration: 15 },
  { projectName: "academy", duration: 7 },
  { projectName: "ai", duration: 8 },
  { projectName: "others", duration: 10 },
];

const chartConfig = {
  duration: {
    label: "No. of Days",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Project Duration Analysis</CardTitle>
        <CardDescription>
          Overview of project duration across different projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="projectName"
              className="capitalize"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="duration" fill="var(--color-duration)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The most time-consuming project is{" "}
          <span className="text-red-500 capitalize">
            {
              chartData.reduce((acc, curr) =>
                curr.duration > acc.duration ? curr : acc
              ).projectName
            }
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
          days
        </div>
      </CardFooter>
    </Card>
  );
}
