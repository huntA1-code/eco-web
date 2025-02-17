
import React from 'react';
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Pay = () => {
  const navigate = useNavigate();
  
  // Constants for calculations
  const subtotal = 303.00;
  const taxRate = 0.20; // 20% VAT
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Order Progress */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <div className="ml-2 mr-4">Cart</div>
          <div className="h-1 w-16 bg-primary"></div>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <div className="ml-2 mr-4">Place Order</div>
          <div className="h-1 w-16 bg-primary"></div>
        </div>
        <div className="flex items-center">
          <Circle className="h-8 w-8 text-primary fill-primary" />
          <div className="ml-2 mr-4 font-semibold">Pay</div>
          <div className="h-1 w-16 bg-neutral-200"></div>
        </div>
        <div className="flex items-center">
          <Circle className="h-8 w-8 text-neutral-300" />
          <div className="ml-2 text-neutral-500">Order Complete</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md bg-primary/5 border-primary">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked readOnly />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Credit Card</p>
                      <div className="flex gap-2">
                        <img src="/visa.png" alt="Visa" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Pay with your credit card</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name on Card</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal (3 items)</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-primary">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (VAT 20%)</span>
                <span>£{taxAmount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Including VAT</p>
              </div>
            </div>
            <Button 
              className="w-full mt-6"
              onClick={() => navigate('/order-complete')}
            >
              Pay Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pay;
