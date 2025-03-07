
import React, { useState } from 'react';
import { ShoppingCart, Package, CreditCard, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// API interface placeholders (for future implementation)
interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for form data (prepared for API integration)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom'
  });
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('standard');
  
  // Mock shipping methods (would come from API)
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '2-4 Business Days',
      price: 0,
      estimatedDays: '2-4 Business Days'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '1-2 Business Days',
      price: 9.99,
      estimatedDays: '1-2 Business Days'
    }
  ];
  
  // Handler functions for form updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };
  
  const handleContinueToPayment = () => {
    // This is where you would validate and submit data to API
    
    // For now, just show a toast and navigate
    toast({
      title: "Shipping information saved",
      description: "Proceeding to payment",
    });
    
    navigate('/pay');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Order Progress with icons */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-2 rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1">Cart</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-2 rounded-full">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 font-semibold">Place Order</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 text-muted-foreground">Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 text-muted-foreground">Complete</span>
          </div>
        </div>
        <Progress value={50} className="h-2" />
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
                  <input 
                    type="text" 
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input 
                  type="text" 
                  name="streetAddress"
                  value={shippingAddress.streetAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md" 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <select 
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
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
              {shippingMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-md ${
                    selectedShippingMethod === method.id 
                      ? "bg-primary/5 border-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleShippingMethodChange(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping"
                      checked={selectedShippingMethod === method.id}
                      onChange={() => handleShippingMethodChange(method.id)} 
                    />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.estimatedDays}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {method.price === 0 ? "FREE" : `£${method.price.toFixed(2)}`}
                  </p>
                </div>
              ))}
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
                <span className="text-primary">
                  {selectedShippingMethod === 'standard' ? 'FREE' : '£9.99'}
                </span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    £{(303.00 + (selectedShippingMethod === 'standard' ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Including VAT</p>
              </div>
            </div>
            <Button 
              className="w-full mt-6"
              onClick={handleContinueToPayment}
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
