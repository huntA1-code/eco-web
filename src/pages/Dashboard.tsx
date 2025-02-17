import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Store,
  Percent,
  MessageSquare,
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
  {
    icon: ShoppingBag,
    label: "Products",
    path: "/dashboard/products",
    submenu: productSubMenu,
  },
  { icon: ClipboardList, label: "Orders", path: "/dashboard/orders" },
  { icon: Store, label: "Stores", path: "/dashboard/stores" },
  { icon: Percent, label: "Discounts", path: "/dashboard/discounts" },
  { icon: MessageSquare, label: "Reviews", path: "/dashboard/reviews" },
];

const Dashboard = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isSubmenuItemActive = (submenuItems: typeof productSubMenu) => {
    return submenuItems.some((item) => location.pathname === item.path);
  };

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
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
                      <button
                        key={subItem.path}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`w-full text-left ml-9 px-4 py-2 text-sm rounded-lg transition-colors ${
                          location.pathname === subItem.path
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation(link.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </button>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
