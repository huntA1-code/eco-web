
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const heroContent = [
  {
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    title: "Weekly Deals",
    description: "70% OFF",
    caption: "Limited time offer on selected items"
  },
  {
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
    title: "Spring Collection",
    description: "New Arrivals",
    caption: "Discover the latest trends"
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    title: "Fashion Week",
    description: "Special Event",
    caption: "Exclusive deals on designer brands"
  }
];

const trendingProducts = [
  {
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    price: "16.00",
    tag: "#Valentine's Day",
    status: "Peaked"
  },
  {
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    price: "17.19",
    tag: "#Punk Fashion",
    status: "Peaked"
  },
  {
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516",
    price: "7.19",
    tag: "#Printed Bikini",
    status: "Rising 66%"
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    price: "14.79",
    tag: "#Double Denim",
    status: "Peaked"
  }
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-accent/5 to-white/80">
      <div className="container mx-auto h-full">
        <div className="grid md:grid-cols-12 gap-6 items-center min-h-[600px]">
          {/* Left Sidebar Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 space-y-6 z-10"
          >
            {/* QuickShip Banner */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-lg text-green-700">QuickShip</h3>
                  <p className="text-sm text-green-600">Delivered in 3-5 business days!</p>
                </div>
              </div>
            </motion.div>

            {/* Trendy Stores Card */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative overflow-hidden rounded-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050"
                alt="Trendy Stores"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">TRENDY STORES</h3>
                <p className="text-sm text-white/90 mb-3">Stay trendy, shop fresh</p>
                <Link 
                  to="/products" 
                  className="text-white hover:text-accent-new transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* SHEIN Club Card */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 shadow-lg border border-orange-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-lg text-orange-700">SHEIN CLUB</h3>
              </div>
              <p className="text-sm text-orange-700 mb-1">Save 5% OFF on 100k items</p>
              <p className="text-xs text-orange-600 mb-3">With a total of 27x shipping vouchers</p>
              <button className="w-full bg-orange-500 text-white rounded-full py-2 text-sm font-medium hover:bg-orange-600 transition-colors">
                Join Now
              </button>
            </motion.div>
          </motion.div>

          {/* Center Carousel Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 relative h-[400px] md:h-[500px]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={heroContent[currentImageIndex].image}
                alt="Fashion"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              
              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-2 text-red-500">
                    {heroContent[currentImageIndex].description}
                  </h2>
                  <p className="text-lg text-white/90">{heroContent[currentImageIndex].caption}</p>
                  
                  <Link 
                    to="/products" 
                    className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full mt-4 hover:bg-accent-new hover:text-white transition-colors"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {heroContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Trending Products Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                Top Trends
                <ArrowRight className="w-4 h-4" />
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {trendingProducts.map((product, index) => (
                  <div key={index} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.tag}
                        className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "Rising 66%" 
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-orange-500 font-bold mt-2">£{product.price}</p>
                    <p className="text-xs text-gray-600">{product.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
