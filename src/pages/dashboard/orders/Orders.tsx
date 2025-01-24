import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data type based on schema
type Order = {
  id: string;
  user_id: string;
  order_date: string;
  status: "pending" | "shipped" | "delivered";
  user: {
    First_name: string;
    Last_name: string;
    email: string;
  };
  order_items: Array<{
    id: string;
    product_item: {
      id: string;
      name: string;
      price: number;
    };
    qty: number;
  }>;
};

// Mock data
const mockOrders: Order[] = [
  {
    id: "1",
    user_id: "user1",
    order_date: "2024-01-24T10:00:00",
    status: "pending",
    user: {
      First_name: "John",
      Last_name: "Doe",
      email: "john@example.com"
    },
    order_items: [
      {
        id: "item1",
        product_item: {
          id: "prod1",
          name: "Product 1",
          price: 99.99
        },
        qty: 2
      }
    ]
  },
  {
    id: "2",
    user_id: "user2",
    order_date: "2024-01-23T15:30:00",
    status: "shipped",
    user: {
      First_name: "Jane",
      Last_name: "Smith",
      email: "jane@example.com"
    },
    order_items: [
      {
        id: "item2",
        product_item: {
          id: "prod2",
          name: "Product 2",
          price: 149.99
        },
        qty: 1
      }
    ]
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusBadgeColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {order.user.First_name} {order.user.Last_name}
                    </p>
                    <p className="text-sm text-gray-500">{order.user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={`${getStatusBadgeColor(order.status)} flex gap-2 items-center w-fit`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.order_items.reduce((acc, item) => acc + item.qty, 0)}
                </TableCell>
                <TableCell>
                  ${order.order_items.reduce((acc, item) => acc + (item.product_item.price * item.qty), 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/orders/${order.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/orders/${order.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit order
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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