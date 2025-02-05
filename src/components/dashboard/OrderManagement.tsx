import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Package, Truck, AlertCircle } from "lucide-react";

const orderStatusData = [
  { name: "Processing", value: 30, color: "#8B5CF6" },
  { name: "Shipped", value: 45, color: "#10B981" },
  { name: "Delivered", value: 20, color: "#3B82F6" },
  { name: "Cancelled", value: 5, color: "#EF4444" },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-03-10",
    status: "processing",
    amount: 150.00,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-03-09",
    status: "shipped",
    amount: 299.99,
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    date: "2024-03-09",
    status: "delivered",
    amount: 75.50,
  },
];

export const OrderManagement = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Orders to Process</span>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">New Orders</p>
                  <p className="text-sm text-muted-foreground">Needs attention</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">12</Badge>
            </div>

            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Pending Orders</p>
                  <p className="text-sm text-muted-foreground">Being processed</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">5</Badge>
            </div>

            <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Ready to Ship</p>
                  <p className="text-sm text-muted-foreground">Awaiting shipment</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">8</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>Distribution of all orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
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

      <Card className="lg:col-span-1 bg-white">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest order activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === "delivered" ? "default" :
                      order.status === "shipped" ? "secondary" :
                      "outline"
                    }>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Orders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};