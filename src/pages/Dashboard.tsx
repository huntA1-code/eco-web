
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
  ChevronRight,
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Manage your store</p>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto scrollbar-hide transition-all duration-300 ${sidebarOpen ? 'p-4 space-y-2' : 'p-2 space-y-3'}`}>
          {sidebarLinks.map((link, index) => (
            <div 
              key={link.path} 
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.submenu ? (
                <div className="space-y-1">
                  <div className="relative group/tooltip">
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className={`
                        w-full flex items-center gap-3 rounded-xl 
                        transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden
                        ${sidebarOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'}
                        ${isSubmenuItemActive(link.submenu)
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                          : "text-gray-700 hover:bg-gray-100/80 hover:shadow-md"
                        }
                      `}
                    >
                      <div className={`
                        rounded-lg transition-all duration-200 z-10 relative
                        ${sidebarOpen ? 'p-2' : 'p-3'}
                        ${isSubmenuItemActive(link.submenu) 
                          ? "bg-white/20" 
                          : "bg-primary/10 group-hover:bg-primary/15"
                        }
                      `}>
                        <link.icon className={`transition-all duration-200 ${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </div>
                      
                      {sidebarOpen && (
                        <>
                          <span className="font-medium transition-all duration-300 z-10 relative flex-1 text-left">
                            {link.label}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 z-10 ${
                              openSubmenu === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                      
                      {isSubmenuItemActive(link.submenu) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
                      )}
                    </button>

                    {/* Tooltip for collapsed state */}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        {link.label}
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </div>

                  {/* Submenu */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${(openSubmenu === link.label || isSubmenuItemActive(link.submenu)) && sidebarOpen
                        ? "max-h-96 opacity-100" 
                        : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200/50 pl-4">
                      {link.submenu.map((subItem, subIndex) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`
                            w-full text-left px-4 py-2.5 text-sm rounded-lg 
                            transition-all duration-200 hover:translate-x-1 group relative
                            ${location.pathname === subItem.path
                              ? "bg-primary/10 text-primary font-medium shadow-sm border-l-2 border-primary"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                          style={{ animationDelay: `${subIndex * 25}ms` }}
                        >
                          <span className="relative z-10">{subItem.label}</span>
                          {location.pathname === subItem.path && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group/tooltip">
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className={`
                      w-full flex items-center gap-3 rounded-xl 
                      transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden
                      ${sidebarOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'}
                      ${location.pathname === link.path
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                        : "text-gray-700 hover:bg-gray-100/80 hover:shadow-md"
                      }
                    `}
                  >
                    <div className={`
                      rounded-lg transition-all duration-200 z-10 relative
                      ${sidebarOpen ? 'p-2' : 'p-3'}
                      ${location.pathname === link.path 
                        ? "bg-white/20" 
                        : "bg-primary/10 group-hover:bg-primary/15"
                      }
                    `}>
                      <link.icon className={`transition-all duration-200 ${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </div>
                    
                    {sidebarOpen && (
                      <span className="font-medium transition-all duration-300 z-10 relative">
                        {link.label}
                      </span>
                    )}
                    
                    {location.pathname === link.path && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
                    )}
                  </button>

                  {/* Tooltip for collapsed state */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                      {link.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Toggle Button for Desktop */}
        <div className="hidden lg:block p-4 border-t border-gray-200/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-3 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-200 flex items-center justify-center group"
          >
            <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50/50 to-white">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-gray-900">Dashboard</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="p-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
