
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Store, 
  ChevronRight, 
  ChevronDown,
  FileText,
  CreditCard,
  Hourglass,
  Package,
  ClipboardList,
  RefreshCw,
  User,
  MapPin,
  LogOut
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  title: string;
  icon?: JSX.Element;
  items?: Array<{
    title: string;
    icon: JSX.Element;
    path?: string;
  }>;
  path?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'My Account',
    items: [
      { title: 'My Profile', icon: <User className="w-4 h-4" />, path: '/wishlist/account/profile' },
      { title: 'Address', icon: <MapPin className="w-4 h-4" />, path: '/wishlist/account/address' }
    ]
  },
  {
    title: 'My Orders',
    items: [
      { title: 'All Orders', icon: <FileText className="w-4 h-4" />, path: '/wishlist/my-orders' },
      { title: 'Unpaid Orders', icon: <CreditCard className="w-4 h-4" />, path: '/wishlist/my-orders?status=unpaid' },
      { title: 'Processing Orders', icon: <Hourglass className="w-4 h-4" />, path: '/wishlist/my-orders?status=processing' },
      { title: 'Shipped Orders', icon: <Package className="w-4 h-4" />, path: '/wishlist/my-orders?status=shipped' },
      { title: 'Review Orders', icon: <ClipboardList className="w-4 h-4" />, path: '/wishlist/my-orders?status=review' },
      { title: 'Return Orders', icon: <RefreshCw className="w-4 h-4" />, path: '/wishlist/my-orders?status=return' }
    ]
  },
  {
    title: 'My Concern',
    items: [
      { title: 'Wish List', icon: <Heart className="w-4 h-4" />, path: '/wishlist' },
      { title: 'Recently Viewed', icon: <Clock className="w-4 h-4" />, path: '/wishlist/recently-viewed' },
      { title: 'Follow', icon: <Store className="w-4 h-4" />, path: '/wishlist/follow' }
    ]
  }
];

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'My Orders': true,
    'My Concern': true
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActiveRoute = (path?: string) => {
    if (!path) return false;
    const currentPath = location.pathname + location.search;
    const targetPath = path;
    return currentPath === targetPath;
  };

  const handleMenuItemClick = (title: string, path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Successfully signed out",
        });
        navigate('/auth');
      } else {
        throw new Error('Failed to sign out');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const sidebarVariants = {
    expanded: {
      width: "240px"
    },
    collapsed: {
      width: "0px"
    }
  };

  return (
    <motion.aside 
      className="fixed left-0 top-0 h-screen bg-white/95 backdrop-blur-md border-r border-border/50 shadow-xl z-20 md:relative md:min-h-screen overflow-y-auto"
      initial="expanded"
      variants={sidebarVariants}
    >
      <div className="p-6 w-64 h-full flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">Personal Centre</h2>
          <div className="h-1 w-12 bg-gradient-primary rounded-full"></div>
        </div>
        <nav className="flex-1 space-y-3 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title} className="group">
              {item.items ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="flex items-center justify-between w-full p-3 text-left font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200"
                  >
                    <span className="font-semibold">{item.title}</span>
                    <motion.div
                      animate={{ rotate: expandedSections[item.title] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </button>
                  {expandedSections[item.title] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden mt-2 space-y-1"
                    >
                      {item.items.map((subItem) => {
                        const isActive = isActiveRoute(subItem.path);
                        return (
                          <motion.button
                            key={subItem.title}
                            whileHover={{ x: 4 }}
                            onClick={() => handleMenuItemClick(subItem.title, subItem.path)}
                            className={`flex items-center gap-3 py-2.5 px-4 ml-4 text-sm rounded-lg transition-all duration-200 w-full text-left border-l-2 ${
                              isActive 
                                ? 'text-primary bg-primary/10 border-primary font-medium shadow-sm' 
                                : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary/30'
                            }`}
                          >
                            <div className={`${isActive ? 'text-primary' : 'text-primary/70'}`}>
                              {subItem.icon}
                            </div>
                            <span>{subItem.title}</span>
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="ml-auto w-2 h-2 bg-primary rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path || '#'}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-xl transition-all duration-200 hover:text-primary"
                >
                  <span className="font-medium">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="flex items-center justify-center gap-3 p-3 mt-6 text-destructive hover:text-white bg-destructive/10 hover:bg-destructive rounded-xl transition-all duration-200 w-full font-medium border border-destructive/20 hover:border-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
