import React from "react";
import {
  Users,
  ShoppingBag,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statsCards = [
  {
    title: "Total Users",
    value: "1,234",
    description: "+12% from last month",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "456",
    description: "+5% from last month",
    icon: ShoppingBag,
  },
  {
    title: "Total Orders",
    value: "789",
    description: "+8% from last month",
    icon: ClipboardList,
  },
  {
    title: "Revenue",
    value: "$12,345",
    description: "+15% from last month",
    icon: DollarSign,
  },
];

const Overview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have 12 orders requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Placeholder for orders list */}
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order #1234</p>
                  <p className="text-sm text-muted-foreground">
                    Pending payment - 2 items
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Top selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Placeholder for popular products */}
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Product Name</p>
                  <p className="text-sm text-muted-foreground">
                    234 units sold
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;