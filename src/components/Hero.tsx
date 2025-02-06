
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const heroContent = [
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Weekly Deals",
    description: "Up to 70% OFF",
    caption: "Limited time offer on selected items"
  },
  {
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    title: "Trendy Stores",
    description: "Stay Trendy, Shop Fresh",
    caption: "New arrivals every week"
  },
  {
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    title: "SHEIN CLUB",
    description: "Save 5% OFF on 100k items",
    caption: "With a total of 27x shipping vouchers"
  },
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
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 space-y-6 z-10"
          >
            {/* QuickShip Banner */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-accent-new" />
                <div>
                  <h3 className="font-semibold text-lg">QuickShip</h3>
                  <p className="text-sm text-gray-600">Delivered in 3-5 business days!</p>
                </div>
              </div>
            </motion.div>

            {/* Trendy Stores Card */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2">Trendy Stores</h3>
              <p className="text-sm text-gray-600 mb-3">Stay trendy, shop fresh styles</p>
              <Link 
                to="/products" 
                className="text-accent-new hover:text-accent-best transition-colors text-sm font-medium flex items-center gap-1"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* SHEIN Club Card */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="bg-gradient-to-r from-accent-new/10 to-accent-best/10 rounded-xl p-4 shadow-lg border border-accent-new/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-accent-new" />
                <h3 className="font-bold text-lg">SHEIN CLUB</h3>
              </div>
              <p className="text-sm mb-1">Save 5% OFF on 100k items</p>
              <p className="text-xs text-gray-600">With a total of 27x shipping vouchers</p>
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 relative h-[400px] md:h-[500px] w-full"
          >
            {/* Main Carousel */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={heroContent[currentImageIndex].image}
                alt="Fashion"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">{heroContent[currentImageIndex].description}</h2>
                  <p className="text-lg text-white/80">{heroContent[currentImageIndex].caption}</p>
                  
                  <Link 
                    to="/products" 
                    className="inline-flex items-center gap-2 px-6 py-2 bg-white text-accent-new rounded-full mt-4 hover:bg-accent-new hover:text-white transition-colors"
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
        </div>
      </div>
    </section>
  );
};
