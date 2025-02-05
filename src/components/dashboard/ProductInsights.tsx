import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, AlertTriangle } from "lucide-react";

const productStatusData = [
  { name: "Active Products", count: 150 },
  { name: "Inactive Products", count: 45 },
];

const lowStockProducts = [
  { id: 1, name: "Premium T-Shirt", stock: 5, threshold: 10, price: 29.99 },
  { id: 2, name: "Designer Jeans", stock: 3, threshold: 8, price: 89.99 },
  { id: 3, name: "Running Shoes", stock: 2, threshold: 5, price: 119.99 },
];

const topProducts = [
  { name: "Premium T-Shirt", sales: 120, revenue: 3599 },
  { name: "Designer Jeans", sales: 85, revenue: 7649 },
  { name: "Running Shoes", sales: 65, revenue: 7799 },
  { name: "Casual Shirt", sales: 55, revenue: 2199 },
];

export const ProductInsights = () => {
  console.log("Rendering ProductInsights component");
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Product Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Low Stock Alert</CardTitle>
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={product.stock <= product.threshold / 2 ? "destructive" : "secondary"}>
                        Stock: {product.stock}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Threshold: {product.threshold}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold">${product.price}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-white md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
          <Package2 className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="sales" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};