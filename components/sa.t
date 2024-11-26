import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Light Intensity",
  },
} satisfies ChartConfig;

export function Charts() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("views");
  const [chartData, setChartData] = React.useState<{ light: string, formattedTime: string }[]>([]);

  // Fetch the data every 1 second
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
    }, 1000); // Fetch data every 1 second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate total light intensity
  const totalLight = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + parseInt(curr.light), 0),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Light Intensity Over Time</CardTitle>
          <CardDescription>
            Showing light intensity data over time.
          </CardDescription>
        </div>
        <div className="flex">
          <button
            key="views"
            data-active={activeChart === "views"}
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("views")}
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.views.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totalLight.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="light"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => value}
              />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length > 0) {
                    const { light, formattedTime } = payload[0].payload;
                    return (
                      <ChartTooltipContent>
                        <div>Light: {light}</div>
                        <div>Time: {formattedTime}</div>
                      </ChartTooltipContent>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="light"
                stroke="hsl(var(--chart-1))"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
