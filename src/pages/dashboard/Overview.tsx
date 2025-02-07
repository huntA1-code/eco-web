
import { SalesRevenue } from "@/components/dashboard/SalesRevenue";
import { OrderManagement } from "@/components/dashboard/OrderManagement";
import { ProductInsights } from "@/components/dashboard/ProductInsights";
import { CustomerFeedback } from "@/components/dashboard/CustomerFeedback";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Star, Package } from "lucide-react";

export const Overview = () => {
  console.log("Rendering Overview component");
  
  return (
    <div className="space-y-8 p-6 bg-secondary/5 max-w-[1400px] mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your store's performance.
        </p>
      </div>

      {/* Shop Performance Summary */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Total Sales</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">$15,234</div>
            <div className="flex items-center pt-2 text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+15.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Active Products</p>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">195</div>
            <div className="flex items-center pt-2 text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8 new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Customer Rating</p>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="pt-2 text-xs text-muted-foreground">Based on 230 reviews</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Pending Orders</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">25</div>
            <div className="flex items-center pt-2 text-xs text-orange-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>5 need attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales & Revenue Deep Dive */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Sales & Revenue</h3>
        <SalesRevenue />
      </div>

      {/* Order Management */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Order Management</h3>
        <OrderManagement />
      </div>

      {/* Product Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Product & Inventory Insights</h3>
        <ProductInsights />
      </div>

      {/* Customer Feedback */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customer Interaction & Feedback</h3>
        <CustomerFeedback />
      </div>
    </div>
  );
};

export default Overview;
