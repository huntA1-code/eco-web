import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Package, Truck, CheckCircle, AlertCircle, XCircle, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "review" | "deleted";
interface OrderProduct {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}
interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  products: OrderProduct[];
  totalAmount: number;
  timeRemaining?: string;
}
const orders: Order[] = [
  {
    id: "1",
    orderNumber: "GSO1ML12R000XMK",
    orderDate: "2024-02-10T13:35:12",
    status: "pending",
    timeRemaining: "03:43:43",
    products: [{
      id: "p1",
      name: "Manfinity Hyper men's Sports T-Shirt",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      quantity: 1,
      price: 27.96
    }, {
      id: "p2",
      name: "Manfinity Hoodie Classic",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      quantity: 2,
      price: 39.99
    }],
    totalAmount: 107.94
  },
  {
    id: "2",
    orderNumber: "GSO1ML12R000T1B",
    orderDate: "2024-02-10T13:13:30",
    status: "processing",
    products: [{
      id: "p3",
      name: "Manfinity Summer Collection T-Shirt",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      quantity: 1,
      price: 6.79
    }],
    totalAmount: 6.79
  },
  {
    id: "3",
    orderNumber: "GSO1ML12R000ABC",
    orderDate: "2024-02-08T10:15:30",
    status: "shipped",
    products: [{
      id: "p4",
      name: "Premium Denim Jacket",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      quantity: 1,
      price: 89.99
    }],
    totalAmount: 89.99
  },
  {
    id: "4",
    orderNumber: "GSO1ML12R000DEF",
    orderDate: "2024-02-05T14:22:10",
    status: "delivered",
    products: [{
      id: "p5",
      name: "Classic White Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      quantity: 2,
      price: 79.99
    }],
    totalAmount: 159.98
  },
  {
    id: "5",
    orderNumber: "GSO1ML12R000GHI",
    orderDate: "2024-01-28T16:45:20",
    status: "review",
    products: [{
      id: "p6",
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      quantity: 1,
      price: 149.99
    }],
    totalAmount: 149.99
  }
];
const ORDER_CATEGORIES = [
  { id: "all", label: "All Orders", icon: Package, count: orders.length },
  { id: "pending", label: "Pending Payment", icon: Clock, count: orders.filter(o => o.status === "pending").length },
  { id: "processing", label: "Processing", icon: AlertCircle, count: orders.filter(o => o.status === "processing").length },
  { id: "shipped", label: "Shipped", icon: Truck, count: orders.filter(o => o.status === "shipped").length },
  { id: "delivered", label: "Delivered", icon: CheckCircle, count: orders.filter(o => o.status === "delivered").length },
  { id: "review", label: "To Review", icon: CheckCircle, count: orders.filter(o => o.status === "review").length },
] as const;
export default function MyOrders() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleOrderDetails = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return { 
          variant: "secondary" as const, 
          label: "Pending Payment", 
          color: "text-yellow-600",
          bg: "bg-yellow-50 border-yellow-200"
        };
      case "processing":
        return { 
          variant: "default" as const, 
          label: "Processing", 
          color: "text-blue-600",
          bg: "bg-blue-50 border-blue-200"
        };
      case "shipped":
        return { 
          variant: "outline" as const, 
          label: "Shipped", 
          color: "text-green-600",
          bg: "bg-green-50 border-green-200"
        };
      case "delivered":
        return { 
          variant: "outline" as const, 
          label: "Delivered", 
          color: "text-emerald-600",
          bg: "bg-emerald-50 border-emerald-200"
        };
      case "review":
        return { 
          variant: "secondary" as const, 
          label: "To Review", 
          color: "text-purple-600",
          bg: "bg-purple-50 border-purple-200"
        };
      default:
        return { 
          variant: "destructive" as const, 
          label: "Cancelled", 
          color: "text-red-600",
          bg: "bg-red-50 border-red-200"
        };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesCategory = activeCategory === "all" || order.status === activeCategory;
    const matchesSearch = searchQuery === "" || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-muted-foreground mt-2">Track and manage your order history</p>
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="mb-6 overflow-hidden">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto bg-muted/30 backdrop-blur-sm">
                {ORDER_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline font-medium">{category.label}</span>
                        <span className="sm:hidden font-medium text-xs">{category.label.split(' ')[0]}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {ORDER_CATEGORIES.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredOrders.length === 0 ? (
                      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Package className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                          <p className="text-muted-foreground text-center">
                            {searchQuery ? "Try adjusting your search terms" : `No ${category.label.toLowerCase()} at the moment`}
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block">
                          <Card className="bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-border/50 hover:bg-transparent">
                                  <TableHead className="font-semibold">Order Details</TableHead>
                                  <TableHead className="font-semibold">Products</TableHead>
                                  <TableHead className="font-semibold">Total</TableHead>
                                  <TableHead className="font-semibold text-center">Status</TableHead>
                                  <TableHead className="font-semibold text-center">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredOrders.map((order, index) => {
                                  const statusConfig = getStatusConfig(order.status);
                                  return (
                                    <motion.tr
                                      key={order.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="border-border/50 hover:bg-muted/20 transition-colors"
                                    >
                                      <TableCell className="py-6">
                                        <div className="space-y-2">
                                          <div className="font-medium text-sm">
                                            #{order.orderNumber}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            {format(new Date(order.orderDate), "dd MMM yyyy, HH:mm")}
                                          </div>
                                          {order.timeRemaining && (
                                            <div className="flex items-center gap-1 text-red-500 text-xs">
                                              <Clock className="h-3 w-3" />
                                              <span>{order.timeRemaining} left</span>
                                            </div>
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex flex-col gap-3">
                                          {order.products.map((product) => (
                                            <div key={product.id} className="flex items-center gap-3">
                                              <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-md border"
                                              />
                                              <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{product.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                  Qty: {product.quantity} × £{product.price}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="font-semibold text-lg">
                                          £{order.totalAmount.toFixed(2)}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge 
                                          variant={statusConfig.variant}
                                          className={`${statusConfig.bg} ${statusConfig.color} border`}
                                        >
                                          {statusConfig.label}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex flex-col gap-2">
                                          {order.status === "pending" && (
                                            <Button size="sm" className="w-full">
                                              Pay Now
                                            </Button>
                                          )}
                                          {order.status === "delivered" && (
                                            <Button variant="outline" size="sm" className="w-full">
                                              Reorder
                                            </Button>
                                          )}
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => handleOrderDetails(order.id)}
                                            className="w-full text-xs"
                                          >
                                            View Details
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </motion.tr>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </Card>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4">
                          {filteredOrders.map((order, index) => {
                            const statusConfig = getStatusConfig(order.status);
                            return (
                              <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Card className="bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300">
                                  <CardContent className="p-4">
                                    {/* Order Header */}
                                    <div className="flex justify-between items-start mb-4">
                                      <div>
                                        <p className="font-semibold text-sm">#{order.orderNumber}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {format(new Date(order.orderDate), "dd MMM yyyy, HH:mm")}
                                        </p>
                                        {order.timeRemaining && (
                                          <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{order.timeRemaining} left</span>
                                          </div>
                                        )}
                                      </div>
                                      <Badge 
                                        variant={statusConfig.variant}
                                        className={`${statusConfig.bg} ${statusConfig.color} border text-xs`}
                                      >
                                        {statusConfig.label}
                                      </Badge>
                                    </div>

                                    {/* Products */}
                                    <div className="space-y-3 mb-4">
                                      {order.products.map((product) => (
                                        <div key={product.id} className="flex items-center gap-3">
                                          <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-md border"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                              Qty: {product.quantity} × £{product.price}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                      <div className="font-semibold">
                                        Total: £{order.totalAmount.toFixed(2)}
                                      </div>
                                      <div className="flex gap-2">
                                        {order.status === "pending" && (
                                          <Button size="sm">Pay Now</Button>
                                        )}
                                        {order.status === "delivered" && (
                                          <Button variant="outline" size="sm">Reorder</Button>
                                        )}
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          onClick={() => handleOrderDetails(order.id)}
                                        >
                                          Details
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}