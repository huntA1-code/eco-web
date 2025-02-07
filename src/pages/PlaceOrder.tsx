
import React from 'react';
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();

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
          <Circle className="h-8 w-8 text-primary fill-primary" />
          <div className="ml-2 mr-4 font-semibold">Place Order</div>
          <div className="h-1 w-16 bg-neutral-200"></div>
        </div>
        <div className="flex items-center">
          <Circle className="h-8 w-8 text-neutral-300" />
          <div className="ml-2 mr-4 text-neutral-500">Pay</div>
          <div className="h-1 w-16 bg-neutral-200"></div>
        </div>
        <div className="flex items-center">
          <Circle className="h-8 w-8 text-neutral-300" />
          <div className="ml-2 text-neutral-500">Order Complete</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Address */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </form>
          </Card>

          {/* Shipping Method */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-md bg-primary/5 border-primary">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" checked readOnly />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-muted-foreground">2-4 Business Days</p>
                  </div>
                </div>
                <p className="font-medium">FREE</p>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" />
                  <div>
                    <p className="font-medium">Express Delivery</p>
                    <p className="text-sm text-muted-foreground">1-2 Business Days</p>
                  </div>
                </div>
                <p className="font-medium">£9.99</p>
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
                <span>£303.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-primary">FREE</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>£303.00</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Including VAT</p>
              </div>
            </div>
            <Button 
              className="w-full mt-6"
              onClick={() => navigate('/pay')}
            >
              Continue to Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
