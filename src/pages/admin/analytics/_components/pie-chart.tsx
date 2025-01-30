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

const chartData = [
  { projectName: "cosmos", totalTasks: 16, fill: "var(--color-cosmos)" },
  { projectName: "jaro", totalTasks: 20, fill: "var(--color-jaro)" },
  { projectName: "invespy", totalTasks: 12, fill: "var(--color-invespy)" },
  { projectName: "academy", totalTasks: 4, fill: "var(--color-academy)" },
  { projectName: "ai", totalTasks: 2, fill: "var(--color-ai)" },
];

const chartConfig = {
  cosmos: {
    label: "Cosmos DashBoard",
    color: "hsl(var(--chart-1))",
  },
  jaro: {
    label: "Jaro for Education",
    color: "hsl(var(--chart-2))",
  },
  invespy: {
    label: "Invespy for Real Estate",
    color: "hsl(var(--chart-3))",
  },
  academy: {
    label: "The Academy Group",
    color: "hsl(var(--chart-4))",
  },
  ai: {
    label: "AI Models",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function PieChartComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Task Distribution</CardTitle>
        <CardDescription>
          Overview of tasks across different projects
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto text-nowrap aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="totalTasks" nameKey="projectName" />
            <ChartLegend
              content={<ChartLegendContent nameKey="projectName" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="leading-none text-muted-foreground text-sm justify-center">
        Maximum Tasks accomplished for{" "}
        {
          chartConfig[
            chartData.reduce(
              (max, data) => (data.totalTasks > max.totalTasks ? data : max),
              chartData[0]
            ).projectName as keyof typeof chartConfig
          ].label
        }{" "}
        <span className="font-semibold mx-1">
          {" "}
          ({Math.max(...chartData.map((data) => data.totalTasks))})
        </span>{" "}
      </CardFooter>
    </Card>
  );
}
