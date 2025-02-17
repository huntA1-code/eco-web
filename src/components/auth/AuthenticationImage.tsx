
import { motion } from 'framer-motion';

export const AuthenticationImage = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop")' }}>
      <div className="h-full w-full backdrop-blur-sm bg-black/30 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white p-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Fashion & Style</h1>
          <p className="text-lg md:text-xl opacity-90">Discover your unique style</p>
        </motion.div>
      </div>
    </div>
  );
};
