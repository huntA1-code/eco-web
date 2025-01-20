import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
  ChevronDown,
} from "lucide-react";

const productSubMenu = [
  { label: "View Products", path: "/dashboard/products/view" },
  { label: "Add Product", path: "/dashboard/products/add" },
  { label: "Categories", path: "/dashboard/products/categories" },
  { label: "Brands", path: "/dashboard/products/brands" },
  { label: "Colors", path: "/dashboard/products/colors" },
  { label: "Sizes", path: "/dashboard/products/sizes" },
  { label: "Attributes", path: "/dashboard/products/attributes" },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Users, label: "Users", path: "/dashboard/users" },
  {
    icon: ShoppingBag,
    label: "Products",
    path: "/dashboard/products",
    submenu: productSubMenu,
  },
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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // Check if current path matches any submenu item
  const isSubmenuItemActive = (submenuItems: typeof productSubMenu) => {
    return submenuItems.some((item) => location.pathname === item.path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          {sidebarLinks.map((link) => (
            <div key={link.path} className="mb-1">
              {link.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(link.label)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isSubmenuItemActive(link.submenu)
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openSubmenu === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`mt-1 space-y-1 ${
                      openSubmenu === link.label || isSubmenuItemActive(link.submenu)
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block ml-9 px-4 py-2 text-sm rounded-lg transition-colors ${
                          location.pathname === subItem.path
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              )}
            </div>
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