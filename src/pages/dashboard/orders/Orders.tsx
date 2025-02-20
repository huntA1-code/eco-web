
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Status = "pending" | "shipped" | "delivered";

interface Order {
  id: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  order_date: string;
  status: Status;
  total_items: number;
  total_amount: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      user: {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com"
      },
      order_date: "2024-03-10",
      status: "pending",
      total_items: 3,
      total_amount: 150.00
    },
    {
      id: "2",
      user: {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com"
      },
      order_date: "2024-03-09",
      status: "shipped",
      total_items: 2,
      total_amount: 89.99
    },
    {
      id: "3",
      user: {
        first_name: "Michael",
        last_name: "Johnson",
        email: "michael@example.com"
      },
      order_date: "2024-03-08",
      status: "delivered",
      total_items: 1,
      total_amount: 249.99
    },
    {
      id: "4",
      user: {
        first_name: "Sarah",
        last_name: "Williams",
        email: "sarah@example.com"
      },
      order_date: "2024-03-07",
      status: "pending",
      total_items: 4,
      total_amount: 199.99
    }
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleStatusChange = async (orderId: string, newStatus: Status) => {
    try {
      // Simulate API call
      console.log("Updating status for order:", orderId, "to:", newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      order.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      order.user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      order.user.email.toLowerCase().includes(search.toLowerCase())
    );
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{`${order.user.first_name} ${order.user.last_name}`}</div>
                    <div className="text-sm text-muted-foreground">{order.user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value: Status) => handleStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>
                        <Badge variant={
                          order.status === "delivered" ? "default" :
                          order.status === "shipped" ? "secondary" :
                          "outline"
                        }>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{order.total_items}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
