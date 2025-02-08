
import React, { useEffect } from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const OrderComplete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Order Confirmed! 🎉",
      description: "Thank you for shopping with us!",
      duration: 5000,
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Order Progress */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <Check className="h-8 w-8 text-primary" />
          <div className="ml-2 mr-4">Cart</div>
          <div className="h-1 w-16 bg-primary"></div>
        </div>
        <div className="flex items-center">
          <Check className="h-8 w-8 text-primary" />
          <div className="ml-2 mr-4">Place Order</div>
          <div className="h-1 w-16 bg-primary"></div>
        </div>
        <div className="flex items-center">
          <Check className="h-8 w-8 text-primary" />
          <div className="ml-2 mr-4">Pay</div>
          <div className="h-1 w-16 bg-primary"></div>
        </div>
        <div className="flex items-center">
          <Check className="h-8 w-8 text-primary" />
          <div className="ml-2 text-primary font-semibold">Order Complete</div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center space-y-8"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">Thank You for Your Order! 🎉</h1>
          <p className="text-muted-foreground text-lg">
            We're thrilled to have you as our customer. Your order has been confirmed and will be processed shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 p-6 bg-secondary rounded-lg"
        >
          <h2 className="text-xl font-semibold">What's Next?</h2>
          <p className="text-muted-foreground">
            We'll send you a confirmation email with your order details and tracking information once your order ships.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-6"
        >
          <Button 
            onClick={() => navigate('/')}
            className="px-8"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderComplete;
