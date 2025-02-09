
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  User, 
  Clock, 
  Store, 
  ChevronRight, 
  ChevronDown,
  FileText,
  CreditCard,
  Hourglass,
  Package,
  ClipboardList,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon?: JSX.Element;
  items?: Array<{
    title: string;
    icon: JSX.Element;
  }>;
  path?: string;
}

export default function WishList() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'My Orders': true,
    'My Concern': true
  });

  const menuItems: MenuItem[] = [
    {
      title: 'My Account',
      path: '/account'
    },
    {
      title: 'My Assets',
      path: '/assets'
    },
    {
      title: 'My Orders',
      items: [
        { title: 'All Orders', icon: <FileText className="w-4 h-4" /> },
        { title: 'Unpaid Orders', icon: <CreditCard className="w-4 h-4" /> },
        { title: 'Processing Orders', icon: <Hourglass className="w-4 h-4" /> },
        { title: 'Shipped Orders', icon: <Package className="w-4 h-4" /> },
        { title: 'Review Orders', icon: <ClipboardList className="w-4 h-4" /> },
        { title: 'Return Orders', icon: <RefreshCw className="w-4 h-4" /> }
      ]
    },
    {
      title: 'My Concern',
      items: [
        { title: 'Wish List', icon: <Heart className="w-4 h-4" /> },
        { title: 'Recently Viewed', icon: <Clock className="w-4 h-4" /> },
        { title: 'Follow', icon: <Store className="w-4 h-4" /> }
      ]
    }
  ];

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
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <motion.aside 
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg overflow-hidden z-20 md:relative"
        initial="expanded"
        variants={sidebarVariants}
      >
        <div className="p-4 w-60">
          <h2 className="text-xl font-semibold mb-6">Personal Centre</h2>
          <nav>
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
                          <Link
                            key={subItem.title}
                            to={subItem.title === 'Wish List' ? '/wishlist' : '#'}
                            className="flex items-center gap-2 py-2 px-4 text-sm hover:text-primary transition-colors"
                          >
                            {subItem.icon}
                            <span>{subItem.title}</span>
                          </Link>
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
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            MY WISHLIST
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-gray-500 mb-4">
              It is empty here. Personalize your shopping experience with your Wishlist.
            </p>
            <Button
              className="bg-foreground text-white hover:bg-foreground/90 rounded-full px-8"
            >
              SIGN IN / REGISTER
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Heart It.</h2>
            <p className="text-gray-600 mb-6">Store everything you love on one page.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="text-primary w-5 h-5" />
                <p>Think about it before purchasing it.</p>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-primary w-5 h-5" />
                <p>Get notification about out-of-stock items.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
