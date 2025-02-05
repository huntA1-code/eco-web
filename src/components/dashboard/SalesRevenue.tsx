import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
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

const productRevenue = [
  { name: "Electronics", value: 4000, color: "#8B5CF6" },
  { name: "Clothing", value: 3000, color: "#10B981" },
  { name: "Home & Garden", value: 2000, color: "#3B82F6" },
  { name: "Books", value: 1500, color: "#F97316" },
  { name: "Sports", value: 1000, color: "#EC4899" },
];

const paymentStatus = [
  { name: "Paid", value: 65, color: "#10B981" },
  { name: "Pending", value: 25, color: "#F97316" },
  { name: "Processing", value: 10, color: "#8B5CF6" },
];

const platformFees = [
  { name: "Commission", value: 2500 },
  { name: "Processing Fee", value: 500 },
  { name: "Marketing Fee", value: 300 },
  { name: "Other Fees", value: 200 },
];

export const SalesRevenue = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  console.log("Rendering SalesRevenue component with timeRange:", timeRange);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                <Legend />
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

      <Card className="col-span-3 bg-white">
        <CardHeader>
          <CardTitle>Revenue Distribution</CardTitle>
          <CardDescription>Product category breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productRevenue}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4 bg-white">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>Overview of payment processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 bg-white">
        <CardHeader>
          <CardTitle>Platform Fees</CardTitle>
          <CardDescription>Breakdown of platform charges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformFees} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};