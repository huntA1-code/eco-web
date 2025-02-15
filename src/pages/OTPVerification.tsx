
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Component as OTPInput } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Timer, ArrowLeft } from 'lucide-react';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendOTP = () => {
    setCountdown(30);
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email",
    });
  };

  const handleVerify = () => {
    toast({
      title: "Success",
      description: "Your account has been verified successfully!",
    });
    // Navigate to the main app or dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop")' }}>
        <div className="h-full w-full backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white p-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Verify Your Account</h1>
            <p className="text-lg md:text-xl opacity-90">Complete your registration</p>
          </motion.div>
        </div>
      </div>

      {/* Right side - OTP Verification */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <button 
              onClick={() => navigate('/auth')}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign Up
            </button>
            <h2 className="text-3xl font-serif font-semibold">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a verification code to your email address.
              <br />Please enter the code below.
            </p>
          </div>

          <div className="space-y-6">
            <OTPInput />
            
            <div className="space-y-4">
              <Button onClick={handleVerify} className="w-full bg-primary hover:bg-primary/90">
                Verify Account
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Timer className="w-4 h-4" />
                  {countdown > 0 ? (
                    <span>Resend code in {countdown}s</span>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      className="text-primary hover:underline focus:outline-none"
                    >
                      Resend verification code
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OTPVerification;
