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

const chartData = [
  { taskCompletion: "completed", value: 300, fill: "var(--color-completed)" },
  { taskCompletion: "ongoing", value: 150, fill: "var(--color-ongoing)" },
  { taskCompletion: "initiated", value: 50, fill: "var(--color-initiated)" },
];

const chartConfig = {
  completed: {
    label: "completed",
    color: "hsl(var(--chart-2))",
  },
  ongoing: {
    label: "ongoing",
    color: "hsl(var(--chart-3))",
  },
  initiated: {
    label: "inititated",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TaskCompletedComponent() {
  const totalvalue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Completion Stats </CardTitle>
        <CardDescription>Overview of task completion status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              dataKey="value"
              nameKey="taskCompletion"
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span>
            <span style={{ color: chartConfig.initiated.color }}>
              {
                chartData.find((data) => data.taskCompletion === "initiated")
                  ?.value
              }{" "}
              Initiated
            </span>
            ,{" "}
            <span style={{ color: chartConfig.ongoing.color }}>
              {
                chartData.find((data) => data.taskCompletion === "ongoing")
                  ?.value
              }{" "}
              Ongoing
            </span>{" "}
            and{" "}
            <span style={{ color: chartConfig.completed.color }}>
              {
                chartData.find((data) => data.taskCompletion === "completed")
                  ?.value
              }{" "}
              Completed tasks
            </span>
          </span>
        </div>
        <div className="leading-none text-muted-foreground">
          Monitor the progress and ensure timely completion of tasks.
        </div>
      </CardFooter>
    </Card>
  );
}
