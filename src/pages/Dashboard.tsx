import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ClipboardList,
  Store,
  CreditCard,
  Percent,
  MessageSquare,
  Image,
  BarChart,
  Settings,
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Users, label: "Users", path: "/dashboard/users" },
  { icon: ShoppingBag, label: "Products", path: "/dashboard/products" },
  { icon: ClipboardList, label: "Orders", path: "/dashboard/orders" },
  { icon: Store, label: "Stores", path: "/dashboard/stores" },
  { icon: CreditCard, label: "Payments", path: "/dashboard/payments" },
  { icon: Percent, label: "Discounts", path: "/dashboard/discounts" },
  { icon: MessageSquare, label: "Reviews", path: "/dashboard/reviews" },
  { icon: Image, label: "Content", path: "/dashboard/content" },
  { icon: BarChart, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;