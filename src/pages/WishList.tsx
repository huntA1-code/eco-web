import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
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
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentlyViewed from './RecentlyViewed';

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

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    description: "Beautiful floral dress perfect for summer days",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    likes: 128,
    unitsSold: 100,
  },
  {
    id: 2,
    name: "Classic White Shirt",
    description: "Timeless white shirt for any occasion",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    likes: 256,
    unitsSold: 150,
  },
  {
    id: 3,
    name: "Leather Jacket",
    description: "Classic leather jacket for a bold look",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    likes: 189,
    unitsSold: 75,
  },
  {
    id: 4,
    name: "Denim Jeans",
    description: "Comfortable and stylish denim jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    likes: 312,
    unitsSold: 200,
  }
];

export default function WishList() {
  const [isSignedIn] = useState(true);
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'My Orders': true,
    'My Concern': true
  });

  const handleMenuItemClick = (title: string, path?: string) => {
    if (isSignedIn && path) {
      navigate(path);
    }
  };

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
        { title: 'Wish List', icon: <Heart className="w-4 h-4" />, path: '/wishlist' },
        { title: 'Recently Viewed', icon: <Clock className="w-4 h-4" />, path: '/wishlist/recently-viewed' },
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
        </div>
      </motion.aside>

      <main className="flex-1 p-8">
        <Routes>
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="/" element={
            <>
              {!isSignedIn ? (
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
              ) : (
                <div className="container mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-4">
                      <Select defaultValue="category">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="dresses">Dresses</SelectItem>
                          <SelectItem value="tops">Tops</SelectItem>
                          <SelectItem value="bottoms">Bottoms</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="status">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="instock">In Stock</SelectItem>
                          <SelectItem value="outofstock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        All Filters
                      </Button>
                    </div>
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recently Added</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <Button variant="outline" className="hover:bg-primary/10">
                      Price cut
                    </Button>
                    <Button variant="outline" className="hover:bg-primary/10">
                      Low in stock
                    </Button>
                    <Button variant="outline" className="hover:bg-primary/10">
                      Back in stock
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover"
                          />
                          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                            <Heart className="w-5 h-5 text-gray-600 hover:text-primary" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-500">{product.unitsSold}+ sold</span>
                            <span className="font-bold text-lg">£{product.price}</span>
                          </div>
                          <Button className="w-full flex items-center justify-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          } />
        </Routes>
      </main>
    </div>
  );
}
