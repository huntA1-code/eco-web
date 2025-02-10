
import { useState } from "react";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    products: [
      {
        id: "p1",
        name: "Manfinity Hyper men's Sports T-Shirt",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        quantity: 1,
        price: 27.96
      },
      {
        id: "p2",
        name: "Manfinity Hoodie Classic",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        quantity: 2,
        price: 39.99
      }
    ],
    totalAmount: 107.94
  },
  {
    id: "2",
    orderNumber: "GSO1ML12R000T1B",
    orderDate: "2024-02-10T13:13:30",
    status: "pending",
    timeRemaining: "03:22:01",
    products: [
      {
        id: "p3",
        name: "Manfinity Summer Collection T-Shirt",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
        quantity: 1,
        price: 6.79
      }
    ],
    totalAmount: 6.79
  }
];

const ORDER_CATEGORIES = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Unpaid" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "review", label: "Review" },
  { id: "deleted", label: "Deleted Orders History" }
] as const;

export default function MyOrders() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const navigate = useNavigate();

  const handleOrderDetails = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-gray-100 text-gray-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">MY ORDERS</h1>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="font-semibold">Package tracking</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8 mb-8 overflow-x-auto pb-2">
          {ORDER_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap pb-2 border-b-2 ${
                activeCategory === category.id
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Products</TableHead>
                <TableHead>Actual Price</TableHead>
                <TableHead>Commodity operation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order operation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-t">
                  <TableCell className="py-6">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500">
                        {format(new Date(order.orderDate), "dd MMM yyyy HH:mm:ss")}
                      </div>
                      <div className="text-sm">
                        Order NO. {order.orderNumber}
                      </div>
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start gap-4"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    £{order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" className="w-full mb-2">
                      Repurchase
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Badge className={getStatusColor(order.status)}>
                        Waiting for Payment
                      </Badge>
                      <button
                        onClick={() => handleOrderDetails(order.id)}
                        className="text-blue-600 hover:underline block"
                      >
                        Order details
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {order.timeRemaining && (
                        <div className="flex items-center gap-1 text-red-500">
                          <Clock className="w-4 h-4" />
                          <span>{order.timeRemaining}</span>
                        </div>
                      )}
                      <Button className="w-full">
                        Checkout
                      </Button>
                      <button className="text-blue-600 hover:underline w-full text-center">
                        Edit Address
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
