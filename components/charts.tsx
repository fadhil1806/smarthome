"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Updated chartData to only include 'light'
const chartData = [
  {
    light: 3953,
    formattedTime: "15/11/2024 08:40:04",
  },

]

const chartConfig = {
  light: {
    label: "Light",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Charts() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("light")
  const [chartData, setChartData] = React.useState<{ light: string, formattedTime: string }[]>([]);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('https://server-home.fadhilrabbani.vercel.app/api/data/sensor/light');
        const data = await response.json();
        // Update chart data with new data
        setChartData((prevData) => [
          ...prevData,
          { light: data.light, formattedTime: data.formattedTime },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 500); // Fetch data every 1 second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate total for 'light'
  const total = React.useMemo(
    () => ({
      light: chartData.reduce((acc, curr) => acc + parseFloat(curr.light), 0),
    }),
    [chartData]
  );  

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Light Data</CardTitle>
          <CardDescription>
            Showing total light readings
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={activeChart === "light"}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("light")}
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.light.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.light.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="formattedTime"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey="light" fill={`var(--color-light)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
