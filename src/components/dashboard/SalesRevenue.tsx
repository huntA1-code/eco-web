
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const salesData = [
  { date: "2024-03-01", sales: 4000, revenue: 6000, orders: 45 },
  { date: "2024-03-02", sales: 3000, revenue: 4500, orders: 38 },
  { date: "2024-03-03", sales: 5000, revenue: 7500, orders: 52 },
  { date: "2024-03-04", sales: 2780, revenue: 4170, orders: 31 },
  { date: "2024-03-05", sales: 1890, revenue: 2835, orders: 25 },
  { date: "2024-03-06", sales: 2390, revenue: 3585, orders: 29 },
  { date: "2024-03-07", sales: 3490, revenue: 5235, orders: 42 },
  { date: "2024-03-08", sales: 4200, revenue: 6300, orders: 48 },
  { date: "2024-03-09", sales: 3800, revenue: 5700, orders: 44 },
  { date: "2024-03-10", sales: 4500, revenue: 6750, orders: 51 },
];

export const SalesRevenue = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  console.log("Rendering SalesRevenue component with timeRange:", timeRange);

  return (
    <Card className="col-span-4 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Daily sales and revenue overview</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                name="Revenue"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#F97316"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
