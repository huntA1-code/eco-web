
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthenticationImage } from '@/components/auth/AuthenticationImage';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SocialButtons } from '@/components/auth/SocialButtons';

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex">
      <AuthenticationImage />

      {/* Right side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {isSignIn ? (
            <>
              <SignInForm onToggle={() => setIsSignIn(false)} />
              <SocialButtons />
            </>
          ) : (
            <>
              <SignUpForm onToggle={() => setIsSignIn(true)} />
              <SocialButtons />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Authentication;
