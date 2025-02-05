import { SalesRevenue } from "@/components/dashboard/SalesRevenue";
import { OrderManagement } from "@/components/dashboard/OrderManagement";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Star } from "lucide-react";

export const Overview = () => {
  console.log("Rendering Overview component");
  
  return (
    <div className="space-y-6 p-6 bg-secondary/5">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your store's performance.
        </p>
      </div>

      {/* Shop Performance Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Total Sales</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">$12,345</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Total Orders</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">245</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Shop Rating</p>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground">Based on 180 reviews</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Available Balance</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">$5,240</div>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales & Revenue Deep Dive */}
      <SalesRevenue />

      {/* Order Management */}
      <OrderManagement />
    </div>
  );
};

export default Overview;