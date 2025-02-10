
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignedOutWishlist() {
  return (
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
  );
}
