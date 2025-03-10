
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
import { Link, useNavigate } from 'react-router-dom';
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
  const { toast } = useToast();

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
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg z-20 md:relative overflow-y-auto"
      initial="expanded"
      variants={sidebarVariants}
    >
      <div className="p-4 w-60 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Personal Centre</h2>
        <nav className="flex-1 h-[calc(100%-4rem)] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title} className="mb-2">
              {item.items ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>{item.title}</span>
                    {expandedSections[item.title] ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                  {expandedSections[item.title] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden ml-7"
                    >
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.title}
                          onClick={() => handleMenuItemClick(subItem.title, subItem.path)}
                          className="flex items-center gap-2 py-2 px-4 text-sm hover:text-primary transition-colors w-full text-left"
                        >
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path || '#'}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 p-2 mt-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
}
