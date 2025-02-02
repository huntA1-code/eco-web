import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const heroImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Woman in elegant attire
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", // Atmospheric fashion shot
  "https://images.unsplash.com/photo-1500673922987-e212871fec22", // Stylish lighting and composition
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901"  // Fashion detail shot
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen pt-16 bg-gradient-to-b from-accent/5 to-white/80">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Special Offer Badge */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-new/10 text-accent-new rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4" />
              <span>New Season Collection 2024</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="hero-title text-5xl md:text-6xl xl:text-7xl leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-new via-accent to-accent-best">
                Style Story
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-md leading-relaxed">
              Discover curated collections that blend timeless elegance with contemporary trends. 
              Enjoy free shipping on orders over $99.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="btn-primary group inline-flex items-center gap-2 bg-gradient-to-r from-accent-new to-accent hover:opacity-90"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary border-2 border-accent-new/20 hover:border-accent-new/40">
                View Lookbook
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-foreground/60">On orders $99+</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-foreground/60">30 days return</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-new/20 via-transparent to-accent/20 rounded-2xl" />
            <img
              src={heroImages[currentImageIndex]}
              alt="Fashion Model"
              className="w-full h-full object-cover rounded-2xl shadow-xl hover-scale"
              loading="eager"
            />
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-xl backdrop-blur-md"
            >
              <p className="text-2xl font-semibold mb-2">Summer Sale</p>
              <p className="text-foreground/80">Up to 60% off on selected items</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};